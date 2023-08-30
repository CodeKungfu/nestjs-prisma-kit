import { SetMetadata } from '@nestjs/common';
import { GLOBAL_LOG_DISABLED_KEY_METADATA } from '../../global.constants';

/**
 * 日志记录禁用
 */
export const LogDisabled = () => SetMetadata(GLOBAL_LOG_DISABLED_KEY_METADATA, true);
