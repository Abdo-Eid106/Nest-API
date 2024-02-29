import {
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class isAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request.session;
    if (!user) throw new UnauthorizedException('you are not logged in');
    if (!user.admin)
      throw new UnauthorizedException('you are not allowed to do this action');
    return true;
  }
}
