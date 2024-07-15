import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    findAll(paginationQuery: PaginationQueryDto): Promise<import("./entity/company.entity").Company[]>;
    findById(params: any): Promise<import("./entity/company.entity").Company>;
    create(body: CreateCompanyDto): Promise<import("./entity/company.entity").Company>;
    update(id: any, body: UpdateCompanyDto): Promise<import("./entity/company.entity").Company>;
    remove(id: any): Promise<import("./entity/company.entity").Company>;
}
