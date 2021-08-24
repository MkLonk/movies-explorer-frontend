import React, { useState, useEffect } from 'react';

import { cardWindowSettings } from "../../utils/utils";


import Card from "../Card/Card";

function CardsList(props) {
  const showOnlyLikes = props.showOnlyLikes

  const [isVisibleMoreBtn, setIsVisibleMoreBtn] = useState(false); // 
  const [counter, setCounter] = useState(90); // 
  const initLimit = 12;
  const initLoadMore = 3;


  /* */
  const [pageWidth, setPageWidth] = useState(document.documentElement.scrollWidth);

/*   useEffect(() => {
    if (pageWidth > 918) {
      console.log('сет 1');
      setCounter(cardWindowSettings.large.initLimit)
    } else if (pageWidth > 636) {
      console.log('сет 2');
    } else {
      console.log('сет 3');
    }
  }, [pageWidth]) */

  window.addEventListener(`resize`, event => {
    setPageWidth(document.documentElement.scrollWidth);
  }, false)

  /* */

  function addMovies() {
    setCounter(counter + 3);
  };


  useEffect(() => {
    props.movieList.length >= counter ? setIsVisibleMoreBtn(true) : setIsVisibleMoreBtn(false);
  }, [counter, props.movieList.length])

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

    < section className="card-list" >

      <ul className="card-list__grid">
        {/* {showOnlyLikes ? renderOnlyLikedCards(props.movieList) : renderAllCards(props.movieList)} */}
        {/* {props.movieList.map((card) => <Card key={card.id} card={card} />)} */}

        {props.movieList.slice(0, counter).map((movie, index) => <Card key={index} card={movie} />)}

      </ul>
      {/* {renderCard(movieList, 3)} */}
      {/* {showOnlyLikes ? '' : <button className="card-list__load-more" />} */}

      {isVisibleMoreBtn ? <button className="card-list__load-more" onClick={addMovies} /> : null}

      {/*       <button className={`card-list__load-more ${isVisibleMoreBtn ? '' : 'card-list__load-more_hidden'}`} onClick={addMovies} />
 */}
      {/* {props.movieList.slice(0, counter).map((movie, index) => {
        console.log(`movie=${movie.nameRU}, index=${index}`)
      })} */}


    </section >
  )
}

export default CardsList;