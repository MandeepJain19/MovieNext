import View from "./view";

class MovieView extends View {
  _parentElement = document.querySelector(".detailView");
  #producer;
  #errorMessage = "Unable to find movie try again.";

  #data;
  render(data) {
    this.#data = data;
    this.#setProducer();
    const markup = this.#generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this.#changeBackgroundImage();
  }
  // PublisherSubscriber Pattern -
  //Publisher
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, () => {
        //Hide preview for small screen
        const width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        if (width < 1024)
          document.querySelector(".preview-container").classList.add("hidden");
        handler();
      })
    );
  }

  #setProducer() {
    this.#producer = this.#data.casts.crew.find(
      (mem) => mem.job === "Producer"
    );
  }

  addHandlerAddToWatchlist(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-addToWatchlist");
      if (!btn) return;
      handler();
    });
  }
  #generateMarkup() {
    return `<div class="movie-details">
    <div class="movie-header">
      <div class="header">
        <div class="header-items">
          <div class="movie-poster">
            <div class="movie-poster">
              <img
                src="https://www.themoviedb.org/t/p/w220_and_h330_bestv2/${
                  this.#data.movie.poster_path
                }"
                alt="Movie Poster"
              />
            </div>
            ${
              this.#data.ottIN
                ? `<div class="movie-ott--main">
                  <div class="ott-img">
                    <img
                      src="https://www.themoviedb.org/t/p/original/${
                        this.#data.ottIN?.flatrate[0]?.logo_path ||
                        this.#data.ottIN?.buy[0]?.logo_path ||
                        this.#data.ottIN?.rent[0]?.logo_path
                      }"
                    />
                  </div>
                  <div class="ott-text">Watch Now!!</div>
                </div>`
                : ""
            }
          </div>
          <div class="movie-details">
            <div>
              <div class="movie-heading">
                <div class="name">
                  <h2>${this.#data.movie.title}</h2>
                </div>
                <div class="more-details">
                  <span class="releaseDate">${this.#data.movie.release_date
                    .split("-")
                    .reverse()
                    .join("/")}</span
                  >
                  <span class="genres">${this.#data.movie.genres.map(
                    (genre) => ` ${genre.name}`
                  )} </span>
                  <span class="time">${Math.floor(
                    this.#data.movie.runtime / 60
                  )}h ${this.#data.movie.runtime % 60}m</span>
                </div>
              </div>
            </div>
            <div class="actions">
              <div class="IMDB-rating">
                <div class="rating">${
                  Math.round(this.#data.movie.vote_average * 10) / 10
                }</div>
              </div>
              <div class="btn-addToWatchlist">
                <a>
                ${
                  this.#data.movie.watchlist === true
                    ? `<i class="ph-bold ph-check"></i>`
                    : `<i class="ph-bold ph-list-bullets"></i>`
                }
                <!--<i class="ph-bold ph-list-bullets"></i>-->
                  <!-- <i class="ph-bold ph-check"></i> -->
                </a>
              </div>
            </div>
            <div class="tagline">
              ${this.#data.movie.tagline}
            </div>
            <div class="overview">
              <h4>Overview</h4>
              <p>
                ${this.#data.movie.overview}
              </p>
            </div>
            <ul class="otherDetails">
            <!-- <li class="details1">
                <p class="title">Aditya Chopra</p>
                <p class="name">Director</p>
              </li>-->
               <li class="details2">
              <p class="title">${this.#producer?.original_name || "-"}</p>
              <p class="name">Producer</p>
            </li>
              <li class="details3">
                <p class="title">$${this.#data.movie.budget}</p>
                <p class="name">Budget</p>
              </li>
              <li class="details4">
                <p class="title">$${this.#data.movie.revenue}</p>
                <p class="name">Revenue</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="topCast-Container">
      <div class="topCast-wrapper">
        <span><h3>Top Cast</h3></span>

        <ul class="topCast">
          ${this.#data.casts.cast
            .map((cast) => {
              if (cast.profile_path === null) return;
              return `
            <li class="cast">
            <div class="cast-card">
              <div class="cast-poster">
                <img
                  src="https://www.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}"
                  alt="Cast Profile Image"
                />
              </div>
              <div class="cast-details">
                <span class="actual-name"
                  ><span>${cast.original_name}</span>
                  <!-- <span class="movie-year"> (1975)</span> -->
                </span>
                <span class="movie-name">${cast.character}</span>
              </div>
            </div>
          </li>
            `;
            })
            .join("")}
        
        </ul>
      </div>
    </div>
    <div class="topCast-Container">
      <div class="topCast-wrapper">
        <span><h3>Top Crew</h3></span>

        <ul class="topCast">
          ${this.#data.casts.crew
            .map((cast) => {
              if (cast.profile_path === null) return;
              return `
            <li class="cast">
            <div class="cast-card">
              <div class="cast-poster">
                <img
                  src="https://www.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}"
                  alt="Cast Profile Image"
                />
              </div>
              <div class="cast-details">
                <span class="actual-name"
                  ><span>${cast.original_name}</span>
                  <!-- <span class="movie-year"> (1975)</span> -->
                </span>
                <span class="movie-name">${cast.job}</span>
              </div>
            </div>
          </li>
            `;
            })
            .join("")}
        
        </ul>
      </div>
    </div>
  </div>`;
  }
  #changeBackgroundImage() {
    this._parentElement.querySelector(
      ".movie-header"
    ).style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${
      this.#data.movie.backdrop_path
    })`;
  }
}

export default new MovieView();
