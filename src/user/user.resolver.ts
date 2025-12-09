import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/guards/gqlAuthGuard';
import { UseGuards } from '@nestjs/common';
import { UserDetails } from 'src/decorators/user.decorator';
import { UserProfileModel } from './models/userprofile.model';
import { UpdateUserInput } from './dtos/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserProfileModel)
  @UseGuards(GqlAuthGuard)
  async getProfile(@UserDetails('userId') userId: string) {
    const result = await this.userService.getProfile(userId);
    return result;
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
