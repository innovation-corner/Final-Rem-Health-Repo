import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const RemindMe = lazy(() => import("../../Components/UI/Dashboard/"));
const RemindMeData = lazy(() => import("../../Components/UI/Data/"));
const Login = lazy(() => import("../../Components/Login"));
const Add = lazy(() => import("../../Components/UI/Add/"));
const Profile = lazy(() => import("../../Components/UI/Profile/"));
const Data_id = lazy(() => import("../../Components/UI/Data_id/"));
const Generate = lazy(() => import("../../Components/UI/QrCode/"));
const User = lazy(() => import("../../Components/UI/User/"));

const AppMain = () => {
  return (
    <Fragment>
      {/* Components */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route path="/home" component={RemindMe} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route exact path="/data" component={RemindMeData} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route path="/data/:id" name="user" component={Data_id} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route exact path="/new" component={Add} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route path="/login" component={Login} />
      </Suspense>
      
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route path="/qrcode/generate" component={Generate} />
      </Suspense>
      
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route path="/user/new" component={User} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">Please wait ...</h6>
            </div>
          </div>
        }
      >
        <Route path="/profile" component={Profile} />
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;