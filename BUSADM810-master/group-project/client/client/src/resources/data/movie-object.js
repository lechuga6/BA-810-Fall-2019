/* eslint-disable no-irregular-whitespace */
import {inject} from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class Movie {
  constructor(data) {
    this.data = data;
    this.MOVIE_SERVICE = 'movies';
  }
  newMovie(id) {
    this.selectedMovie = {};
    this.selectedMovie.title = '';
    this.selectedMovie.synopsis = '';
    this.selectedMovie.dateReleased = new Date();
    this.selectedMovie.employeeid = id;
  }
  async saveMovie() {
    let serverResponse;
    if (this.selectedMovie) {
      if (this.selectedMovie._id) {
        let url = this.MOVIE_SERVICE + '/' + this.selectedMovie._id;
        serverResponse = await this.data.put(this.selectedMovie, url);
      } else {
        serverResponse = await this.data.post(this.selectedMovie, this.MOVIE_SERVICE);
      }
      return serverResponse;
    }
  }
  async getMovies(userid) {
    let url = this.MOVIE_SERVICE + '/employee/' + employeeId;
    let response = await this.data.get(url);
    if (!response.error) {
      this.moviesArray = response;
    } else {
      this.moviesArray = [];
    }
  }

  async deleteMovie(id) {
    let url = this.MOVIE_SERVICE + '/' + id;
    await this.data.delete(url);
  }
}
