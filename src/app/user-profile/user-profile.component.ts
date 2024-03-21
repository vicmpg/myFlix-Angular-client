import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  @Input() userData = { Username: "", Email: "", Birthday: "" };

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  // function for getting user
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
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
}