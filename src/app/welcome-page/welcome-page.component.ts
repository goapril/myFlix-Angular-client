import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {}

  /**
   * Open user registration dialog when "Sign up" button is clicked
  */  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Sets the dialogue width
      width: '280px'
    });
  }

  /**
   * Open user registration dialog when "Login" button is clicked
  */  
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Sets the dialogue width
      width: '280px'
    });
  }
}
