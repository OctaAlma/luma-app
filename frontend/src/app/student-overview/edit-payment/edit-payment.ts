import { Component, EventEmitter, Input, OnInit, Output, computed, inject, input, output, signal} from '@angular/core';
import { default_payment, Payment, payment_plans } from '../../models/payment';
import { form, FormField } from "@angular/forms/signals";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PackageDataService } from '../../services/package-data-service';
import { default_package, Package } from '../../models/package';
import { dateStringToLocalDate, toDateInputString } from '../../models/common';


@Component({
  selector: 'app-edit-payment',
  imports: [FormField, DatePipe, CurrencyPipe],
  templateUrl: './edit-payment.html',
  styleUrl: './edit-payment.css',
})
export class EditPayment {
  private packageApi = inject(PackageDataService);

  public studentId = input<number>(-1);
  public studentName = input<string>('DEFAULT NAME');
  public existingPayment = input<Payment>(default_payment);

  public startDate = signal<string>('');
  
  public subscriptions = signal<Package[]>([]);
  public sortedSubscriptions = computed<Package[]>(() => {
    return this.subscriptions().sort((a, b) => {return a.monthlyPrice - b.monthlyPrice});
  });
  
  public currPayment = signal<Payment>(default_payment);

  public paymentForm = form(this.currPayment);
  public endDate = computed(() => {
    const start_date = this.paymentForm().value().startDate 
    const new_end_date = new Date(start_date);
    new_end_date.setMonth(
      new Date(this.paymentForm().value().startDate).getMonth() + 
      this.paymentForm().value().duration
    )
    return new_end_date;
  });

  ngOnInit(): void {
    this.packageApi.getPackages().subscribe(subscriptions => {
      this.subscriptions.set(subscriptions);
    });

    this.currPayment.set({...this.existingPayment(),
      startDate: new Date(this.existingPayment().startDate),
      postDate: new Date(this.existingPayment().postDate)
    });
    
    this.startDate.set(toDateInputString(this.currPayment().startDate));

    this.currPayment.update(curr => ({
      ...curr,
      student: this.studentId()
    }));
  }

  public populate(packageId:number){
    const selectedSubscription = this.sortedSubscriptions().find( a => a.id === packageId ) ?? default_package;
    console.log(selectedSubscription);
    console.log('setting to: ')
    this.currPayment.set({
      ...this.currPayment(), 
      duration: selectedSubscription.duration,
      monthlyPrice: selectedSubscription.monthlyPrice
    });
    console.log({
      ...this.currPayment(),
      duration: selectedSubscription.duration,
      monthlyPrice: selectedSubscription.monthlyPrice
    })    
  }

  @Output() paymentUpdated = new EventEmitter<Payment>();

  public updatePayment(){
    this.currPayment.set({
      ...this.currPayment(),
      startDate: dateStringToLocalDate(this.startDate())
    });

    // post the current payment object to the database
    this.paymentUpdated.emit(this.currPayment());
  }
}
