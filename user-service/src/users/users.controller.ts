import { Controller, Get } from '@nestjs/common';
import {UsersService} from './users.service'

@Controller()
export class UsersController {

    constructor(private readonly userService: UsersService ){}

    @Get()
    findAllInstructors(){
        return 'hello world'
    }

}
