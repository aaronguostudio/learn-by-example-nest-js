import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
