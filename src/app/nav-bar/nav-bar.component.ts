
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /**
  * @param snackBar
  * @param router
  */
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
  * Navigates to the movies page.
  */
  movies(): void {
    this.router.navigate(['movies']);
  }

  /**
  * Navigates to the profile page.
  */
  goToProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
  * This method will clear the token and username from local storage.
  * Logs user out and navigates to the welcome page.
  */
  signOut(): void {
    localStorage.clear;
    this.router.navigate(['welcome']);
    this.snackBar.open('You are logged out!', 'OK', {
      duration: 2000
    });
  }
}