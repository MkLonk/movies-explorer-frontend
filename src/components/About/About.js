import { facebookLink, githubLink } from '../../utils/constans'


function About() {
  return (

    <section id="about" className="about">
      <h2 className="about__title">Студент</h2>
      <article className="about__article">
        <div className="about__text-column">
          <h3 className="about__article-title">Михаил</h3>

          <p className="about__article-subtitle">Веб-разработчик, 36 лет</p>

          <p className="about__article-text">Я живу в городе Улан-Удэ, закончил строительный факультет ВСГТУ.
            У меня есть жена и сын. Я работаю инженером-конструктором зданий и сооружений, и я люблю свою работу.
            Кодить начал 15 лет назад, с изучения книги по PHP. Бросил это дело на главе по ООП,
            тема показалась сложной, непонял как и где это можно пременить. Полгода назад наткнулся на курc
            по веб-разработке от Яндекса, прошел бесплатную первую главу, и зацепило, а сейчас уже пишу дипломную
            работу и впереди целый новый мир.</p>

          <div className="about__links">
            <a className="about__link" target="_blank" rel="noreferrer" href={facebookLink}>Facebook</a>
            <a className="about__link" target="_blank" rel="noreferrer" href={githubLink}>Github</a>
          </div>
        </div>

        <div className="about__photo-column" />
      </article>
    </section>
  )
}

export default About;