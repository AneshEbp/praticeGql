import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getProfile(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException('cant find user');
    return {
      message: 'profile fetched',
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        address: user.address,
      },
    };
  }

  async updateProfile(userId: string, body: UpdateUserDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('cant find user');

    let updateFlag = false;

    if (body.name) {
      updateFlag = true;
      user.name = body.name;
    }
    if (body.address) {
      updateFlag = true;
      user.address = body.address;
    }
    if (!updateFlag) {
      throw new BadRequestException('atleast one feild is needed');
    }

    return {
      message: 'user updated',
      user,
    };
  }

  async getAllUser(){
    
  }
}
