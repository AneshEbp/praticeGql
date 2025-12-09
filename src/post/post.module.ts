import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from 'src/schema/post.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
  ],
  providers: [PostResolver, PostService],
  exports: [MongooseModule],
})
export class PostModule {}
