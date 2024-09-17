// import { useDispatch, useSelector } from "react-redux";
// import lang from "../Utils/languageConstant";
// import { useRef } from "react";
// import openai from "../Utils/openAI";
// import { API_Options } from "../Utils/constant";
// import { json } from "react-router-dom";
// import {addGptMovieResult} from '../Utils/gptSlice';
// import axios from 'axios';

// const GptSearchBar = () => {
//   const langKey = useSelector((store) => store.config.lang);

//   const SearchTextGPT = useRef(null);

//   const dispatch = useDispatch();


//   // This is the section for fetching the movie from the TMDB 17sep 24- Start ...

//   console.log("Fetching Some Data Start.....")


// const fetchMovies = async (query) => {
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/search/movie`,
//       {
//         params: {
//           api_key: '15e85ddb6b0e7650332a69b2bee58b49',
//           query: query
//         }
//       }
//     );
//     const movies = response.data.results;
//     console.log(movies); // This will return a list of movies matching "horror"
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//   }
// };

// // Example usage
// fetchMovies(SearchTextGPT);

// console.log("Fetching Some Data End.....")

//   // This is the section for fetching the movie from the TMDB End ...


//   //Search Movie in TMDB...
//   const searchMovieTMDB = async (movie) => {
//     const data = await fetch(
//       "https://api.themoviedb.org/3/search/movie?query=" +
//         movie +
//         "&include_adult=false&language=en-US&page=1",
//       API_Options
//     );
//     const json = await data.json();
//     return json.results;
//   };

//   const GPTSearchHandler = async () => {
//     console.log(SearchTextGPT.current.value);
//     // Make a API Call to GPT API and get Movies Result...

//     const QueryGPT =
//       "Act as a Movie Recommendation system and suggest some movies for the Query : " +
//       SearchTextGPT.current.value +
//       ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result:Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

//     const gptResults = await openai.chat.completions.create({
//       messages: [{ role: "user", content: QueryGPT }],
//       model: "gpt-3.5-turbo",
//     });

//     // This Console Shows Searched Movies using OpenAI API but MY API limit has exceed so I hard code the data...as MoviesGPT
//     console.log("GPT Movies Search Result- " + gptResults.choices);
//     const MoviesGPT = gptResults.choices?.[0]?.message?.content.split(",");

//     //This is my Hard Coded Data-
//     // const MoviesGPT = [
//     //   "Andaz Apna Apna",
//     //   "Hera Pheri",
//     //   "Chupke Chupke",
//     //   "Jaane Bhi Do Yaar",
//     //   "Padosan",
//     // ];

//     console.log("Movies GPT Array...Start");
//     const promiseArray = MoviesGPT.map((movie) => searchMovieTMDB(movie));
//     console.log("Movies GPT Array...End");

//     const tmdbResult = await Promise.all(promiseArray);
//     console.log(tmdbResult);

//     dispatch(
//       addGptMovieResult({ movieName: MoviesGPT, movieResult: tmdbResult })
//       // addGptMovieResult(tmdbResult)
//     );
//   };
//   return (
//     <div className="pt-[30%] sm:pt-[10%] flex justify-center  sm:p-4">
//       <form
//         className="w-4/4 sm-w-3/4 md:w-2/3 bg-black grid grid-cols-12"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={SearchTextGPT}
//           type="text"
//           className="p-2 sm:p-4 m-3 text-sm sm:m-4 col-span-10 sm:col-span-9"
//           placeholder={lang[langKey].gptSearchPlaceholder}
//         />
//         <button
//           className="col-span-2 sm:col-span-3 m-1 sm:m-4 p-1 sm:p-2 text-sm bg-red-700 text-white rounded-lg"
//           onClick={GPTSearchHandler}
//         >
//           {lang[langKey].search}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GptSearchBar;


/*Try new 17 sep 24 */
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from 'axios';
import { addGptMovieResult } from '../Utils/gptSlice';

const GptSearchBar = () => {
  // const langKey = useSelector((store) => store.config.lang);
  const SearchTextGPT = useRef(null);
  const dispatch = useDispatch();

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: '15e85ddb6b0e7650332a69b2bee58b49', // Replace with your TMDB API key
            query: query,
            include_adult: true
          }
        }
      );
      console.log("What is this ?" + response);
      const movies = response.data.results;
      console.log("Inside fetch Movies Function ...")
      console.log(movies)
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const GPTSearchHandler = async () => {
    const query = SearchTextGPT.current.value;
    console.log("User Query:", query);

    try {
      const movies = await fetchMovies(query);
      console.log("What is this ? MOVIES");
      console.log(movies);
      movies.map((movie) => console.log(movie.title));

      // Dispatch the results to the Redux store
      dispatch(addGptMovieResult({ movieName: movies.map(movie => movie.title), movieResult: movies }));
    } catch (error) {
      console.error("Error in fetching movies:", error.message);
      // Provide user feedback or handle the error appropriately
    }
  };

  return (
    <div className="pt-[30%] sm:pt-[10%] flex justify-center  sm:p-4">
      <form
        className="w-4/4 sm-w-3/4 md:w-2/3 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={SearchTextGPT}
          type="text"
          className="p-2 sm:p-4 m-3 text-sm sm:m-4 col-span-10 sm:col-span-9"
          placeholder="vghgbv"
        />
        <button
          className="col-span-2 sm:col-span-3 m-1 sm:m-4 p-1 sm:p-2 text-sm bg-red-700 text-white rounded-lg"
          onClick={GPTSearchHandler}
        >
          {/* {lang[langKey].search} */}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;