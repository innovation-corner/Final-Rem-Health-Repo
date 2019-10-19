import React from "react";

const backdrop = props =>
  props.show ? <div className="baackdrop" onClick={props.clicked}></div> : null;

export default backdrop;
