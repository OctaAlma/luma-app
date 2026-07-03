import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type Page = 'students' | 'reports' | 'pricing'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public onStudentsPage = false;
  public onReportsPage = false;
  public onPricingPage = false;

  public pageClicked(p: Page){
    this.onStudentsPage = false;
    this.onReportsPage = false;
    this.onPricingPage = false;

    switch(p){
      case ('students'):
        this.onStudentsPage = true;
        break;
      
      case ('reports'):
        this.onReportsPage = true;
        break;

      case ('pricing'):
        this.onPricingPage = true;
        break;
    }
  }
}
