import { TestBed } from '@angular/core/testing';

import { OneBancTransactionHistoryService } from './transaction-history.service';

describe('OneBancTransactionHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneBancTransactionHistoryService = TestBed.get(OneBancTransactionHistoryService);
    expect(service).toBeTruthy();
  });
});
