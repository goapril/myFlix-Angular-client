import { Component, OnInit, Input } from '@angular/core';

// Angular Material
import { MatDialogRef } from '@angular/material/dialog'; // To close the dialog on success
import { MatSnackBar } from '@angular/material/snack-bar'; // Service for displaying snack-bar notifications

// This import brings in the server-side API calls (Task 6.2)
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  // The Input decorator defines the components input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
  * @param fetchApiData 
  * @param dialogRef 
  * @param snackBar 
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  /**
  *This is the function responsible for sending the form inputs to the backend
  */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here!
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('Registration is successful. Please login.', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
