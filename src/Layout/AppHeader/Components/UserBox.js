import React, { Fragment } from "react";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faCalendarAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import maleAvatar from "../../../assets/utils/images/avatars/avatar_1.png";
import femaleAvatar from "../../../assets/utils/images/avatars/avatar_2.jpeg";

class UserBox extends React.Component {
  state = {
    active: false,
    name: "",
    region: ""
  };

  async componentDidMount() {
    const token = sessionStorage.getItem("token");

    const response = await fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const { user } = await response.json();

    this.setState(
      {
        name: user.name,
        region: user.state
      },

    );
  }

  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success"
      }
    ));

  render() {
    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    <img
                      width={42}
                      className="rounded-circle"
                      src={femaleAvatar}
                      alt=""
                    />
                    <FontAwesomeIcon
                      className="ml-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <Nav vertical>
                      {/* <NavItem className="nav-item-header">Activity</NavItem>
                      <NavItem>
                        <NavLink href="/profile">
                          Profile
                          {/* <div className="ml-auto badge badge-pill badge-info">
                            8
                          </div> 
                          </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="javascript:void(0);">
                          Recover Password
                        </NavLink>
                      </NavItem> */}
                      <NavItem className="nav-item-header">My Account</NavItem>
                      <NavItem>
                        <NavLink href="/profile">
                          Profile
                          {/* <div className="ml-auto badge badge-success">New</div> */}
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink href="javascript:void(0);"> 
                          Messages
                          <div className="ml-auto badge badge-warning">512</div> 
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="javascript:void(0);">Logs</NavLink>
                      </NavItem>*/}
                      <NavItem>
                        <div
                          onClick={e => {
                            sessionStorage.removeItem("token");
                            this.props.history.push("/login");
                          }}
                        >
                          <NavLink href="/">Logout</NavLink>
                        </div>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">{this.state.name}</div>
                <div className="widget-subheading">
                  {this.state.region ? this.state.region + " state": null}
                </div>
              </div>

              {/* <div className="widget-content-right header-user-info ml-3">
                <Button
                  className="btn-shadow p-1"
                  size="sm"
                  onClick={this.notify2}
                  color="info"
                  id="Tooltip-1"
                >
                  <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt} />
                </Button>
                <UncontrolledTooltip placement="top" target={"Tooltip-1"}>
                  Click for Toastify Notifications!
                </UncontrolledTooltip>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserBox;