import { User as userModel } from '../models/user_model'; 
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import tokenService from './token-service';
import { UserDto } from '../dtos/user-dto';
import mailService from './mail-service';
import ApiError from '../exceptions/api-error';



class UserService {
    async registration(email: string, password: string, name: string, telefon: string){
        const candidate = await userModel.findOne({where: {email}});
        if(candidate) {
            throw ApiError.BadRequest(`Utilizator cu email-ul ${email} este deja inregistrat.`);
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

        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

       

        return { ...token, user: userDto }       
    }

    async activate(activationLink: string){
        const user = await userModel.findOne({where: {activationLink}})
        if(!user){
            throw ApiError.BadRequest('Incorecta lincul de activare')
        }
        user.isActivated = true;
        await user.save();
        console.log('User activat');
    }

    async login(email: string, password: string){
        const user = await userModel.findOne({where: {email}})
        if(!user){
            throw ApiError.BadRequest('Utilizator inexistent');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.BadRequest('Parola gresita');
        }
        const userDto = new UserDto(user);
        const token = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, token.refreshToken);
        return { ...token, user: userDto }   
    }

    async logout(refreshToken: string){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }

        const user = await userModel.findOne({ where: { idUser: userData.id } });

        const userDto = new UserDto(user);
        const token = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, token.refreshToken);
        return { ...token, user: userDto }
    }
}

export default new UserService();