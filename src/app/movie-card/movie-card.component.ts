import { Component, OnInit } from '@angular/core';
// API Service
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
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
  * This method will get all movies
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
  * This method will check if movie is in favorite list
  */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovieIds = response.FavoriteMovies;
      return this.favoriteMovieIds;
    });
  }

  /**
  * This method will run the getMovies and getFavoriteMovies method after the MovieCard Component is initialised and rendered.
  * @returns array of movies and favorite movies objects.
  */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Opens modal with movie genre details
   * @param name
   * @param description
   */
  showGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name, description },
    });
  }

  /**
   * Opens modal with movie director details
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
  showDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(DirectorComponent, {
      data: { name, bio, birth, death },
    });
  }

  /**
   * Opens modal with movie synopsis
   * @param title
   * @param description
   * @param director
   * @param genre
   * @param releaseYear
   * @param imdbRating
   * @param actors
   */
  showSynopsis(title: string, description: string, director: string, genre: string, releaseYear: number, imdbRating: number, actors: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title, description, director, genre, releaseYear, imdbRating, actors },
    });
  }

  /**
   * Adds or removes movie from user's list of favorites
   * @param movieID
   */
  isFavorite(movieID: string): boolean {
    const favmovie = this.favoriteMovieIds.includes(movieID);
    return favmovie;
  };

  /**
   * Adds or removes movie from user's list of favorites
   * @param id 
   * @returns favorite movies
   */
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
