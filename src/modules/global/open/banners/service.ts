import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from 'src/common/exceptions/api.exception';
import { difference, filter, includes, isEmpty, map, findIndex, omit } from 'lodash';
import { prisma } from 'src/prisma';
import { tableType, tableName } from './config';

@Injectable()
export class Service {
  constructor(
  ) {}

  /**
   * 列举所有条数
   */
  async count(type: number): Promise<number> {
    let count = 0;
    if (type) {
      const sql = `SELECT ${tableName}.* FROM ${tableName} where ${tableName}.type=${type}`;
      const result: any = await prisma.$queryRawUnsafe(`${sql.toString()}`);
      count = result.length;
    } else {
      count = await prisma[tableName].count();
    }
    return count;
  }

  /**
   * 根据获取信息
   */
  async info(id: string): Promise<tableType> {
    const resultInfo: tableType = await prisma[tableName].findUnique({
      where: {
        id: Number(id),
      },
    });
    if (isEmpty(resultInfo)) {
      throw new ApiException(10017);
    }

    return { ...resultInfo };
  }

  /**
   * 分页加载信息
   */
  async page(page: number, count: number, type: number): Promise<tableType[]> {
    let sql = `SELECT ${tableName}.* FROM ${tableName} order by ${tableName}.id DESC LIMIT ${page * count}, ${count}`;
    if (type) {
      sql = `SELECT ${tableName}.* FROM ${tableName} where ${tableName}.type=${type} order by ${tableName}.order DESC LIMIT ${page * count}, ${count}`;
    }
    // console.log(sql);
    const result: any = await prisma.$queryRawUnsafe(`${sql.toString()}`);
    // console.log(result);
    return result;
  }
}
