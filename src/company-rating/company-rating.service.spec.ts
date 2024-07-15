import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRatingService } from './company-rating.service';

describe('CompanyRatingService', () => {
  let service: CompanyRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRatingService],
    }).compile();

    service = module.get<CompanyRatingService>(CompanyRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
