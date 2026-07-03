import { Component, EventEmitter, inject, input, model, OnInit, Output, signal } from '@angular/core';
import { Payment } from '../../models/payment';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { PaymentDataService } from '../../services/payment-data-service';

@Component({
  selector: 'app-payment-table',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './payment-table.html',
  styleUrl: './payment-table.css',
})
export class PaymentTable implements OnInit{
  public studentPayments = model<Payment[]>([]);
  public studentId = input<number>(-1);
  public studentName = input<string>('');
  private paymentApi = inject(PaymentDataService);

  ngOnInit(): void {

  }

  @Output() paymentDeleted = new EventEmitter<number>();
  
  public deletePayment(paymentId: number){
    // find and remove the payment from local payments array
    this.paymentDeleted.emit(paymentId);    
  }
}
  