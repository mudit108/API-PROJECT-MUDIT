import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, PlayCircle } from 'lucide-react';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { 
  searchMovies, 
  setSearchQuery, 
  setPage, 
  updateFilter, 
  toggleFilters 
} from '../store/slices/movieSlice';

const MoviePage = () => {
  const dispatch = useDispatch();
  const { 
    movies, 
    loading, 
    error, 
    searchQuery, 
    currentPage, 
    totalPages, 
    filters 
  } = useSelector(state => state.movie);
  
  useEffect(() => {
    dispatch(searchMovies({ searchQuery: searchQuery || 'popular', page: currentPage, year: filters.year, type: filters.type }));
  }, [dispatch, searchQuery, currentPage, filters.year, filters.type]);
  
  const handleSearch = (query) => dispatch(setSearchQuery(query));
  const handlePageChange = (pageNumber) => dispatch(setPage(pageNumber));
  const handleFilterChange = (e) => dispatch(updateFilter({ name: e.target.name, value: e.target.value }));
  const handleToggleFilters = () => dispatch(toggleFilters());
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-white shadow-lg">Movie Explorer</h1>
        <p className="text-lg text-gray-200 mt-3">Discover top-rated movies and TV shows effortlessly.</p>
      </div>
      
      <div className="w-full max-w-2xl mb-6 relative">
        <Search className="absolute left-4 top-3 text-gray-400" />
        <input 
          type="text" 
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white/30 backdrop-blur-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-500" 
          placeholder="Search movies..." 
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <button onClick={handleToggleFilters} className="bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full flex items-center text-white mb-6 hover:bg-white/30">
        <Filter className="mr-2" /> {filters.showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {filters.showFilters && (
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-md w-full mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-200 text-sm mb-2">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-3 bg-white/30 text-white rounded-lg"
              >
                <option value="all">All</option>
                <option value="movie">Movies</option>
                <option value="series">TV Series</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-200 text-sm mb-2">Year</label>
              <input 
                type="text" 
                name="year" 
                value={filters.year} 
                onChange={handleFilterChange} 
                className="w-full p-3 bg-white/30 text-white rounded-lg" 
                placeholder="e.g., 2023"
              />
            </div>
          </div>
        </div>
      )}

      {loading && <Loader />}
      {error && <div className="text-red-400 text-center">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {movies.map(movie => (
            <div key={movie.imdbID} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl">
              <div className="relative h-80">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
                  alt={movie.Title} 
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute bottom-0 bg-black/60 text-white w-full text-center p-3 text-sm">{movie.Type.toUpperCase()}</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{movie.Title}</h3>
                <p className="text-gray-300 text-sm">{movie.Year}</p>
                <a 
                  href={`https://www.imdb.com/title/${movie.imdbID}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-3 text-pink-300 hover:text-pink-400 flex items-center"
                >
                  <PlayCircle className="mr-1" /> View on IMDb
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default MoviePage;
