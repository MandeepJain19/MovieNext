import View from "./view";

export class HeaderView extends View {
  _parentElement = document.querySelector("nav");
  #searchQuery = "";
  #isHiddenPreview;
  #width;
  showMenu = true;
  render(width) {
    this.#width = width;
    let markup;
    if (width < 1024) markup = this.#generateMarkup1();
    else {
      markup = this.#generateMarkup();
      document.querySelector(".preview-container").classList.remove("hidden");
    }
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandler(handler) {
    window.addEventListener("resize", handler);
    window.addEventListener("load", handler);

    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--menu");
      if (!btn) return;
      this.showMenu = !this.showMenu;
      handler();
    });
  }

  addHandlerRenderWatchlist() {
    this._parentElement.addEventListener("click", (e) => {
      const button1 = e.target.closest(".watchlist");
      const button2 = e.target.closest(".showPreview");
      if (button1) {
        button1.classList.toggle("btn--active");
        document.querySelector(".watchlist--list").classList.toggle("hidden");
      }
      if (button2) {
        const previewContainer = document.querySelector(".preview-container");
        previewContainer.classList.toggle("hidden");
      }
    });
  }

  getQuery() {
    this.#searchQuery =
      this._parentElement.querySelector(".input--search").value;
    return this.#searchQuery;
  }
  #clearInput() {
    this._parentElement.querySelector(".input--search").value = "";
  }
  addHandlerGetInput(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".search-btn");
      console.log("click")
      if (!btn) return;
      handler();
      const previewContainer = document.querySelector(".preview-container");
      previewContainer.classList.remove("hidden");
    });

    this._parentElement.addEventListener("keypress", (e) => {
    console.log("key")
      if (e.key=== "Enter") handler();
      const previewContainer = document.querySelector(".preview-container");
      previewContainer.classList.remove("hidden");
    });
  }

  #generateButtonMarkup() {
    return `
    <div class="searchInput">
      <input
        type="text"
        class="input--search"
        placeholder="Search movies here..."
        value="${this.#searchQuery}"
      />
      <button class="btn search-btn">
        <span>Search</span
        ><i class="ph-bold ph-magnifying-glass"></i>
      </button>
    </div>
    <div class="watchlist">
      <a class="btn btn-watchlist">Watchlist</a>
    </div>`;
  }
  #generateMarkup() {
    return `
    <a class="logo" href="/">
      <span><i class="ph-bold ph-monitor-play"></i></span>
      <span><h1>MovieNext</h1></span>
    </a>
    ${this.#generateButtonMarkup()}`;
  }
  #generateMarkup1() {
    return `
    <a class="logo" href="/">
      <span><i class="ph-bold ph-monitor-play"></i></span>
      <span><h1>MovieNext</h1></span>
    </a>
    <div class="menu">
      <div class="btn btn--menu">
        <!-- <i class="ph-bold ph-list"></i> -->
        <i class="ph-bold ${this.showMenu ? "ph-x" : "ph-list"} "></i>
      </div>
    </div>
    <div class="menu--list ${this.showMenu ? "" : "hidden"}">
      ${this.#generateButtonMarkup()}
        <div class="showPreview">
          <a class="btn btn-searchResults">Show Results</a>
        </div>
    </div>`;
  }
}
export default new HeaderView();
