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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-5xl mx-auto text-center mb-6">
        <h1 className="text-4xl font-bold">🎬 Movie Explorer</h1>
        <p className="text-gray-400 mt-2">Find your favorite movies and TV shows with ease.</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-3 text-gray-500" />
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500" 
            placeholder="Search for a movie..." 
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button onClick={handleToggleFilters} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full flex items-center">
          <Filter className="mr-2" /> {filters.showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {filters.showFilters && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-lg mx-auto mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              >
                <option value="all">All</option>
                <option value="movie">Movies</option>
                <option value="series">TV Series</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Year</label>
              <input 
                type="text" 
                name="year" 
                value={filters.year} 
                onChange={handleFilterChange} 
                className="w-full p-2 bg-gray-700 text-white rounded-md" 
                placeholder="e.g., 2023"
              />
            </div>
          </div>
        </div>
      )}

      {loading && <Loader />}

      {error && <div className="text-red-400 text-center">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map(movie => (
            <div key={movie.imdbID} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-72">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
                  alt={movie.Title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full text-center p-2">{movie.Type.toUpperCase()}</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold line-clamp-2">{movie.Title}</h3>
                <p className="text-gray-400 text-sm">{movie.Year}</p>
                <a 
                  href={`https://www.imdb.com/title/${movie.imdbID}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-3 text-red-400 hover:text-red-500 flex items-center"
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
