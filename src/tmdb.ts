/**
 * TMDB API client for fetching movie data
 */

const TMDB_API_KEY = '57d4de68c216905322fe756607975cfd';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

export interface SearchResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Search for movies by query string
 */
export async function searchMovies(query: string, page: number = 1): Promise<SearchResult> {
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get detailed information about a specific movie
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get popular movies
 */
export async function getPopularMovies(page: number = 1): Promise<SearchResult> {
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get top rated movies
 */
export async function getTopRatedMovies(page: number = 1): Promise<SearchResult> {
  const url = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get now playing movies
 */
export async function getNowPlayingMovies(page: number = 1): Promise<SearchResult> {
  const url = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get upcoming movies
 */
export async function getUpcomingMovies(page: number = 1): Promise<SearchResult> {
  const url = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
