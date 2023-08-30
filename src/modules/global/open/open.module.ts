import { Module } from '@nestjs/common';
import * as bannerController from './banners/controller';
import * as bannerService from './banners/service';

@Module({
  imports: [],
  controllers: [bannerController.MyController],
  providers: [bannerService.Service],
  exports: [],
})
export class OpenModule {}
