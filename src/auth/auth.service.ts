import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signUp.dto';
import { logInDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDetail: signUpDto): Promise<{ token: string; user: any }> {
    const { email, name, password } = signupDetail;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token, user };
  }

  async logIn(logIn: logInDto): Promise<{ token: string; user: any }> {
    const { email, password } = logIn;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email and password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid  email and password ');
    }

    const token = await this.jwtService.sign({ id: user._id });

    return { token, user };
  }
}
