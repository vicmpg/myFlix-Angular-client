import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

// Import to bring in the API call created in 6.2
import { FetchApiDataService  } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  user: any = {};
  userData = { Username: "", FavoriteMovies: []};
  FavoriteMovies: any[] = [];

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  // function for getting all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //Function that will open the dialog when director button is clicked
  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '450px',
    });
  }

  //Function that will open the dialog when genre button is clicked
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  // Function Syp.
  // ...

  // Function to get favMovie list
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    console.log(this.userData.FavoriteMovies)
  }

  // Function to check if movie is favMovie
  isFav(_id: string): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === movie._id);
  }

  // Function add / delete favMovie by icon button
  toggleFav(movie: any): void {
    console.log(movie);
    console.log(movie._id);
    const isFavorite = this.isFav(movie._id);
    console.log(this.isFav(movie._id));
    isFavorite
      ? this.deleteFavMovies(movie._id)
      : this.addFavMovies(movie._id);
  }

  // Function to add movie to favMovie list
  addFavMovies(MovieID: string): void {
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((resp: any) => {
      console.log('Add Favorite Movies Response:', resp);
      if (resp.success) {
        this.snackBar.open('Movie has been added to your favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavMovies();
    } else {
      console.error(`Failed to add movie to favorites.`);
    }},
    (error) => {
      console.error('Error: ', error);
    });
  }

  // Function to delete movie from favMovie list
  deleteFavMovies(MovieID: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        'Movie has been deleted from your favorites!',
        'OK',
        {
          duration: 2000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavMovies();
  }
}