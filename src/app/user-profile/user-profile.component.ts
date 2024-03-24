import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

// Components
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

// Import to bring in the API call created in 6.2
import { FetchApiDataService  } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  @Input() userData = { Username: "", Email: "", Birthday: "", FavoriteMovies:[] };

  user: any = {};
  movies: any[]=[];
  FavoriteMovies: any[]=[];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  // function for getting user
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  // function for updating user info
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('User update success:', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User update successful', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Error updating user:', error);
      this.snackBar.open('Failed to update user', 'OK', {
        duration: 2000
      });
    });
  }


  // function to delete user profile
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('User deleted successful', 'OK', {
        duration: 2000
      });
    });
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

 // Function that will open the dialog when synopsis button is clicked
 openSynopsisDialog(description: string): void {
  this.dialog.open(MovieSynopsisComponent, {
    data: {
      Description: description,
    },
    width: '450px',
  });
}

// Function to get favMovie list
getFavMovies(): void {
  this.user = this.fetchApiData.getUser();
  this.userData.FavoriteMovies = this.user.FavoriteMovies;
  this.FavoriteMovies = this.user.FavoriteMovies;
  console.log('Fav Movies in getFavMovie', this.FavoriteMovies);
}

 // Function to check if movie is favMovie
 isFav(movie: any): any {
  const MovieID = movie._id;
  if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
    return true;
  } else {
    return false;
  }
}

 // Function to delete movie from favMovie list
 deleteFavMovies(movie: any): void {
  this.user = this.fetchApiData.getUser();
  this.userData.Username = this.user.Username;
  this.fetchApiData.deleteFavoriteMovies(movie).subscribe((result) => {
    localStorage.setItem('user', JSON.stringify(result));
    this.getFavMovies();
    this. getProfile();
    this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
      duration: 3000,
    });
  });
}
}
