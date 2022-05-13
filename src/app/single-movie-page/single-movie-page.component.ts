import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-single-movie-page',
  templateUrl: './single-movie-page.component.html',
  styleUrls: ['./single-movie-page.component.scss']
})
export class SingleMoviePageComponent implements OnInit {

  movie: any = {};

  constructor(private route: ActivatedRoute, private fetchAPI: UserRegistrationService) { }

  ngOnInit(): void {
    this.getMovieDetails();
    console.log(this.movie)
  }

  getMovieDetails(): void {
    let title = this.route.snapshot.paramMap.get('MovieTitle');
    console.log(title);
    this.fetchAPI.getMovie(title).subscribe(result => {
      this.movie = result;
      console.log(result)
    })
  }

}
