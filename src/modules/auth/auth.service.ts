import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,

  ) {}

  async register(body: RegisterUserDto) {
    const { name, email, password } = body;
    const exists = await this.userModel.exists({ email });

    if (exists) throw new BadRequestException('User already exists');

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedpassword,
    });
    const user = await newUser.save();
    return {
      message: 'user registered',
      user,
    };
  }

  async loginuser(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Invalid credentails');
    }

    const isMacthed = await bcrypt.compare(password, user.password);
    if (!isMacthed) {
      throw new UnauthorizedException('invalid credentails');
    }
    const payload = {
      id: user._id,
      email,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.sign(
      { id: user._id },
      { expiresIn: '7d' },
    );
    return {
      message: 'login succesffully',
      accessToken,
      refreshToken,
    };
  }

 
}
