import SearchForm from "../SearchForm/SearchForm";
import CardsList from "../CardsList/CardsList";

function SavedMovies() {
  return (
    <div className="saved-movies" >
      <SearchForm />
      <CardsList showOnlyLikes={true}/>
    </div>
  )
}

export default SavedMovies;