import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserResolver, UserService],
  exports: [MongooseModule],
})
export class UserModule {}
