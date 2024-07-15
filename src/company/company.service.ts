import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Tag } from '../tag/entity/tag.entity';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { Event } from '../event/entity/event.entity';
import { COMPANY_NAMES } from './company.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import companyConfig from './config/company.config';

@Injectable({
  // scope: Scope.REQUEST, // new instance for each request
  // scope: Scope.TRANSIENT, // new instance for each module
  scope: Scope.DEFAULT, // singleton for the app
})
// @Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    private readonly dataSource: DataSource,
    @Inject(COMPANY_NAMES) private companyNames: string[],
  ) // private readonly configService: ConfigService,
  // @Inject(companyConfig.KEY)
  // private readonly companyConfiguration: ConfigType<typeof companyConfig>,
  {
    console.log('>companyNames', this.companyNames);
    // console.log(configService.get<string>('PG_HOST'));

    // const companyConfigObj = this.configService.get<string>('company.name');
    // console.log('> companyConfigObj', companyConfigObj);

    // console.log('> companyConfiguration', this.companyConfiguration.name);
  }

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

  async recommendCompany(company: Company) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      company.recommendation += 1;

      const recommendEvent = new Event();

      recommendEvent.name = 'recommend_company';
      recommendEvent.type = 'company';
      recommendEvent.payload = {
        companyId: company.id,
      };

      await queryRunner.manager.save(company);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
