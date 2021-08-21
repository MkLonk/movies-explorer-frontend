import { webAppLink, webStaticLink, webAdaptiveLink } from '../../utils/constans'

function Portfolio() {
  return (

    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>

      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a className="portfolio__link-text" target="_blank" rel="noreferrer" href={webStaticLink}>Статичный сайт</a>
          <a className="portfolio__link-text" target="_blank" rel="noreferrer" href={webStaticLink}>&#8599;</a>
        </li>

        <li className="portfolio__link">
          <a className="portfolio__link-text" target="_blank" rel="noreferrer" href={webAdaptiveLink}>Адаптивный сайт</a>
          <a className="portfolio__link-text" target="_blank" rel="noreferrer" href={webAdaptiveLink}>&#8599;</a>
        </li>

        <li className="portfolio__link">
          <a className="portfolio__link-text" target="_blank" rel="noreferrer" href={webAppLink}>Одностраничное приложение</a>
          <a className="portfolio__link-text" target="_blank" rel="noreferrer" href={webAppLink}>&#8599;</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;