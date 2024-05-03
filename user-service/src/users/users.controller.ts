import { Controller, Get, Post, Req, Res, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtAuthGuard
  ) {}

  @Get('instructor')
  findAllInstructors() {
    return 'hello world';
  }

  @Post('instructor/apply')
  @UseGuards(JwtAuthGuard) 
  async createInstructorApplication(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const body: {
        profession: string;
        phone: string;
        profileDescription: string;
        linkedIn?: string;  
        github?: string;
      } = req.body;

      const result = await this.userService.addInstructor(body); 

      if (!result) {
        throw new HttpException("Something went wrong, recheck your details", HttpStatus.BAD_REQUEST);
      }

      res.status(HttpStatus.OK).json({
        success: true,
        data: result,
        message: "Applied successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

