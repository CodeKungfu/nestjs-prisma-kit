import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray } from "class-validator";
export class DeleteDto {
  @ApiProperty({
    description: `需要删除的ID列表`,
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class DeleteStringIdDto {
  @ApiProperty({
    description: `需要删除的ID列表`,
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
