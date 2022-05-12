import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAccount(): void {
    this.router.navigate(['profile'])
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome'])
  }

  goToFavorites(): void {
    this.router.navigate(['favorites'])
  }

  goToHome(): void {
    this.router.navigate(['movies']);
  }

}
