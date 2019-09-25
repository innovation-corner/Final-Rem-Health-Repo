import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
let token;

const PrivateRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    token = sessionStorage.getItem("token");
  });
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
