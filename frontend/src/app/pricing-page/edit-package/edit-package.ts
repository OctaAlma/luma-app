import { Component, computed, EventEmitter, input, OnInit, Output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { NewPackageForm, default_new_package_form, Package } from '../../models/package';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-edit-package',
  imports: [FormField, CurrencyPipe],
  templateUrl: './edit-package.html',
  styleUrl: './edit-package.css',
})
export class EditPackage implements OnInit{

  public existingPackage = input<Package>();

  public packageId = -1;
  public currPackage = signal<NewPackageForm>(default_new_package_form);
  public packageForm = form(this.currPackage);
  
  public monthlyPrice = computed<number>(() => {
    console.log(this.currPackage());
    const duration = this.currPackage().duration;
    if (duration > 0){
      return this.currPackage().totalPrice / duration;
    }
    return this.currPackage().totalPrice;
  })

  ngOnInit(): void {
    this.packageId = this.existingPackage()?.id ?? -1;

    this.currPackage.set({
      planName: this.existingPackage()?.planName ?? '',
      totalPrice: (this.existingPackage()?.monthlyPrice ?? 0) * (this.existingPackage()?.duration ?? 0),
      duration: (this.existingPackage()?.duration ?? 1)
    });
  }

  @Output() packageEmitter = new EventEmitter<Package>();

  public editPackage(){

    const planName = this.currPackage().planName;
    const monthlyPrice = this.monthlyPrice();
    const duration = this.currPackage().duration;

    // perform form validation and highlight any incorrect forms

    // if everything looks good
    this.packageEmitter.emit({
      id: this.packageId,
      planName: planName,
      monthlyPrice: monthlyPrice,
      duration: duration
    });

    this.currPackage.set(default_new_package_form);
  }
}
