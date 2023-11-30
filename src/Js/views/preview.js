import View from "./view.js";
class Preview extends View {
  _parentElement = document.querySelector(".preview--results");
  #data;
  #genres;
  render(data, genres) {
    this.#data = data;
    this.#genres = genres;
    if (!data) return;
    this._clear();
    const markup = this.#generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  #generateMarkup() {
    const previewMovies = this.#data.map((movie) =>
      this.#generateMarkupPreview(movie)
    );
    return previewMovies.join("");
  }

  addHandler(handler) {
    window.addEventListener("hashchange", handler);
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
      <span class="movie-genres"> ${movie.genre_ids?.map((genre) => {
        return `<span> ${this.#genres.get(genre)}</span>`;
      })}</span>
    </div>
  </a>`;
  }
}

export default new Preview();
