import jwt from 'jsonwebtoken';
import { Tokens } from '../models/token-model';

class TokenService {

    generateTokens(payload: any) {
        const accessToken = jwt.sign(
            payload, 
            process.env.JWT_ACCESS_SECRET || 'access-secret-key-123', 
            { expiresIn: '30m' }
        );
        
        const refreshToken = jwt.sign(
            payload, 
            process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-456', 
            { expiresIn: '30d' }
        );

        return {
            accessToken,
            refreshToken
        };
    }

    /**
     * Salvează Refresh Token-ul în baza de date. 
     * Dacă user-ul are deja un token, îl suprascrie (update).
     */
    async saveToken(userId: number, refreshToken: string) {
        // Căutăm dacă există deja un token pentru acest user
        // Notă: În modelul tău coloana se numește 'user'. 
        // Ideal ar fi să stochezi ID-ul user-ului acolo.
        const tokenData = await Tokens.findOne({ where: { user: String(userId) } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save(); // Update
        }

        // Dacă nu există, creăm o intrare nouă
        const token = await Tokens.create({ 
            user: String(userId), 
            refreshToken 
        });
        
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Tokens.destroy({ where: { refreshToken } });
        return tokenData;
    }   
}

export default new TokenService();