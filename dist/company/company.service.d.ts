import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Tag } from 'src/tag/entity/tag.entity';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
export declare class CompanyService {
    private readonly companyRepo;
    private readonly tagRepo;
    constructor(companyRepo: Repository<Company>, tagRepo: Repository<Tag>);
    findAll(paginationQuery: PaginationQueryDto): Promise<Company[]>;
    findOne(id: string): Promise<Company>;
    create(companyDto: CreateCompanyDto): Promise<Company>;
    update(id: string, companyDto: UpdateCompanyDto): Promise<Company>;
    delete(id: string): Promise<Company>;
    private preloadTagByName;
}
