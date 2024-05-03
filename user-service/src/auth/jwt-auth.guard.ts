import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
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
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        return this.validateRequest(request);
    }

    private async validateRequest(req: Request): Promise<boolean> {
        const token = req.cookies?.access_token || (req.headers.authorization?.split(' ')[1] || '');
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const AToken="AYjcyMzY3ZDhiNmJkNTY"
            const decoded = jwt.verify(token, AToken!) as UserPayload;
            req.user = decoded;
            return true;
        } catch (err) {
            throw new ForbiddenException();
        }
    }
}

