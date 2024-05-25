import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

interface UserPayload {
    _id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        return this.validateRequest(request, response);
    }

    private async validateRequest(req: Request, res: Response): Promise<boolean> {
        const access_token = req.cookies['access_token'];
        const refresh_token = req.cookies['refresh_token'];

        if (!access_token && !refresh_token) {
            throw new UnauthorizedException('No tokens provided');
        }

        let user: UserPayload | null = null;

        const ACCESS_TOKEN_SECRET = this.configService.get<string>('ACCESS_TOKEN_SECRET');
        const REFRESH_TOKEN_SECRET = this.configService.get<string>('REFRESH_TOKEN_SECRET');

        if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
            throw new Error('Token secrets are not defined!');
        }

        if (access_token) {
            try {
                user = jwt.verify(access_token, ACCESS_TOKEN_SECRET) as UserPayload;
            } catch (error) {
                console.log('Access token expired or invalid');
            }
        }

        if (!user && refresh_token) {
            try {
                user = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as UserPayload;
                if (user) {
                    const { _id, email, role } = user;
                    const newAccessToken = jwt.sign({ _id, email, role }, ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    res.cookie('access_token', newAccessToken, {
                        httpOnly: true,
                    });
                }
            } catch (error) {
                console.log('Refresh token expired or invalid');
            }
        }

        if (!user) {
            throw new ForbiddenException('User authentication failed');
        }

        req.user = user;
        return true;
    }
}
