import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

// import MainNav from "./NavItems";

const MainNav = [
  {
    icon: "pe-7s-way",
    label: "Dashboard",
    to: "/home"
  },
  {
    icon: "pe-7s-graph2",
    label: "Child Data",
    to: "/data"
  },
  {
    icon: "pe-7s-mail",
    label: "SMS",
    to: "/sms"
  },
  {
    icon: "pe-7s-disk",
    label: "QR Code",
    to: "/qrCode/generate"
  },
  {
    icon: "pe-7s-network",
    label: "HMOs",
    to: "/hmo"
  },
  {
    icon: "pe-7s-culture",
    label: "Hospitals",
    to: "/hospital"
  },
  {
    icon: "pe-7s-signal",
    label: "Diseases",
    to: "/reported-diseases"
  },
  {
    icon: "pe-7s-helm",
    label: "Vaccines",
    to: "/vaccines"
  },
  {
    icon: "pe-7s-users",
    label: "Add User",
    to: "/user/new"
  }
];

// const Nav = MainNav.nav()
class Nav extends Component {
  state = {};

  

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu
          content={MainNav}
          activeLinkFromLocation
          className="vertical-nav-menu menu-color"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
