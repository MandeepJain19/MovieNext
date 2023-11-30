import { API_URL, API_OPTIONS } from "./config";
import { getJSON } from "./helpers.js";
export const state = {
  movieDetails: {},
  genres: [],
  allOttIN: [],
  searchResults: {},
  query: "",
  searchPageNumber: 1,
  watchlist: [],
};
export const loadMovie = async function (movieId) {
  try {
    // 1. Get movie details
    state.movieDetails.movie = await getJSON(
      `${API_URL}/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    if (state.watchlist.some((watchlist) => watchlist.id == movieId))
      state.movieDetails.movie.watchlist = true;
    else state.movieDetails.movie.watchlist = false;

    // 2. Loding Casts
    state.movieDetails.casts = await getJSON(
      `${API_URL}/movie/${movieId}/credits?language=en-US`,
      API_OPTIONS
    );

    // 3. Getting WatchProviders
    const ott = await getJSON(
      `${API_URL}/movie/${movieId}/watch/providers`,
      API_OPTIONS
    );
    state.movieDetails.ottIN = ott.results.IN;
  } catch (err) {
    console.log(err + "in model");
    throw err;
  }
};

export const getAllGenres = async function () {
  const genres = await getJSON(
    `${API_URL}/genre/movie/list?language=en`,
    API_OPTIONS
  );
  state.genres = genres.genres;
};
export const getAllWatchProviders = async function () {
  const data = await getJSON(
    `${API_URL}/watch/providers/movie?language=en-US&watch_region=In`,
    API_OPTIONS
  );
  state.allOttIN = data.results;
};

export const loadSearchMovie = async function (query) {
  try {
    // 1. Search movie for query
    state.query = query;
    const data = await getJSON(
      `${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${state.searchPageNumber}`,
      API_OPTIONS
    );

    // 2. Check if movie found or not.
    const results = data.results;
    if (!results || results.length === 0)
      throw new Error(`No Movie Found with "${query}"`);

    // 3. Set pageNumber,totalPages & totalResults
    const otherDetails = {
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
    state.searchResults = otherDetails;

    // 4. Filter movie which dont have poster image
    state.searchResults.movies = results.filter(
      (movie) => movie.poster_path !== null
    );
  } catch (err) {
    throw err;
  }
};

const persistWatchlist = function () {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
};
export const addToWatchlist = function (movie) {
  // 1. Add move to Watchlist Array.
  state.watchlist.push(movie);

  // 2. Mark Current movie as watchlist.
  if (movie.id === state.movieDetails.movie.id)
    state.movieDetails.movie.watchlist = true;

  // 3. Save to localStorage.
  persistWatchlist();
};

export const removeWatchlist = function (movieId) {
  // 1. Remove movie from list.
  const index = state.watchlist.findIndex((el) => el.id == movieId);
  state.watchlist.splice(index, 1);

  // 2. Mark Current movie as not watchlist.
  if (movieId == state.movieDetails.movie.id)
    state.movieDetails.movie.watchlist = false;

  // 3. Save to localStorage.
  persistWatchlist();
};

const init = function () {
  const storage = localStorage.getItem("watchlist");
  if (storage) state.watchlist = JSON.parse(storage);
};
init();
