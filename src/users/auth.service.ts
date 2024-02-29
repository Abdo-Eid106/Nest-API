import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(public usersService: UsersService) {}

  async signup(email: string, password: string): Promise<User> {
    const users = await this.usersService.find({ email });
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    password = await bcrypt.hash(password, 12);
    return this.usersService.create(email, password);
  }

  async signin(email: string, password: string) {
    const users = await this.usersService.find({ email });
    if (users.length == 0) {
      throw new BadRequestException('the email or the password in incorrect');
    }

    const user = users[0];
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('the email or the password in incorrect');
    }

    return user;
  }
}
