import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  User,
} from '@shared';
import { RpcException } from '@nestjs/microservices';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(dto: RegisterDto) {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) throw new RpcException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password: hashed,
    });

    return {
      message: 'User registered successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return {
      message: 'Login successful',
      user,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not found');

    // 1. Generate plain token (send to user)
    const plainToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash the token before saving (security best practice)
    const hashedToken = await bcrypt.hash(plainToken, 10);

    // 3. Save hashed token + expiry
    user.resetToken = hashedToken;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();

    // 4. Create reset link with plain token
    const resetLink = `https://your-frontend.com/reset-password?token=${plainToken}`;

    // OPTIONAL: Send email with resetLink
    // await this.emailService.send(user.email, resetLink);

    return {
      message: 'Password reset link sent to your email',
      resetLink, // for testing (remove in production)
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { token, newPassword, confirmPassword } = dto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Find user ONLY by expiry
    const user = await this.userModel.findOne({
      resetTokenExpiry: { $gt: new Date() }, // Not expired
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Compare hashed token
    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return {
      message: 'Password reset successful',
    };
  }
}
