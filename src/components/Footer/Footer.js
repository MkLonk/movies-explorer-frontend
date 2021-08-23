import { Route, Switch } from "react-router-dom";
import { praktikumLink, githubLink, facebookLink } from '../../utils/constans'

function Footer() {

  return (
    <Switch>
      <Route exact path="(/|/movies|/saved-movies)">
        <footer className="footer">
          <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>

          <div className="footer__columns">

            <p className="footer__author">&copy; 2021. Михаил Михайлов</p>

            <div className="footer__column">
              <a className="footer__link" target="_blank" rel="noreferrer" href={praktikumLink}>Яндекс.Практикум</a>
              <a className="footer__link" target="_blank" rel="noreferrer" href={githubLink}>Github</a>
              <a className="footer__link" target="_blank" rel="noreferrer" href={facebookLink}>Facebook</a>
            </div>

          </div>
        </footer>
      </Route>
    </Switch>
  )
}

export default Footer;