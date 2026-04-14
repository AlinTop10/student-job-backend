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
            throw new Error(`Utilizator cu email-ul ${email} este deja inregistrat.`);
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

        const userDto = new UserDto(user);
        const token = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, token.refreshToken);

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

       

        return { ...token, user: userDto }       
    }
}

export default new UserService();