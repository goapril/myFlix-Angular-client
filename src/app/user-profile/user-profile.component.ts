import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
      console.log(this.user);
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
      console.log(this.user);
    });
  }

  /*filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    console.log(this.user.FavoriteMovies);
    return this.favorites;
  }*/

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

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

  editUser(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '280px'
    });
  }

  deleteUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '280px'
    });
  }

  showGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name, description },
    });
  }

  showDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(DirectorComponent, {
      data: { name, bio, birth, death },
    });
  }

  showSynopsis(title: string, description: string, director: string, genre: string, releaseYear: number, imdbRating: number, actors: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title, description, director, genre, releaseYear, imdbRating, actors },
    });
  }

}
