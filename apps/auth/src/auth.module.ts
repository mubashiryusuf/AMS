import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { AuthService } from './app/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule, SharedModule, User, UserSchema, SERVICES } from '@shared';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
