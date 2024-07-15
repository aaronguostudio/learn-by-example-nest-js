"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const company_entity_1 = require("./entity/company.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("../tag/entity/tag.entity");
let CompanyService = exports.CompanyService = class CompanyService {
    constructor(companyRepo, tagRepo) {
        this.companyRepo = companyRepo;
        this.tagRepo = tagRepo;
    }
    async findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return await this.companyRepo.find({
            relations: {
                tags: true,
            },
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const found = await this.companyRepo.findOne({
            where: { id },
            relations: {
                tags: true,
            },
        });
        if (!found) {
            throw new common_1.NotFoundException('Not found');
        }
        return found;
    }
    async create(companyDto) {
        const tags = await Promise.all(companyDto.tags.map((tag) => this.preloadTagByName(tag)));
        const company = await this.companyRepo.create({
            ...companyDto,
            tags,
        });
        return await this.companyRepo.save(company);
    }
    async update(id, companyDto) {
        const tags = companyDto.tags &&
            (await Promise.all(companyDto.tags.map((tag) => this.preloadTagByName(tag))));
        const company = await this.companyRepo.preload({
            id,
            ...companyDto,
            tags,
        });
        if (!company) {
            throw new common_1.NotFoundException('Not found');
        }
        return await this.companyRepo.save(company);
    }
    async delete(id) {
        const company = await this.findOne(id);
        return await this.companyRepo.remove(company);
    }
    async preloadTagByName(name) {
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
};
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map