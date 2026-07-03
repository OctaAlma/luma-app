import { inject, Service } from '@angular/core';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class PaymentDataService {
    private readonly apiUrl = 'http://localhost:8000/api/payments';
    private http = inject(HttpClient);

    /**
     * GET /api/payments/
     */
    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${this.apiUrl}/`);
    }

    /**
     * GET /api/payments/{id}
     */
    getPayment(id: number): Observable<Payment> {
        return this.http.get<Payment>(`${this.apiUrl}/${id}/`);
    }

    /**
     * POST /api/payments/create
     */
    createPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(
        `${this.apiUrl}/create/`,
        payment
        );
    }

    /**
     * PUT /api/payments/{id}
     */
    updatePayment(payment: Payment): Observable<Payment> {
        return this.http.put<Payment>(
        `${this.apiUrl}/${payment.id}/`,
        payment
        );
    }

    /**
     * DELETE /api/payments/{id}
     */
    deletePayment(id: number): Observable<void> {
        return this.http.delete<void>(
        `${this.apiUrl}/${id}/`
        );
    }
}
