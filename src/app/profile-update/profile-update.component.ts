import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileUpdateComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      //localStorage.setItem('user', this.userData.Username);
      localStorage.setItem('user', resp.user.Username);
      //window.location.reload();
        this.snackBar.open('Profile is updated successfully!', 'OK', {
        duration: 2000
        });  
    }, (resp) => {
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
}
