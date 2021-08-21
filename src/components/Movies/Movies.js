import CardsList from "../CardsList/CardsList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <CardsList />
    </div>
  )
}

export default Movies;