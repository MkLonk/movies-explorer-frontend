import CardsList from "../CardsList/CardsList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm
        onSubmitSearch={props.onSubmitSearch}
        isVisiblePreloader={props.isVisiblePreloader}
        isVisibleTooltip={props.isVisibleTooltip}
        messageTooltip={props.messageTooltip}
      />

      <CardsList
        movieList={props.movieList}
        /* pageWidth={props.pageWidth} */
      />
    </div>
  )
}

export default Movies;