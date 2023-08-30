import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { GLOBAL_PREFIX } from 'src/modules/global/global.constants';
import { Authorize } from 'src/modules/global/core/decorators/authorize.decorator';
import { LogDisabled } from 'src/modules/global/core/decorators/log-disabled.decorator';
import { PageResult } from 'src/common/class/res.class';
import { Service } from './service';
import { PageDto$TaskV1, InfoDto$TaskV1 } from './dto';
import { keyStr, tableType, controllerName } from './config';

@ApiSecurity(GLOBAL_PREFIX)
@ApiTags(`${keyStr}模块`)
@Controller(`${controllerName}`)
export class MyController {
  constructor(private service: Service) {}

  @ApiOperation({ summary: `分页查询${keyStr}` })
  @ApiOkResponse()
  @LogDisabled()
  @Authorize()
  @Get('page')
  async page(@Query() dto: PageDto$TaskV1): Promise<PageResult<tableType>> {
    const list = await this.service.page(dto.page - 1, dto.limit, dto.type);
    const count = await this.service.count(dto.type);
    return {
      list,
      pagination: {
        size: dto.limit,
        page: dto.page,
        total: count,
      },
    };
  }

  @ApiOperation({ summary: `查询${keyStr}` })
  @ApiOkResponse()
  @LogDisabled()
  @Authorize()
  @Get('info')
  async info(@Query() dto: InfoDto$TaskV1): Promise<any> {
    const list = await this.service.info(dto.id);
    return {
      ...list,
    };
  }
}
