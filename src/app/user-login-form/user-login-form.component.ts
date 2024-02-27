import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import {MatDialogRef}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit{
  @Input() loginData = { username: '', password: ''}

  constructor(public fetchApi: FetchApiDataService,
    public matdialog: MatDialogRef<UserLoginFormComponent>,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public loginUser(){
    this.fetchApi.userLogin(this.loginData).subscribe((result) => {
      // Successfully login done
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);

      this.matdialog.close();
      this.snackbar.open('Login successfull!!!', 'OK', { duration: 2000});


   }, (response) => {
      this.snackbar.open(response, 'OK', { duration: 2000});
   });

  }

}
