import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CompanyRatingService {
  constructor(private readonly companyService: CompanyService) {}
}
