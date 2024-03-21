import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Import to bring in the API call created in 6.2
import { FetchApiDataService  } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
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
    console.log(this.user)
  }
}