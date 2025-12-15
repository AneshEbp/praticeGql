import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Body, UnsupportedMediaTypeException } from '@nestjs/common';
import { UserType } from './models/user.model';
import { CreateUSerInput } from './dtos/create-user.input';
import { RegisterUserModel } from './models/register-user.model';
import { LoginUserModel } from './models/login-user.model';
import { LoginUserInput } from './dtos/login-user.input';
import { PostType } from 'src/modules/post/models/post.model';
import { PostService } from 'src/modules/post/post.service';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => RegisterUserModel)
  registerUSer(@Args('body') body: CreateUSerInput) {
    return this.authService.register(body);
  }


  @Mutation(() => LoginUserModel)
  loginUser(@Args('body') body: LoginUserInput) {
    return this.authService.loginuser(body);
  }
}
