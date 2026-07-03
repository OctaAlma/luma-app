import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentReport } from './student-payment-report';

describe('StudentPaymentReport', () => {
  let component: StudentPaymentReport;
  let fixture: ComponentFixture<StudentPaymentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPaymentReport],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPaymentReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
