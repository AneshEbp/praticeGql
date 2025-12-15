import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
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
import { UpdatePostInput } from './dtos/update-post.input';
import { DeletePostModel } from './models/delete-post.model';
import { DeletePostInput } from './dtos/delete-post.input';
import { GetPostInput } from './dtos/get-post.input';
import { DeletePubSubModel } from './models/delete.pubsub.model';
import { SubscriptionService } from 'src/services/subscriptionServices';
import { CreatePostPubSubModel } from './models/create-pots.pubsub.model';
import { FileService } from './file.service';

@Resolver(() => PostType)
export class PostResolver {
  constructor(
    private postService: PostService,
    private subscriptionService: SubscriptionService,
    private fileService: FileService,
  ) {}

  @Mutation(() => CreatePostModel)
  @UseGuards(GqlAuthGuard)
  async createpost(
    @UserDetails('userId') userId: string,
    @Args('body') body: CreatePostInput,
  ) {
    const { file } = body;
    // Save file separately
    const fileUrl = await this.fileService.uploadToCloudinary(await file);
    return this.postService.createPost(userId, body, fileUrl);
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
  async getAllPostByUser(
    // @Args('userId') userId: string,
    // @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    // @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    // @Args('sortBy', { type: () => String, defaultValue: 'createdAt' })
    // sortBy: string,
    // @Args('sortOrder', { type: () => String, defaultValue: 'asc' })
    // sortOrder: string,
    @Args('body') body: GetPostInput,
  ) {
    return this.postService.getAllPostByUser(
      body.userId,
      body.page,
      body.limit,
      body.sortBy,
      body.sortOrder,
    );
  }

  @Mutation(() => CreatePostModel)
  @UseGuards(GqlAuthGuard)
  async updatepost(
    @UserDetails('userId') userId: string,
    @Args('body') body: UpdatePostInput,
  ) {
    return this.postService.updatePost(userId, body);
  }

  @Mutation(() => DeletePostModel)
  @UseGuards(GqlAuthGuard)
  async DeletePostModel(
    @UserDetails('userId') userId: string,
    @Args('body') body: DeletePostInput,
  ) {
    return this.postService.deletePost(userId, body);
  }

  @Subscription(() => DeletePubSubModel)
  postdeleted() {
    return this.subscriptionService.asyncIterator('postdeleted');
  }

  @Subscription(() => CreatePostPubSubModel)
  postcreated() {
    return this.subscriptionService.asyncIterator('postcreated');
  }

}
