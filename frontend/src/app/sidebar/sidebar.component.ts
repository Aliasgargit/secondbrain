import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent {
  constructor(private router: Router) {}
  navigate(type: string) {
    this.router.navigate(['/content', type]);
  }
}