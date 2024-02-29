import { CanActivate, ExecutionContext } from '@nestjs/common';

export class IsLoggedIn implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;
    return (userId && userId != -1);
  }
}
