import { Route, Link, Switch } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <Switch>
      <Route exact path="(/|/movies|/saved-movies|/profile)">
        <header className="header">
          <Link className="header__logo" to="./"></Link>
          <Navigation loggedIn={props.loggedIn} />
        </header>
      </Route>
    </Switch>
  )
}

export default Header;