import { Controller, Get, Post, Req, Res, HttpException, HttpStatus, UseGuards, Put, Body, Patch, Param, NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import * as bcrypt from 'bcrypt';
import { InstructorQueryDto } from './dto/instructor-query.dto';

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtAuthGuard
  ) {}

  @Get('instructor')
  async findAllInstructors(@Query() query: InstructorQueryDto,@Res() res: Response) {
    try {
      const instructors = await this.userService.getAllInstructors(query)
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
        message: "instructor Applied successfully"
      });
    } catch (error:any) {
      console.error("Error while creating instructor application:", error);
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
@Patch('instructor/admin-block-unblock/:id')
  async blockUnblockInstructor(
    @Param('id') id: string,
    @Body('isBlocked') isBlocked: boolean,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const instructor = await this.userService.blockUnblockInstructor(id, isBlocked);
      return res.status(HttpStatus.OK).json({
        message: `Instructor has been ${isBlocked ? 'blocked' : 'unblocked'}`,
        data: instructor
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating instructor status',
        error: error.message
      });
    }
  }

@Post('edit-profile')
  async editUserProfile(@Req() req:Request,@Res() res:Response):Promise<Response>{
    try {
      const userId = req.body.email;
      const body:{
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        profile?:{
          avatar?:string;
          dob?:string;
          gender?:string
        }
        contact?: {
          socialMedia: {
              instagram?: string;
              github?: string;
              linkedIn?: string;
          };
          additionalEmail?: string;
      };
        email:string;
      } = req.body;
      const updatedUser = await this.userService.editUserProfile(userId,body)
      return res.status(HttpStatus.OK).json({
        success:true,
        data:updatedUser,
        message:'Profile updated successfully'
      })
      
    } catch (error) {
      console.error('Error when editing user profile:', error);
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'An error occurred while editing the user profile',
      });
    }
  }
  @Post('reset-password')
  @UseGuards(JwtAuthGuard) 
  async resetUserpassword(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const { currentPassword, newPassword } = req.body;

      const {_id} = req.user;
      const user = await this.userService.findById(_id);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'User not found',
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Current password is incorrect',
        });
      }

      if (currentPassword === newPassword) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'New password cannot be the same as the current password',
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updatePassword(_id, hashedNewPassword);

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      console.error('Error when resetting user password:', error);
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'An error occurred while resetting password',
      });
    }
  }
  @Get('instructor/:email')
  async getInstructorById(@Param('email') email: string, @Res() res): Promise<void> {
    try {
      const instructor = await this.userService.getInstructorById(email);
      console.log("🚀 ~ file: users.controller.ts:199 ~ UsersController ~ getInstructorById ~ id:", email)
      console.log("🚀 ~ file: users.controller.ts:199 ~ UsersController ~ getInstructorById ~ instructor:", instructor)
      return res.status(HttpStatus.OK).json({
        success: true,
        data: instructor,
        message: 'Instructor data'
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to fetch instructor application'
      });
    }
  }
  
}

