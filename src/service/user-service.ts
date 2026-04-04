import { User as userModel } from '../models/user_model'; 
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import tokenService from './token-service';
import { UserDto } from '../dtos/user-dto';
import mailService from './mail-service';


class UserService {
    async registration(email: string, password: string, name: string, telefon: string){
        const candidate = await userModel.findOne({where: {email}});
        if(candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const  user = await userModel.create({
            email, 
            password: hashPassword, 
            activationLink, 
            nume: name, 
            telefon
        });
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const token = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, token.refreshToken);

        return { ...token, user: userDto }       
    }
}

export default new UserService();