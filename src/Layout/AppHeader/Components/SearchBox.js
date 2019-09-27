import React, { Fragment } from "react";

import cx from "classnames";

class SearchBox extends React.Component {
  state = {
    activeSearch: false,
    input: ""
  };

  searchHandler = e => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div
          className={cx("search-wrapper", {
            active: this.state.activeSearch
          })}
        >
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              value={this.state.input}
              onChange={this.searchHandler}
            />
            <button
              onClick={() =>
                this.setState({ activeSearch: !this.state.activeSearch })
              }
              className="search-icon"
            >
              <span />
            </button>
          </div>
          <button
            onClick={() =>
              this.setState({ activeSearch: !this.state.activeSearch })
            }
            className="close"
          />
        </div>
      </Fragment>
    );
  }
}

export default SearchBox;
