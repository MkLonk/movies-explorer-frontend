import About from "../About/About";
import Portfolio from "../Portfolio/Portfolio";
import Project from "../Project/Project";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {

  return (

    <div className="main">
      <Promo />
      <Project />
      <Techs />
      <About />
      <Portfolio />
    </div>
  )
}

export default Main;