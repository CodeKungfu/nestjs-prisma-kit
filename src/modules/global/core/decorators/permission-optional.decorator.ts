import { SetMetadata } from '@nestjs/common';
import { GLOBAL_PERMISSION_OPTIONAL_KEY_METADATA } from '../../global.constants';

/**
 * 使用该注解可开放当前Api权限，无需权限访问，但是仍然需要校验身份Token
 */
export const PermissionOptional = () => SetMetadata(GLOBAL_PERMISSION_OPTIONAL_KEY_METADATA, true);
