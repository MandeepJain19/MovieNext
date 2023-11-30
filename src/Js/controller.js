import * as model from "./model.js";
import movieView from "./views/movieView.js";
import genresView from "./views/genresView.js";
import allOttView from "./views/allOttView.js";
import preview from "./views/preview.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import paginationView from "./views/paginationView.js";
import watchlistView from "./views/watchlistView.js";
import headerView from "./views/headerView.js";
const getOttPlatform = async function () {
  try {
    // 1. Get all Ott
    await model.getAllWatchProviders();
    // 2 Render all Ott
    allOttView.render(model.state.allOttIN);
  } catch (err) {
    console.log(err);
  }
};

const getGenres = async function () {
  // 1. Get all Genres
  await model.getAllGenres();

  // 2. Render all Generes
  genresView.render(model.state.genres);
};

const controlMovies = async function () {
  try {
    // 1. Get movie id from url /#12545
    const movieId = window.location.hash.slice(1);
    if (!movieId) return;
    movieView.renderSpinner();

    // 2. Re-render Preview & Watchlist (for selection)
    preview.render(model.state.searchResults.movies, genresView.getAllGenres());
    watchlistView.render(model.state.watchlist, genresView.getAllGenres());

    // 3. Loading Movies
    await model.loadMovie(movieId);

    // 4. Redering Movies Details
    movieView.render(model.state.movieDetails);
  } catch (err) {
    console.log(err);
    movieView.renderError(err.message);
  }
};

const controlSearchMovies = async function (newSearch = true) {
  try {
    // 1. Get search query
    const query = headerView.getQuery();
    if (!query) return;
    preview.renderSpinner();

    // 2. Update model pagenumber for new search
    if (newSearch) model.state.searchPageNumber = 1;

    // 3. load results
    await model.loadSearchMovie(query);

    // 4. Render results and pagination
    preview.render(model.state.searchResults.movies, genresView.getAllGenres());
    paginationView.render(
      model.state.searchResults,
      model.state.searchPageNumber
    );
  } catch (err) {
    preview.renderError(err.message);
  }
};

const controlPagination = async function (gotoPage) {
  // 1. Update Page number
  model.state.searchPageNumber = gotoPage;

  // 2. Search for that page.
  await controlSearchMovies(false);
};

const controlAddWatchlist = function () {
  // 1. Add / Remove movie from Watchlist
  if (model.state.movieDetails.movie.watchlist)
    model.removeWatchlist(model.state.movieDetails.movie.id);
  else model.addToWatchlist(model.state.movieDetails.movie);

  // 2. Update MovieView
  movieView.render(model.state.movieDetails);

  // 3. Render WatchlistView
  // watchlistView.render(model.state.watchlist);
  controlWatchlist();
};

const controlWatchlist = function () {
  watchlistView.render(model.state.watchlist);
};

const controlHeading = function () {
  // 1. Get width of user screen.
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  headerView.render(width);
};

// PublisherSubscriber Pattern
const init = function () {
  getGenres();
  // getOttPlatform();

  // Subscribers
  headerView.addHandler(controlHeading);
  headerView.addHandlerRenderWatchlist(controlWatchlist);
  headerView.addHandlerGetInput(controlSearchMovies);
  watchlistView.addHandlerRender(controlWatchlist);
  paginationView.addHandlerClick(controlPagination);
  movieView.addHandlerRender(controlMovies);
  movieView.addHandlerAddToWatchlist(controlAddWatchlist);
};
init();
