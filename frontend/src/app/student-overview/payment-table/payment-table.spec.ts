import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTable } from './payment-table';

describe('PaymentTable', () => {
  let component: PaymentTable;
  let fixture: ComponentFixture<PaymentTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
