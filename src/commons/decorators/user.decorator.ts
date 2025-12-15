import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

interface JwtUser {
  userId: string;
  email: string;
}
export const UserDetails = createParamDecorator(
  (data: keyof JwtUser, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as { user: JwtUser };

    return data ? req.user?.[data] : req.user;
  },
);
