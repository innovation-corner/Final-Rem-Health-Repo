import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import Dashboard from "./RemindMeData";

// Layout

import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar";
import AppFooter from "../../../Layout/AppFooter";

const Data = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}`} component={Dashboard} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Data;
