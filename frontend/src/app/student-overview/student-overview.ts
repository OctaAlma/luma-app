import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { default_student, sample_students, Student } from '../models/student';
import { AddPayment } from './add-payment/add-payment';
import { Modal } from 'bootstrap'; // Import Bootstrap's Modal class
import { default_payment, Payment } from '../models/payment';
import { PaymentTable } from './payment-table/payment-table';
import { isNgTemplate } from '@angular/compiler';
import { AddStudent } from './add-student/add-student';
import { RemoveStudent } from './remove-student/remove-student';
import { StudentDataService } from '../services/student-data-service';
import { PaymentDataService } from '../services/payment-data-service';
import { EditPayment } from './edit-payment/edit-payment';


@Component({
  selector: 'app-student-overview',
  imports: [AddPayment, PaymentTable, AddStudent, RemoveStudent, EditPayment],
  templateUrl: './student-overview.html',
  styleUrl: './student-overview.css',
})
export class StudentOverview implements OnInit{
  
  public students = signal<Student[]>([]);
  public sortedStudents = computed<Student[]>(() => {
    return this.students().sort((a, b) => {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    })
  }
  )

  private studentApi = inject(StudentDataService);
  private paymentApi = inject(PaymentDataService);

  ngOnInit(): void {
    this.studentApi.getAllStudents().subscribe(students => {
      this.students.set(students)
    });
  }

  public updateName(id:number){
    const firstNameElement = document.getElementById('input-first-name-' + id) as HTMLInputElement | null;
    const lastNameElement = document.getElementById('input-last-name-' + id) as HTMLInputElement | null;

    let newFirstName: string = ''
    if (firstNameElement){
      newFirstName = firstNameElement.value;
    }

    let newLastName: string = ''
    if (lastNameElement){
      newLastName = lastNameElement.value;
    }

    this.students.update(arr => arr.map((student) => {
      if (student.id === id){
        student.firstName = newFirstName;
        student.lastName = newLastName;
      }
      return student;
    }));

    const updatedStudent: Student = this.students().find((val) => val.id === id) ?? default_student;

    // update the student in the database and add the student back to the array
    this.studentApi.updateStudent(updatedStudent).subscribe((student) => {
      console.log('Student updated to: ')
      console.log(student)
    });
  }

  public updateEmail(id:number){
    const emailInputElement = document.getElementById(`input-email-${id}`) as HTMLInputElement | null;

    let newEmail: string = ''
    if (emailInputElement){
      newEmail = emailInputElement.value;
    }

    this.students.update(arr => arr.map((student) => {
      if (student.id === id){
        student.email = newEmail;
      }
      return student;
    }));

    const updatedStudent: Student = this.students().find((val) => val.id === id) ?? default_student;
    // update the student in the database and add the student back to the array
    this.studentApi.updateStudent(updatedStudent).subscribe((student) => {
      console.log('Student updated to: ')
      console.log(student)
    });
  }

  public updatePhone(id:number){
    const phoneInputElement = document.getElementById('input-phone-' + id) as HTMLInputElement | null;

    let newPhone: string = ''
    if (phoneInputElement){
      newPhone = phoneInputElement.value;
    }

    this.students.update(arr => arr.map((student) => {
      if (student.id === id){
        student.phone = newPhone;
      }
      return student;
    }));

    const updatedStudent: Student = this.students().find((val) => val.id === id) ?? default_student;
    // update the student in the database and add the student back to the array
    this.studentApi.updateStudent(updatedStudent).subscribe((student) => {
      console.log('Student updated to: ')
      console.log(student)
    });
  }

  public handleAddPayment(event: any, studentId: number) {
    // post the payment on the database
    console.log('passing:')
    console.log(event)
    this.paymentApi.createPayment(event).subscribe(payment => {
      // update the student payments on the corresponding signal array 
      this.students.update(arr => arr.map(student => {
        if (student.id === studentId) {
          // Return a new student object with a new payments array
          return {
            ...(student as Student),
            payments: [...student.payments, payment]
          };
        }
        return student;
      }));
    });
  }

  public handleUpdatePayment(event: any) {
    this.paymentApi.updatePayment(event).subscribe(payment => {
      this.students.update(arr => arr.map(student => {
        if (student.id === payment.student){
          return {
            ...(student as Student),
            payments: student.payments.map(p => {
              if (p.id === payment.id){
                return payment;
              }
              return p;
            })
          }
        }
        return student;
      }))
    });
  }

  public handleDeletePayment(event: any){
    // delete student from local students array signal
    this.students.set(this.students().map((student) => {
      student.payments = student.payments.filter(payment => payment.id !== event);
      return student;
    }))

    // delete the corresponding database entry...
    this.paymentApi.deletePayment(event).subscribe(res => { console.log(res); });
  }

  public handleAddStudent(event: any){
    console.log(event);
    this.studentApi.createStudent(event).subscribe((student) => {
      this.students.update(arr => [...arr, student]);
    });
  }

  public handleRemoveStudent(id: any){
    console.log(`Deleting student with id: ${id}`);

    // remove student on the students array
    this.students.set(this.students().filter(student => student.id != (id as number)));
    
    // send delete request to the database
    this.studentApi.deleteStudent(id).subscribe({});
  }
}

