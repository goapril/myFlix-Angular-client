import { Component, OnInit, Input } from '@angular/core';

// API Service
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = [];
  movies: any = [];
  favorites: any = [];

  /**
  * @param fetchApiData 
  * @param dialog
  * @param snackBar 
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }
  
  /**
  * ngOnInit() is a place to put the code that we need to execute at very first as soon as the class is instantiated
  * This method will run the getUser method after the User Profile Component is initialised and rendered.
  * @returns User object.
  */
  ngOnInit(): void {
    this.getUser();
  }

  /**
  * This method will get user details and array of user's favorite movies
  */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
      console.log(this.user);
    });
  }

  /**
  * This method will get user's favorite movie array
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
      console.log(this.user);
    });
  }

  /**
  * This method filters user's movies
  * @param movie_id
  **/ 
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
  * This method will delete a movie from user's favorite movies
  */
  deleteMovie(id: string, title: string): void {
    this.fetchApiData.deleteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }

  /**
  * This method will update user's profile data
  */
  editUser(): void {
    const dialogRef = this.dialog.open(ProfileUpdateComponent, {
      width: '280px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUser();
    });
  }

  /**
  * Deletes user's account
  */ 
  deleteUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '280px'
    });
  }

  /**
  * @param name
  * @param description
  * Opens modal with movie genre information
  */ 
  showGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name, description },
    });
  }

  /**
  * @param name
  * @param bio
  * @param birth
  * @param death
  * Opens modal with movie director information
  */ 
  showDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(DirectorComponent, {
      data: { name, bio, birth, death },
    });
  }

  /**
  * @param title
  * @param description
  * @param director
  * @param genre
  * @param releaseYear
  * @param imdbRating
  * @param actors
  * Opens modal with movie synopsis
  */ 
  showSynopsis(title: string, description: string, director: string, genre: string, releaseYear: number, imdbRating: number, actors: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title, description, director, genre, releaseYear, imdbRating, actors },
    });
  }

}
