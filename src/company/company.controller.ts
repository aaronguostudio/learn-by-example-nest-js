import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    console.log('> paginationQuery', paginationQuery);

    return this.companyService.findAll(paginationQuery);
  }

  @Get(':id')
  findById(@Param() params) {
    return this.companyService.findOne(params.id);
  }

  @Post()
  create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @Put(':id')
  update(@Param('id') id, @Body() body: UpdateCompanyDto) {
    return this.companyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.companyService.delete(id);
  }
}
