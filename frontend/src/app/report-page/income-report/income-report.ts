import { Component, computed, input, OnInit, signal } from '@angular/core';
import { Student } from '../../models/student';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { dateStringToLocalDate, toDateInputString } from '../../models/common';

@Component({
  selector: 'app-income-report',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './income-report.html',
  styleUrl: './income-report.css',
})
export class IncomeReport implements OnInit{
  
  public students = input<Student[]>([]);
  public startDate = signal<string>('');
  public endDate = signal<string>('');

  public firstPaymentDate = new Date();
  public oneYearAgo = new Date(); 

  ngOnInit(){
    const currentDate = new Date();
    currentDate.setHours(12, 0, 0, 0);

    this.oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    this.startDate.set(toDateInputString(this.oneYearAgo));
    this.endDate.set(toDateInputString(currentDate));

    // try to find the oldest date on the database
    let currFirstPaymentDate = new Date().getTime();
    for (const student of this.students()){
      currFirstPaymentDate = Math.min(currFirstPaymentDate, ...student.payments.map(item => new Date(item.postDate).getTime()));
    }

    this.firstPaymentDate = new Date(currFirstPaymentDate);
  }

  public computeIncome(start: Date, end: Date){
    start.setHours(0, 0, 0, 0);
    const startTime = start.getTime();
    
    end.setHours(23, 59, 59, 999);
    const endTime = end.getTime();

    let currIncome = 0;
    for (const student of this.students()){
      for (const payment of student.payments){
        const paymentStartTime = new Date(payment.postDate).getTime() 
        if (paymentStartTime >= startTime && paymentStartTime <= endTime){
          currIncome += payment.duration * payment.monthlyPrice;
        }
      }
    }
    
    return currIncome;
  }

  public totalIncome = computed<number>(() => {
    let currIncome = 0;

    for (const student of this.students()){
      for (const payment of student.payments){
        currIncome += payment.duration * payment.monthlyPrice;  
      }
    }
    
    return currIncome;
  });

  public yearlyIncome = computed<number>(() => {
    const currDate = new Date();
    return this.computeIncome(this.oneYearAgo, currDate);
  });

  public incomeBetweenDates = computed<number>(() => {
    return this.computeIncome(dateStringToLocalDate(this.startDate()), dateStringToLocalDate(this.endDate()));
  });

  public enrollmentBetweenDates = computed<number>(() => {
    const start = dateStringToLocalDate(this.startDate());
    start.setHours(0, 0, 0, 0);
    const startTime = start.getTime();

    const end = dateStringToLocalDate(this.endDate());
    end.setHours(23, 59, 59, 999);
    const endTime = end.getTime();

    let numEnrolled = 0;
    for (const student of this.students()){
      for (const payment of student.payments){
        const paymentStartTime = new Date(payment.postDate).getTime() 
        if (paymentStartTime >= startTime && paymentStartTime <= endTime){
          numEnrolled++;
          break;
        }
      }
    }
    return numEnrolled;
  });
}
