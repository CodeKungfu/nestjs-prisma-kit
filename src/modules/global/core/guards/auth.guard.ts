import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { isEmpty } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import jwt from 'jsonwebtoken'
const secretkey = 'FPcu123123'; //密钥
import { ApiException } from 'src/common/exceptions/api.exception';
import { GLOBAL_PREFIX, GLOBAL_USER, GLOBAL_PERMISSION_OPTIONAL_KEY_METADATA, GLOBAL_AUTHORIZE_KEY_METADATA } from 'src/modules/global/global.constants';

/**
 * admin perm check guard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private reflector: Reflector, private jwtService: JwtService, private loginService: loginService.Service) {}
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查前缀
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const url = request.url;
    const path = url.split('?')[0];
    // 前缀不属于返回true
    if (path.slice(1, GLOBAL_PREFIX.length + 1) !== GLOBAL_PREFIX) {
      return true;
    }
    // 检测是否是开放类型的，例如获取验证码类型的接口不需要校验，可以加入@Authorize可自动放过
    const authorize = this.reflector.get<boolean>(GLOBAL_AUTHORIZE_KEY_METADATA, context.getHandler());
    if (authorize) {
      return true;
    }
    // const request = context.switchToHttp().getRequest<FastifyRequest>();
    // const url = request.url;
    const token = request.headers['authorization'] as string;
    if (isEmpty(token)) {
      throw new ApiException(11001);
    }
    try {
      // 挂载对象到当前请求上
      request[GLOBAL_USER] = jwt.verify(token, secretkey);
    } catch (e) {
      // 无法通过token校验
      throw new ApiException(11001);
    }
    if (isEmpty(request[GLOBAL_USER])) {
      throw new ApiException(11001);
    }
    // return true;
    // const redisToken = await this.loginService.getRedisToken(request[GLOBAL_USER].uid);
    // if (token !== redisToken) {
    //   // 与redis保存不一致
    //   throw new ApiException(11002);
    // }
    // 注册该注解，Api则放行检测
    const notNeedPerm = this.reflector.get<boolean>(GLOBAL_PERMISSION_OPTIONAL_KEY_METADATA, context.getHandler());
    // Token校验身份通过，判断是否需要权限的url，不需要权限则pass
    if (notNeedPerm) {
      return true;
    }
    // pass
    return true;
  }
}