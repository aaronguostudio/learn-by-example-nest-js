import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CompanyRatingService {
  constructor(private readonly companyService: CompanyService) {}
}
