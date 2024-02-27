// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor( public dialog: MatDialog){ }

  public openRegistrationDialog() : void {
   this.dialog.open(UserRegistrationFormComponent, { width: '380px'});
  }
  public openLoginDialog() : void {
   this.dialog.open(UserLoginFormComponent, { width: '400px'});
  }

}