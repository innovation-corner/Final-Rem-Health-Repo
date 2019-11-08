import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import Dashboard from "./Data";

// Layout

import AppHeader from "../../../Layout/AppHeader";
import AppSidebar from "../../../Layout/AppSidebar";
import AppFooter from "../../../Layout/AppFooter";

const Data = props => {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Dashboard {...props} history={props.history} />
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};
export default Data;
