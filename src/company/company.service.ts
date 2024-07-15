import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Tag } from '../tag/entity/tag.entity';
import { PaginationQueryDto } from '../common/pagination-query.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.companyRepo.find({
      relations: {
        tags: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const found = await this.companyRepo.findOne({
      where: { id },
      relations: {
        tags: true,
      },
    });

    if (!found) {
      throw new NotFoundException('Not found');
    }

    return found;
  }

  async create(companyDto: CreateCompanyDto) {
    const tags = await Promise.all(
      companyDto.tags.map((tag) => this.preloadTagByName(tag)),
    );

    const company = await this.companyRepo.create({
      ...companyDto,
      tags,
    });
    return await this.companyRepo.save(company);
  }

  async update(id: string, companyDto: UpdateCompanyDto) {
    const tags =
      companyDto.tags &&
      (await Promise.all(
        companyDto.tags.map((tag) => this.preloadTagByName(tag)),
      ));

    const company = await this.companyRepo.preload({
      id,
      ...companyDto,
      tags,
    });

    if (!company) {
      throw new NotFoundException('Not found');
    }

    return await this.companyRepo.save(company);
  }

  async delete(id: string) {
    const company = await this.findOne(id);
    return await this.companyRepo.remove(company);
  }

  private async preloadTagByName(name: string) {
    const existingTag = await this.tagRepo.findOne({
      where: {
        name,
      },
    });

    if (existingTag) {
      return existingTag;
    }

    return this.tagRepo.create({ name });
  }
}
