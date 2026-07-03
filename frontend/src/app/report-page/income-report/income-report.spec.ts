import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeReport } from './income-report';

describe('IncomeReport', () => {
  let component: IncomeReport;
  let fixture: ComponentFixture<IncomeReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeReport],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
