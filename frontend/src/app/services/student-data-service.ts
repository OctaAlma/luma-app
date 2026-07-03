import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { Payment } from '../models/payment';


@Service()
export class StudentDataService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/students';

    /**
     * GET /api/students/
     */
    public getAllStudents(): Observable<Student[]>{
        return this.http.get<Student[]>(`${this.apiUrl}/`);
    }

    /**
     * POST /api/students/create/
     */
    public createStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(`${this.apiUrl}/create/`, student);
    }

    /**
     * GET /api/students/{id}/
     */
    public getStudent(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.apiUrl}/${id}/`);
    }

    /**
     * PUT /api/students/{id}/
     */
    public updateStudent(student: Student): Observable<Student> {
        return this.http.put<Student>(`${this.apiUrl}/${student.id}/`, student);
    }

    /**
     * DELETE /api/students/{id}/
     */
    public deleteStudent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}/`);
    }

}
