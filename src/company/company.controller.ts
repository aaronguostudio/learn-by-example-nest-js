import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';

// @UsePipes(ValidationPipe)
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @UsePipes(ValidationPipe)
  @Public()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  // async findAll(@Query() paginationQuery: PaginationQueryDto) {
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('> protocol', protocol);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.companyService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: string) // using pipe
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log('> id', id);
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  // @Body(ValidationPipe) // param based pipe
  @Put(':id')
  update(@Param('id') id, @Body() body: UpdateCompanyDto) {
    return this.companyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.companyService.delete(id);
  }
}
