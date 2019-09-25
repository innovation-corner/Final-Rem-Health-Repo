import React, { Component } from "react";

class PrintThisComponent extends Component {
  componentDidMount() {
    console.log("PrintThisComponent mounted!");
  }

  render() {
    return (
      <div>
        <button onClick={() => window.print()}>PRINT</button>

        <p>Click above button opens print preview with these words on page</p>
      </div>
    );
  }
}

export default PrintThisComponent;
