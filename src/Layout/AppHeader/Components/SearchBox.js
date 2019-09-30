import React, { Fragment } from "react";

import cx from "classnames";

class SearchBox extends React.Component {
  render() {
    return (
      <Fragment>
        <div
          className={cx("search-wrapper", {
            active: this.props.activeSearch
          })}
        >
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              name="input"
              value={this.props.input}
              onChange={this.props.onChangeHandler}
            />
            <button onClick={this.props.searchHandler} className="search-icon">
              <span />
            </button>
          </div>
          
          <button onClick={this.props.buttonHandler} className="close" />
        </div>
      </Fragment>
    );
  }
}

export default SearchBox;
