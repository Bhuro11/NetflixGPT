import { IMG_CDN_URL } from "../utils/constants"

function MovieCard({posterPath}) {
  return (
    <div className="w-48 pr-4 py-4">
        <img src={IMG_CDN_URL + posterPath} className="hover:scale-110 duration-200 transition-all" alt="Movie Card" />
    </div>
  )
}

export default MovieCard