import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostModel } from './models/create-post.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gqlAuthGuard';
import { UserDetails } from 'src/decorators/user.decorator';
import { CreatePostInput } from './dtos/create-post.input';
import { AuthorType } from './models/author.model';
import { PostType } from './models/post.model';
import { GetPostModel } from './models/getposts.model';

@Resolver(() => PostType)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => CreatePostModel)
  @UseGuards(GqlAuthGuard)
  async createpost(
    @UserDetails('userId') userId: string,
    @Args('body') body: CreatePostInput,
  ) {
    return this.postService.createPost(userId, body);
  }

  @ResolveField(() => AuthorType)
  async authorId(@Parent() post: PostType) {
    const user = await this.postService.getAuthorById(
      post.authorId as unknown as string,
    );
    return {
      name: user.name,
      email: user.email,
    };
  }

  @Query(() => GetPostModel)
  async getAllPostByUser(@Args('userId') userId: string) {
    return this.postService.getAllPostByUser(userId);
  }
}
