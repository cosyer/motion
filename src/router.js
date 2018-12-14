import React, { PropTypes } from "react";
import { Router, Route, IndexRoute, Link, IndexRedirect } from "dva/router";
import IndexPage from "./routes/IndexPage";
import MainView from "./routes/MainView";
import Game from "./routes/Game";
import Manage from "./routes/Manage";
import Upload from "./routes/Upload";
import Download from "./routes/Download";
import Login from "./routes/Login";
import Error from "./routes/error";

import App from "./routes/Cms/app";
import Dashboard from "./routes/Cms/dashboard";
import UserManage from "./routes/Cms/UserManage";
import MenuManage from "./routes/Cms/MenuManage";
import RoleManage from "./routes/Cms/RoleManage";
import Microapp from "./routes/Cms/Microapp";
import WiseDoctor from "./routes/Cms/WiseDoctor";
import Picture from "./routes/Cms/Picture";
import Handsontable from "./routes/Cms/Handsontable";
import Charts from "./routes/Cms/Charts";

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainView}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={IndexPage} />
        <Route path="/game" component={Game} />
        <Route path="/manage" component={Manage} />
        <Route path="/upload" component={Upload} />
        <Route path="/download" component={Download} />
        <Route path="/login" component={Login} />
      </Route>
      <Route path="/cms" component={App}>
        <IndexRedirect to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/user/userManage" component={UserManage} />
        <Route path="/user/menuManage" component={MenuManage} />
        <Route path="/user/roleManage" component={RoleManage} />
        <Route path="/app/microapp" component={Microapp} />
        <Route path="/app/wiseDoctor" component={WiseDoctor} />
        <Route path="/app/picture" component={Picture} />
        <Route path="/app/handsontable" component={Handsontable} />
        <Route path="/navigation/charts" component={Charts} />
      </Route>
    </Router>
  );
}
