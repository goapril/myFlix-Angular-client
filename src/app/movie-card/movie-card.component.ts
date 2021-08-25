import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieIds: any[] = [];
 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovieIds = response.FavoriteMovies;
      return this.favoriteMovieIds;
    });
  }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
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

  isFavorite(movieID: string): boolean {
    const favmovie = this.favoriteMovieIds.includes(movieID);
    return favmovie;
  };

  onToggleFavoriteMovie(id: string): any {
    if (this.isFavorite(id)) {
      this.fetchApiData.deleteMovie(id).subscribe((response: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(id);
  }
}
