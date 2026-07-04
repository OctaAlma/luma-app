import { Component, computed, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { NewPackageForm, default_new_package_form, Package } from '../../models/package';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-add-package',
  imports: [FormField, CurrencyPipe],
  templateUrl: './add-package.html',
  styleUrl: './add-package.css',
})
export class AddPackage {

  public newPackage = signal<NewPackageForm>(default_new_package_form);
  public packageForm = form(this.newPackage);
  public monthlyPrice = computed<number>(() => {
    console.log(this.newPackage());
    const duration = this.newPackage().duration;
    if (duration > 0){
      return this.newPackage().totalPrice / duration;
    }
    return this.newPackage().totalPrice;
  })

  ngOnInit(): void {}

  @Output() packageEmitter = new EventEmitter<Package>();

  public addPackage(){

    const planName = this.newPackage().planName;
    const monthlyPrice = Math.round(this.monthlyPrice() * 100) / 100;
    const duration = this.newPackage().duration;

    // perform form validation and highlight any incorrect forms

    // if everything looks good
    this.packageEmitter.emit({
      id: -1,
      planName: planName,
      monthlyPrice: monthlyPrice,
      duration: duration
    });

    this.newPackage.set(default_new_package_form);
    this.packageForm().reset(default_new_package_form)
  }
}
