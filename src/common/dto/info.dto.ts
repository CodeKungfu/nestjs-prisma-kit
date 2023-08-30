import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min } from 'class-validator';

export class InfoDto {
  @ApiProperty({
    description: `需要查询的ID`,
  })
  @Type(() => Number)
  @IsInt()
  id: number;
}
