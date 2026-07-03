import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PackageDataService } from '../services/package-data-service';
import { default_package, Package } from '../models/package';
import { AddPackage } from './add-package/add-package';
import { EditPackage } from './edit-package/edit-package';

@Component({
  selector: 'app-pricing-page',
  imports: [CurrencyPipe, AddPackage, EditPackage],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
})
export class PricingPage implements OnInit {
  private packageApi = inject(PackageDataService);
  
  public subscriptions = signal<Package[]>([]);
  public sortedSubscriptions = computed<Package[]>(() => {
    return this.subscriptions().sort((a, b) => {
      return a.monthlyPrice - b.monthlyPrice;
    });
  })

  ngOnInit(){
    this.packageApi.getPackages().subscribe(subscriptions => {
      this.subscriptions.set(subscriptions);
    })
  }

  public handleAddPackage(newPackage: any){
    console.log('adding: ')
    console.log(newPackage);
    this.packageApi.createPackage(newPackage).subscribe((subscription) => {
      console.log(subscription);
      this.subscriptions.set([...this.subscriptions(), subscription]);
    });
  }

  public handleEditPackage(editedPackage: any){
    this.packageApi.updatePackage(editedPackage).subscribe((editedSub) => {
      this.subscriptions.set(this.subscriptions().map((sub) => {
        if (sub.id === editedSub.id){
          return editedSub;
        }
        return sub;
      }))
    });
  }

  public deletePackage(id: number){
    // send the deletion to the database
    this.packageApi.deletePackage(id).subscribe({
      next: (response) => {
        console.log(`succesfully deleted: ${id}: `, response);
      },
      error: (err) => {
        console.log(`error: `, err);
      }
    });

    console.log('deleting: ')
    console.log(this.subscriptions().find(a => a.id === id));

    // update the local subscriptions arr
    this.subscriptions.set(this.subscriptions().filter(sub => sub.id !== id))
  }
}
