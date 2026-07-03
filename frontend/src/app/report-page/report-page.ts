import { Component, computed, inject, input, signal } from '@angular/core';
import { default_student, sample_students, Student } from '../models/student';
import { StudentPaymentReport } from './student-payment-report/student-payment-report';
import { Payment } from '../models/payment';
import { IncomeReport } from './income-report/income-report';
import { StudentDataService } from '../services/student-data-service';

@Component({
  selector: 'app-report-page',
  imports: [StudentPaymentReport, IncomeReport],
  templateUrl: './report-page.html',
  styleUrl: './report-page.css',
})
export class ReportPage {
  
  public students = signal<Student[]>([]);
  public selectedStudent = signal<Student>(default_student);
  public sortedStudents = computed<Student[]>(() => {
    return this.students().sort((a, b) => {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    });
  })

  private studentApi = inject(StudentDataService);

  ngOnInit(): void {
    // load students from the database or API
    this.studentApi.getAllStudents().subscribe(students => {
      this.students.set(students.sort((a, b) => {
        if (a.firstName.localeCompare(b.firstName) !== 0) {
          return a.firstName.localeCompare(b.firstName);
        }
        return a.lastName.localeCompare(b.lastName);
      }))
    });
  }

  public onStudentChange(event: any){
    const selectedStudentId = Number(event.target.value);

    this.selectedStudent.set(
      this.students().find(student => student.id === selectedStudentId) ?? default_student
    )

    console.log('Selected ' + this.selectedStudent().firstName + ' ' + this.selectedStudent().lastName);
  }
}
