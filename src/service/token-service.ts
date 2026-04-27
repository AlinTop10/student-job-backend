import jwt, { JwtPayload } from 'jsonwebtoken';
import { Tokens } from '../models/token-model';

export interface IUserPayload extends JwtPayload {
    id: number;
    email: string;
    isActivated: boolean;
}

class TokenService {
    generateTokens(payload: IUserPayload) {
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

    validateAccessToken(token: string): IUserPayload | null {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET || 'jwt-secret-key-123'
            ) as IUserPayload;

            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): IUserPayload | null {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret-key'
            ) as IUserPayload;

            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await Tokens.findOne({ where: { user: String(userId) } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

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

    async findToken(refreshToken: string) {
        const tokenData = await Tokens.findOne({ where: { refreshToken } });
        return tokenData;
    }
}

export default new TokenService();