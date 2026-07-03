import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { default_student, Student } from '../../models/student';
import { StudentDataService } from '../../services/student-data-service';

@Component({
  selector: 'app-remove-student',
  imports: [],
  templateUrl: './remove-student.html',
  styleUrl: './remove-student.css',
})
export class RemoveStudent {
  public student = input<Student>(default_student);
  public modalId = input<string>('');

  @Output() removeStudentEmitter = new EventEmitter<number>();

  public removeStudent(id: number){
    this.removeStudentEmitter.emit(id);
  }
}
