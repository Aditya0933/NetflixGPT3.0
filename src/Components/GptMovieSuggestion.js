import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Footer from "./Footer";
const GptMovieSuggestion = () => {
  const { movieResult, movieName } = useSelector((store) => store.gpt);
  console.log(movieResult + movieName)
  if (!movieName) return null;
  return (
    <div className="m-2 p-2 sm:m-3 sm:p-3 md:m-4 md:p-4">
      <div>
        {movieName.map((movieName,index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResult[index]}
          />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default GptMovieSuggestion;
