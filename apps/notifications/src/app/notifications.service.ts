import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@shared';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}
}
 