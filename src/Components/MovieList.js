import PropTypes from 'prop-types'; // Import PropTypes
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Default to an empty array if movies is not an array
  console.log("Inside safe movies...");
  console.log(movies);
  const safeMovies = Array.isArray(movies) ? movies : [];
  console.log(safeMovies);

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-4xl px-8 md:px-16 py-3 md:py-6 bg-black text-white">
        {title}
      </h1>
      <div className="overflow-x-scroll scrollbar-hide bg-black">
        <div className="w-fit">
          <div className="flex px-4 md:px-8 py-4">
            {safeMovies.length > 0 ? (
              safeMovies.map((movie) => (
                movie.poster_path ? (
                  <MovieCard key={movie.id} posterPath={movie.poster_path} />
                ) : null
              ))
            ) : (
              <p className="text-white">No movies available</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default MovieList;
