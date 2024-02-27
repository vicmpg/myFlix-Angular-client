import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit{
  movies : any[] = [];

  constructor(public fetchApi: FetchApiDataService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  public getAllMovies(): void {
    this.fetchApi.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(response);
      return this.movies;
    });
  }
}
