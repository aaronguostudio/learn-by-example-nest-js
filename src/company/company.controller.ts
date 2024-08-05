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
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/user/enum/role.enum';
import { Permission } from 'src/iam/authorization/permission.type';
import { Permissions } from 'src/iam/authorization/decorators/permission.decorator';
import { Policies } from 'src/iam/authorization/decorators/policies.decorator';
import { FrameworkContributorPolicy } from 'src/iam/authorization/policies/framework-contributor.policy';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';

// @UsePipes(ValidationPipe)
@ApiTags('company')
@Auth(AuthType.Bearer, AuthType.ApiKey)
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
    // console.log('> protocol', protocol);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.companyService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: string) // using pipe
  findOne(@Param('id') id: string) {
    console.log('> id', id);
    return this.companyService.findOne(id);
  }

  @Policies(new FrameworkContributorPolicy())
  @Roles(Role.Admin)
  @Permissions(Permission.CreateCompany)
  @Post()
  create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  // @Body(ValidationPipe) // param based pipe
  @Roles(Role.Admin)
  @Permissions(Permission.UpdateCompany)
  @Put(':id')
  update(@Param('id') id, @Body() body: UpdateCompanyDto) {
    return this.companyService.update(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id) {
    return this.companyService.delete(id);
  }
}
