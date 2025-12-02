import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule, SharedModule, User, UserSchema, SERVICES } from '@shared';
import { NotificationsService } from './app/notifications.service';
import { NotificationsController } from './app/notifications.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.NOTIFICATIONS]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],

})
export class AppModule {}
