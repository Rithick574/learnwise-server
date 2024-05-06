import { Controller, Get, Post, Req, Res, HttpException, HttpStatus, UseGuards, Put, Body } from '@nestjs/common';
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
  async findAllInstructors(@Res() res: Response) {
    try {
      const instructors = await this.userService.getAllInstructors()
      res.status(HttpStatus.OK).json(instructors);
  } catch (error) {
    res.status( error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:error.response
    });
  }
  }

  @Post('instructor/apply')
  @UseGuards(JwtAuthGuard) 
  async createInstructorApplication(@Req() req: Request, @Res() res: Response) {
    
    try {
      const body: {
        profession: string;
        profileDescription: string;
        linkedIn?: string;  
        github?: string;
      } = req.body;

      const userId = req.user.email;
      const result = await this.userService.addInstructor(body, userId);

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
 @Get('instructor/requests')
 async instructorRequests(@Res() res: Response) {
  try {
    const instructorsRequest = await this.userService.getAllInstructorRequests()
      res.status(HttpStatus.OK).json(instructorsRequest);
  } catch (error) {
    res.status( error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:error.response
    });
  }
 }
@Put('instructor/application/accept')
async instructorApplicationAccept(@Res() res: Response, @Body() body: { id: string, email: string }) {
  try {
    const updatedApplication = await this.userService.updateApplicationStatusAndRole(body.id, body.email, true);
    res.json({
      success: true,
      data: updatedApplication
    });
  } catch (error) {
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred during the process.'
    });
  }
}
}

