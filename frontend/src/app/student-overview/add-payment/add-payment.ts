import { Component, EventEmitter, Input, OnInit, Output, computed, inject, input, output, signal} from '@angular/core';
import { default_payment, Payment, payment_plans } from '../../models/payment';
import { form, FormField } from "@angular/forms/signals";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PackageDataService } from '../../services/package-data-service';
import { default_package, Package } from '../../models/package';
import { toDateInputString, dateStringToLocalDate } from '../../models/common';

@Component({
  selector: 'app-add-payment',
  imports: [FormField, DatePipe, CurrencyPipe],
  templateUrl: './add-payment.html',
  styleUrl: './add-payment.css',
})
export class AddPayment implements OnInit{
  private packageApi = inject(PackageDataService);

  public studentId = input<number>(-1);
  public studentName = input<string>('---');

  public startDate = signal<string>('');

  
  public subscriptions = signal<Package[]>([]);
  public sortedSubscriptions = computed<Package[]>(() => {
    return this.subscriptions().sort((a, b) => {return a.monthlyPrice - b.monthlyPrice});
  });
  
  public currPayment = signal<Payment>(default_payment);

  public paymentForm = form(this.currPayment);
  public endDate = computed(() => {
    const setStartDate = dateStringToLocalDate(this.startDate()); 
    const newEndDate = dateStringToLocalDate(this.startDate());
    newEndDate.setMonth(
      setStartDate.getMonth() + 
      this.paymentForm().value().duration
    )
    return newEndDate;
  });

  ngOnInit(): void {
    this.packageApi.getPackages().subscribe(subscriptions => {
      this.subscriptions.set(subscriptions);
    })
    
    this.currPayment.update(curr => ({
      ...curr,
      student: this.studentId()
    }));

    this.startDate.set(toDateInputString(new Date()));
  }

  public populate(packageId:number){
    const selectedSubscription = this.sortedSubscriptions().find( a => a.id === packageId ) ?? default_package;

    this.currPayment.set({
      ...this.currPayment(), 
      duration: selectedSubscription.duration,
      monthlyPrice: selectedSubscription.monthlyPrice
    }); 
  }

  @Output() paymentSaved = new EventEmitter<Payment>();

  public savePayment(){
    // set the startDate to match our date string
    this.currPayment.set({
      ...this.currPayment(),
      startDate: dateStringToLocalDate(this.startDate()),
      postDate: new Date()
    });

    // post the current payment object to the database
    this.paymentSaved.emit(this.currPayment());

    this.currPayment.set(default_payment);
  }
}
