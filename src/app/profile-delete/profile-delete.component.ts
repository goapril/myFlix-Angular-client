import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteUser(): void {
    const username: any = localStorage.getItem('username');
    this.fetchApiData.deleteUser(username).subscribe(() => {
      this.snackBar.open('Your account has been deleted!', 'OK',
        { duration: 3000,}
      );
      localStorage.clear();
    },
      (result) => {
      this.snackBar.open(result, 'OK', {duration: 3000,});
      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      });
    }
    );
  }

  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }
}
