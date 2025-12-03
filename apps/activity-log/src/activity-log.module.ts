import { Module } from '@nestjs/common';
import { ActivityLogController } from './app/activity-log.controller';
import { ActivityLogService } from './app/activity-log.service';
import { RmqModule, SharedModule, SERVICES } from '@shared';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MY_SUPER_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  exports: [JwtModule],
})
export class AppModule {}
