/* HOC ProtectedRoute — этим компонентом защитите роут /, чтобы на него не смогли перейти неавторизованные пользователи */

import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = (props) => {

  return (
    <Switch>
      <Route exact path="(/profile|/saved-movies|/movies|/signin)">
        {props.loggedIn ? props.children : <Redirect to="./signin" />}
      </Route>

      <Route exact path="(/signup)">
        {props.loggedIn ? props.children : <Redirect to="./signup" />}
      </Route>

      <Route exact path="*">
        <PageNotFound goBack={props.goBack} />
      </Route>
    </Switch>
  );
};

export default ProtectedRoute;