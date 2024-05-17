import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request,Response  } from 'express';
import * as jwt from 'jsonwebtoken';

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
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        return this.validateRequest(request, response);
    }

    private async validateRequest(req: Request, res: Response): Promise<boolean> {
        try {
            const { access_token, refresh_token } = req.cookies;

            if (!access_token && !refresh_token) {
                throw new UnauthorizedException();
            }

            let user: UserPayload | null = null;

            if (access_token) {
                try {
                    user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;
                } catch (error) {
                    console.log('Access token expired or invalid');
                }
            }

            if (!user && refresh_token) {
                try {
                    user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!) as UserPayload;
                    if (user) {
                        const {_id, email, role}=user;
                        const secret = process.env.ACCESS_TOKEN_SECRET;
                        if (!secret) {
                            throw new Error("Access token secret is not defined!");
                        }                    
                        const newAccessToken = jwt.sign({ _id, email, role }, secret, { expiresIn: '24h' });
                        res.cookie('access_token', newAccessToken, {
                            httpOnly: true,
                        });
                    }
                } catch (error) {
                    console.log('Refresh token expired or invalid');
                }
            }

            if (!user) {
                throw new ForbiddenException();
            }

            req.user = user;
            return true;
        } catch (error) {
            console.error('Error in JWT guard:', error);
            throw error;
        }
    }
}

