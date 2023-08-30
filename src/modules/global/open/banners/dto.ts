import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Min,
  IsOptional,
  IsDate,
  IsBoolean,
} from "class-validator";
import { keyStr } from "./config";

export class PageDto$TaskV1 {
  @ApiProperty({
    description: "当前页包含数量",
    required: false,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit: number = 10;

  @ApiProperty({
    description: "当前页包含数量",
    required: false,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({
    description: "type",
    required: false,
    default: '',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  readonly type: number;
}

export class InfoDto$TaskV1 {
  @ApiProperty({
    description: "id",
  })
  @IsString()
  id: string;
}
