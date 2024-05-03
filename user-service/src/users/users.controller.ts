import { Controller, Get, Post, Req, Res, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
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
  async createInstructorApplication(@Req() req: Request, @Res() res: Response) {
    console.log(req.body,"!@#$%^&*(");
    
    try {
      const body: {
        profession: string;
        profileDescription: string;
        linkedIn?: string;  
        github?: string;
      } = req.body;

      const userId = req.user.email;
      console.log(userId,"8888888888888888888");
      

      const result = await this.userService.addInstructor(body, userId);
      console.log("🚀 ~ file: users.controller.ts:32 ~ UsersController ~ createInstructorApplication ~ result:", result)

      if (!result) {
        throw new HttpException("Something went wrong, recheck your details", HttpStatus.BAD_REQUEST);
      }

      res.status(HttpStatus.OK).json({
        success: true,
        data: result,
        message: "Applied successfully"
      });
    } catch (error:any) {
      console.error("Error when creating instructor application:", error);
      const message = error.response || 'Failed to process application due to internal error';
      res.status( error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:error.response
      });
    }
  }
}

