function PageNotFound(props) {

  return (

    <section className="page-not-found">
      <div className="page-not-found__container">
        <h2 className="page-not-found__title">404</h2>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <button className="page-not-found__button" onClick={props.goBack}>Назад</button>
    </section>
  );
}

export default PageNotFound;