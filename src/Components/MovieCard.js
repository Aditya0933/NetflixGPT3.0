import { IMG_CDN_POSTER } from "../Utils/constant";

const MovieCard = ({ posterPath }) => {
  const imageUrl = IMG_CDN_POSTER + posterPath;
  console.log("Inside Movie Card ...");
  console.log(imageUrl)
  if (!imageUrl) return <div>No image available</div>; // Fallback if no posterPath

  return (
    <div className="w-[100px] sm:w-[150px] md:w-[200px] h-full mr-3 md:mr-6 hover:scale-110 duration-300">
      <img
        alt="Movie Poster"
        src={imageUrl}
        style={{ width: '100%', height: 'auto' }} // Ensure proper scaling
      />
    </div>
  );
};

export default MovieCard;
