import Card from "../Card/Card";
/* import Preloader from "../Preloader/Preloader"; */
import cardsData from "../../data/beatfilm-movies.json";

function CardsList(props) {

  const showOnlyLikes = props.showOnlyLikes

  function renderAllCards(list) {
    return list.map((card) => <Card key={card.id} card={card} />);
  }

  function renderOnlyLikedCards(list) {
    return list.map((card) => {
      if (card.like) {
        return <Card key={card.id} card={card} />;
      }
      return null;
    });
  }

  return (

    <section className="card-list">

      <ul className="card-list__grid">
        {showOnlyLikes ? renderOnlyLikedCards(cardsData) : renderAllCards(cardsData)}
      </ul>
      {/* <Preloader /> пока нет необходимости в прелоадере */}
      {showOnlyLikes ? '' : <button className="card-list__load-more" />}
    </section>
  )
}

export default CardsList;