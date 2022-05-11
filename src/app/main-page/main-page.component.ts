import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToAccount(): void {
    this.router.navigate(['profile'])
  }

  
}
