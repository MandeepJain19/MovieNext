class genresView {
  #parentElement = document.querySelector(".allGenres");
  #genres;

  render(genres) {
    this.#genres = genres;
    const markup = this.#generateMarkup();
    // this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  getAllGenres() {
    const genresMap = new Map();
    this.#genres.forEach((genre) => genresMap.set(genre.id, genre.name));
    return genresMap;
  }
  #generateMarkup() {
    const markup = this.#genres.map((genre) => {
      return `<span data-id="${genre.id}" >${genre.name}</span>`;
    });
    return markup.join(" ");
  }
}

export default new genresView();
