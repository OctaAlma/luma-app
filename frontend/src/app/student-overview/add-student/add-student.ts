import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core'; 
import { form, FormField } from '@angular/forms/signals';
import { default_student, Student } from '../../models/student';

@Component({
  selector: 'app-add-student',
  imports: [FormField],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css',
})
export class AddStudent implements OnInit{

  public currStudent = signal<Student>(default_student);

  public studentForm = form(this.currStudent);

  ngOnInit(): void {}

  private hasWhitespace = (str: string): boolean => {
    return /\s/.test(str);
  };

  @Output() newStudent = new EventEmitter<Student>();

  public addStudent(){

    const first_name = this.studentForm.firstName().value().trimEnd();
    const last_name = this.studentForm.lastName().value().trimEnd();
    const email = this.studentForm.email().value().trimEnd();
    const phone = this.studentForm.phone().value().trimEnd();

    // perform form validation and highlight any incorrect forms

    // if everything looks good
    this.newStudent.emit(this.currStudent());
  }
}
