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

  /**
   * routes to profile page
   */
  goToAccount(): void {
    this.router.navigate(['profile'])
  }

  /**
   * removes token and user from localStorage to allow users to logout, then routes to welcome screen
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // localStorage.removeItem('persist:root');
    this.router.navigate(['/welcome'])
  }

  /**
   * navigates to favorite movies page
   */
  goToFavorites(): void {
    this.router.navigate(['favorites'])
  }

  /**
   * navigates to main page where the user can view all movies
   */
  goToHome(): void {
    this.router.navigate(['movies']);
  }

}
