import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBancTransactionHistoryComponent } from './one-banc-transaction-history.component';

describe('OneBancTransactionHistoryComponent', () => {
  let component: OneBancTransactionHistoryComponent;
  let fixture: ComponentFixture<OneBancTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneBancTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneBancTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
