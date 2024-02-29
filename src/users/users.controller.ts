import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from './../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { IsLoggedIn } from '../guards/isLoggedIn.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('user')
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find({ email });
  }

  @Get('user/:id')
  async findById(@Param('id') id: string) {
    await this.usersService.findById(parseInt(id));
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), body);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(parseInt(id));
  }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  async signin(@Body() body: GetUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('logout')
  async logOut(@Session() session: any) {
    session.userId = -1;
    session.user = null;
  }

  @Get('me')
  @UseGuards(IsLoggedIn)
  getMe(@CurrentUser() me: User) {
    return me;
  }
}
