import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { GLOBAL_PREFIX } from './global.constants';
import { AuthGuard } from './core/guards/auth.guard';
import { OpenModule } from './open/open.module';

/**
 * Client模块，所有API都需要加入/client前缀
 */
@Module({
  imports: [
    // register prefix
    RouterModule.register([
      {
        path: GLOBAL_PREFIX,
        module: OpenModule,
      },
    ]),
    OpenModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class GlobalModule {}
