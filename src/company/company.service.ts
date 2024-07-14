import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  private companyList: Company[] = [
    {
      id: '1',
      name: 'Company 1',
      description: 'Description 1',
    },
    {
      id: '2',
      name: 'Company 2',
      description: 'Description 2',
    },
  ];

  findAll() {
    return this.companyList;
  }

  findOne(id: string) {
    const found = this.companyList.find((company) => company.id === id);

    if (!found) {
      throw new NotFoundException('Not found');
    }

    return found;
  }

  create(companyDto: CreateCompanyDto) {
    const company = {
      id: 'temp',
      ...companyDto,
    };
    this.companyList.push(company);
    return company;
  }

  update(id: string, company: UpdateCompanyDto) {
    const foundIndex = this.companyList.findIndex(
      (company) => company.id === id,
    );

    if (foundIndex < 0) {
      throw new NotFoundException('Not found');
    }

    const existing = this.companyList[foundIndex];

    this.companyList[foundIndex] = {
      ...existing,
      ...company,
    };

    return company;
  }

  delete(id: string) {
    const foundIndex = this.companyList.findIndex(
      (company) => company.id === id,
    );

    if (foundIndex >= 0) {
      this.companyList.splice(foundIndex, 1);
    }
  }
}
