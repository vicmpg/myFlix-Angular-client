import { Component, OnInit, Input} from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import {MatDialogRef}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit{

  @Input() userData = { username: '', password: '', email: '', birthdate: ''};


  constructor(public fetchApiData: FetchApiDataService,
              public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
              public snackBarRef: MatSnackBar
    ) {

   }


  ngOnInit(): void {	
  }	  


  registerUser(): void{
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      this.snackBarRef.open('User registered successfully!', 'OK', { duration: 2000});
    }, (response) => {
      console.log(response);
      this.snackBarRef.open(response, 'OK', {  duration: 2000});
    });

  }

}	
