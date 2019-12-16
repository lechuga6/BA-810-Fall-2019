import { inject } from 'aurelia-framework';
import { Movie } from '../resources/data/movie-object';

@inject(Movie)
export class Movies {

  constructor(movie) {
    this.movie = movie;
    this.employeeObj = JSON.parse(sessionStorage.getItem('employeeObj'));
  }

  async attached() {
    await this.getMovies();
  }
  async getMovies() {
    await this.movie.getMovies(this.employeeObj._id);
    this.showForm = false;
  }

  updateMovie(movie) {
    this.movie.selectedMovie = movie;
    this.saveMovie();
  }

  newMovie() {
    this.movie.newMovie(this.employeeObj._id);
    this.showForm = true;
  }

  editMovie(movie) {
    this.movie.selectedMovie = movie;
    this.showForm = true;
  }

  async saveMovie() {
    await this.movie.saveMovie();
    this.getMovies();
  }

  async deleteMoviess() {
    await this.movie.deleteMovies(this.movie._id);
    this.getMovies();
  }

  Cancel() {
    this.showForm = false;
  }

  updateMovie(movie) {
    this.movie.selectedMovie = movie;
    this.saveMovie();
  }
  async deleteMovie(movie) {
    await this.movie.deleteMovie(movie._id);
    this.getMovies();
  }
}
