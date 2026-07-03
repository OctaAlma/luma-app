import { inject, Service } from '@angular/core';
import { Package } from '../models/package';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class PackageDataService {
    private readonly apiUrl = 'http://localhost:8000/api/packages'
    private http = inject(HttpClient);

    /**
         * GET /api/packages/
         */
        getPackages(): Observable<Package[]> {
            return this.http.get<Package[]>(`${this.apiUrl}/`);
        }
    
        /**
         * GET /api/packages/{id}
         */
        getPackage(id: number): Observable<Package> {
            return this.http.get<Package>(`${this.apiUrl}/${id}/`);
        }
    
        /**
         * POST /api/packages/create
         */
        createPackage(subscription: Package): Observable<Package> {
            return this.http.post<Package>(
                `${this.apiUrl}/create/`,
            subscription
            );
        }
    
        /**
         * PUT /api/packages/{id}
         */
        updatePackage(subscription: Package): Observable<Package> {
            return this.http.put<Package>(
                `${this.apiUrl}/${subscription.id}/`, subscription
            );
        }
    
        /**
         * DELETE /api/packages/{id}
         */
        deletePackage(id: number): Observable<void> {
            return this.http.delete<void>(
                `${this.apiUrl}/${id}/`
            );
        }
}
