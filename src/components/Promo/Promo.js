import { Link } from "react-scroll";

function Promo() {

  return (

    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <nav className="promo__links">
        <Link className="promo__link" smooth={true} to="project">О проекте</Link>
        <Link className="promo__link" smooth={true} to="techs">Технологии</Link>
        <Link className="promo__link" smooth={true} to="about">Студент</Link>
      </nav>
    </section>
  )
}

export default Promo;