import { SetMetadata } from '@nestjs/common';
import { GLOBAL_AUTHORIZE_KEY_METADATA } from '../../global.constants';

/**
 * 开放授权Api，使用该注解则无需校验Token及权限
 */
export const Authorize = () => SetMetadata(GLOBAL_AUTHORIZE_KEY_METADATA, true);
