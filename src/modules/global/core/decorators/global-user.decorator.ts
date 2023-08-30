import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GLOBAL_USER } from '../../global.constants';

export const GlobalUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  // auth guard will mount this
  const user = request[GLOBAL_USER];

  return (data ? user?.[data] : user) || {
    ip: request.ip
  };
});
