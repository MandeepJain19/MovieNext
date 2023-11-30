import { mark } from "regenerator-runtime";
import View from "./view.js";
class WatchlistView extends View {
  _parentElement = document.querySelector(".watchlist--list");
  #data;
  #genres;
  render(data, genres) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.#renderMessage();
    this.#data = data;
    this.#genres = genres;
    if (!data) return;
    this._clear();
    const markup = this.#generateMarkup();
    document
      .querySelector(".watchlist--list")
      .insertAdjacentHTML("afterbegin", markup);
  }
  #generateMarkup() {
    const previewMovies = this.#data.map((movie) =>
      this.#generateMarkupPreview(movie)
    );
    return `<div class="preview">
    <div class="hidden show">
              <div class="watchlist closeBtn">
                <div class="btn btn--close">
                  <i class="ph-bold ph-x"></i>
                </div>
              </div>
            </div>
    <div class="watchlistResult searchResult">
    ${previewMovies.join("")}
    </div>
    </div>
    `;
  }
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
    window.addEventListener("hashchange", handler);

    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".closeBtn");
      if (!btn) return;
      this._parentElement.classList.add("hidden");
    });
  }
  #generateMessage() {
    return `
    <div class="message">
                <div class="icon"><i class="ph-bold ph-smiley"></i></div>
                <p>No Watchlist yet, Find a nice movies and add to watchlist</p>
              </div>`;
  }
  #renderMessage() {
    this._clear();

    const message = this.#generateMessage();
    this._parentElement.insertAdjacentHTML("afterbegin", message);
  }

  #generateMarkupPreview(movie) {
    const id = window.location.hash.slice(1);
    return `<a class="movie-card ${
      movie.id == id ? "selected" : ""
    } " data-id="${movie.id}" href="#${movie.id}">
    <div class="movie-poster ">
      <img
        src="https://www.themoviedb.org/t/p/w220_and_h330_bestv2${
          movie.poster_path
        }"
        alt="Movie Poster"
      />
    </div>
    <div class="movie-details">
      <span class="movie-name"
        ><span>${movie.title}</span
        ><span class="movie-year"> (${movie.release_date?.slice(0, 4)})</span>
      </span>
      <span class="movie-genres"> ${movie.genres.map(
        (genre) => `<span> ${genre.name}</span>`
      )}</span>
    </div>
  </a>`;
  }
}

export default new WatchlistView();
