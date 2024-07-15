import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of a company',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The description of a company',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: [],
  })
  @IsString({ each: true })
  readonly tags: string[];
}
