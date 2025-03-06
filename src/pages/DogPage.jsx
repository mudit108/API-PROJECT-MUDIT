import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dog } from "lucide-react";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import {
  fetchBreeds,
  fetchBreedImages,
  filterBreeds,
  selectBreed,
  setPage,
} from "../store/slices/dogSlice";

const DogPage = () => {
  const dispatch = useDispatch();
  const {
    breeds,
    filteredBreeds,
    selectedBreed,
    images,
    loading,
    error,
    currentPage,
    imagesPerPage,
    totalPages,
  } = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBreed) {
      dispatch(fetchBreedImages(selectedBreed));
    }
  }, [selectedBreed, dispatch]);

  const handleSearch = (query) => {
    dispatch(filterBreeds(query));
  };

  const handleBreedSelect = (breed) => {
    dispatch(selectBreed(breed));
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10 bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold">Discover Dog Breeds</h1>
        <p className="text-lg">
          Search, browse, and explore images of various dog breeds.
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Search for a breed..."
        className="mb-6 text-yellow-400"
        style="color: black;"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-lg">
          <h2 className="font-semibold text-lg mb-3 flex items-center">
            <Dog className="h-5 w-5 mr-2 text-yellow-400" /> Breeds
          </h2>
          {loading && breeds.length === 0 ? (
            <Loader />
          ) : (
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {filteredBreeds.map((breed) => (
                <li key={breed}>
                  <button
                    onClick={() => handleBreedSelect(breed)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedBreed === breed
                        ? "bg-yellow-400 text-gray-900 font-bold"
                        : "hover:bg-yellow-300 hover:text-gray-900"
                    }`}
                  >
                    {breed.charAt(0).toUpperCase() + breed.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:col-span-3">
          {loading && <Loader />}
          {error && (
            <div className="bg-red-500 text-white px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {selectedBreed && !loading && !error && (
            <>
              <h2 className="text-3xl font-bold text-center mb-6">
                {selectedBreed.toUpperCase()} Images
              </h2>
              {currentImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentImages.map((image, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-20 rounded-lg overflow-hidden shadow-lg"
                    >
                      <img
                        src={image}
                        alt={`${selectedBreed}`}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg">
                  No images found for this breed.
                </p>
              )}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {!loading && !error && !selectedBreed && (
            <div className="text-center py-10">
              <Dog className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-2xl font-semibold">Select a Dog Breed</h3>
              <p className="text-lg">
                Choose a breed from the list to explore images.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DogPage;
