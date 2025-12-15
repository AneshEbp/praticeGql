import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schema/post.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/schema/user.schema';
import { updatePostDto } from './dtos/updaet-pots.dto';
import { DeletePostDto } from './dtos/delete-post.dto';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionService } from 'src/services/subscriptionServices';

export const pubsub = new PubSub(); // Shared PubSub

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    private subscriptionService: SubscriptionService,
  ) {}

  async createPost(userId: string, body: CreatePostDto, fileUrl: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('cant find the user');
    }
    const newPost = new this.postModel({
      title: body.title,
      description: body.description,
      authorId: userId,
      fileUrl,
    });
    const post = await newPost.save();
    if (!post) {
      throw new BadRequestException('cant create post');
    }

    this.subscriptionService.publish('postcreated', {
      postcreated: {
        message: 'post created successfully',
      },
    });
    return {
      message: 'post created successfully',
      post,
    };
  }

  async getAuthorById(authorId: string) {
    const user = await this.userModel.findById(authorId);
    if (!user) {
      throw new NotFoundException('cant find the user');
    }
    return user;
  }

  async getAllPostByUser(
    userId: String,
    page: number | 1,
    limit: number | 10,
    sortBy: string | 'createdAt',
    sortOrder: string | 'asc',
  ) {
    const skip = (page - 1) * limit;
    const posts = await this.postModel
      .find({ authorId: userId })
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit);
    if (!posts || posts.length == 0) {
      throw new NotFoundException('cant not find post for the user');
    }
    return {
      message: 'post fetched',
      posts,
    };
  }

  async updatePost(userId: string, body: updatePostDto) {
    const post = await this.postModel.findById(body.postId);
    if (!post) {
      throw new NotFoundException('cant find the post');
    }

    if (post.authorId.toString() != userId) {
      throw new UnauthorizedException('you dont have permission');
    }

    let changeFlag = false;
    if (body.title) {
      changeFlag = true;
      post.title = body.title;
    }

    if (body.description) {
      changeFlag = true;
      post.description = body.description;
    }
    if (!changeFlag) {
      throw new BadRequestException('at least one feild required to update');
    }

    await post.save();
    return {
      message: 'post updated',
      post,
    };
  }

  async deletePost(userId: string, body: DeletePostDto) {
    const deletedpost = await this.postModel.findOneAndDelete({
      authorId: userId,
      _id: body.postId,
    });

    if (!deletedpost) {
      throw new BadRequestException(' cant delete the post');
    }

    this.subscriptionService.publish('deleted', {
      message: 'post deleted',
    });
    return {
      message: 'post deleted successfully',
    };
  }
}
