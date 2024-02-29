import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { userId } = req.session || {};
  
    if (userId) {
      const user = await this.usersService.findById(parseInt(userId));
    //@ts-ignore
      req.session.user = user;
    }

    next();
  }
}
