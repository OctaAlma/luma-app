import { Component, computed, input, OnInit, signal } from '@angular/core';
import { default_student, Student } from '../../models/student';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Payment } from '../../models/payment';
import { dateStringToLocalDate, toDateInputString } from '../../models/common';

@Component({
  selector: 'app-student-payment-report',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './student-payment-report.html',
  styleUrl: './student-payment-report.css',
})
export class StudentPaymentReport implements OnInit {
  public student = input<Student>(default_student);

  public startDate = signal<string>('');
  public endDate = signal<string>('');

  ngOnInit(){
    this.endDate.set(toDateInputString(new Date));

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    this.startDate.set(toDateInputString(oneYearAgo));
  }

  public filteredPayments = computed<Payment[]>(() => {
    const start = dateStringToLocalDate(this.startDate());
    start.setHours(0, 0, 0, 0);
    const startTimestamp = start.getTime();
    
    const end = dateStringToLocalDate(this.endDate());
    end.setHours(23, 59, 59, 999);
    const endTimestamp = end.getTime();

    return this.student().payments.filter((item) => {
      const itemTimestamp = new Date(item.postDate).getTime();
      return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
    }).sort((a, b) => new Date(a.postDate).getTime() - new Date(b.postDate).getTime());
  });

  public runningTotals = computed<number[]>(() => {
    let res: number[] = [];
    let runningTotal = 0;
    for (const payment of this.filteredPayments()){
      runningTotal += payment.monthlyPrice * payment.duration;
      res.push(runningTotal);
    }
    return res;
  });
}
