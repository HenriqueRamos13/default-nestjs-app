import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../utils/decorators/isPublic.decorator';
import { CreateUserDTO } from './dto/Users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  @Public()
  public async create(@Body() body: CreateUserDTO) {
    return await this.service.create(body);
  }
}
