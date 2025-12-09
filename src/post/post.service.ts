import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schema/post.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost(userId: string, body: CreatePostDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('cant find the user');
    }
    const newPost = new this.postModel({
      title: body.title,
      description: body.description,
      authorId: userId,
    });
    const post = await newPost.save();
    if (!post) {
      throw new BadRequestException('cant create post');
    }

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

  async getAllPostByUser(userId: String) {
    const posts = await this.postModel.find({ authorId: userId });
    if (!posts || posts.length == 0) {
      throw new NotFoundException('cant not find post for the user');
    }
    return {
      message: 'post fetched',
      posts,
    };
  }
}
