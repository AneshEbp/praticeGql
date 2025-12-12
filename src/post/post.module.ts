import { forwardRef, Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from 'src/schema/post.schema';
import { UserModule } from 'src/user/user.module';
import { SubscriptionService } from 'src/services/subscriptionServices';
// import { UploadScalar } from './file.scalar';
import { FileService } from './file.service';
// import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
  ],
  providers: [PostResolver, PostService, SubscriptionService, FileService],
  exports: [MongooseModule],
})
export class PostModule {}
