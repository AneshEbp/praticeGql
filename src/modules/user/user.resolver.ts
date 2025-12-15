import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/commons/guards/gqlAuthGuard';
import { UseGuards } from '@nestjs/common';
import { UserDetails } from 'src/commons/decorators/user.decorator';
import { UserProfileModel } from './models/userprofile.model';
import { UpdateUserInput } from './dtos/update-user.input';
import {  UserType } from 'src/modules/auth/models/user.model';
import { PostType } from 'src/modules/post/models/post.model';
import { PostTypeinUser } from './models/user-in-post.model';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserProfileModel)
  @UseGuards(GqlAuthGuard)
  async getProfile(@UserDetails('userId') userId: string) {
    const result = await this.userService.getProfile(userId);
    return result;
  }
  @ResolveField(() => PostTypeinUser)
  async post(@Parent() user: UserType) {
    return await this.userService.getuserspost(user._id);
  }

  @Mutation(() => UserProfileModel)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @UserDetails('userId') userId: string,
    @Args('body') body: UpdateUserInput,
  ) {
    return this.userService.updateProfile(userId, body);
  }
}
