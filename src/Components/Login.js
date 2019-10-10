import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { toast, Bounce } from "react-toastify";
import { connect } from "react-redux";
import { setUser } from "../store/actions/";
import image from "../assets/utils/images/rsz_rem_health_logo_colored_sans_bg.png";

class Login extends React.Component {
  state = {
    loading: false,
    username: "",
    password: "",
    error: "",
    loginMessage: ""
  };
  async componentWillMount() {
    const token = await sessionStorage.getItem("token");
    const totData = await fetch(`https://api.remhealth.co/info/total`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (totData.ok) {
      this.props.history.push("/home");
    }
  }

  loginError = () =>
    (this.toastId = toast(this.state.error, {
      transition: Bounce,
      autoClose: 5000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  loginSuccess = () =>
    (this.toastId = toast(this.state.loginMessage, {
      transition: Bounce,
      autoClose: 5000,
      position: "top-right",
      type: "success",
      hideProgressBar: true
    }));

  loginHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });

    fetch("https://api.remhealth.co/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({ loading: false, disabled: false });
        if (!res.ok && res.status !== 401) {
          throw Error(res.message);
        } else if (res.status === 401) {
          res.json().then(res => {
            this.setState({ error: res.message }, this.loginError);
          });
        } else {
          return res.json().then(res => {
            const { responseObj, message } = res;
            sessionStorage.setItem("token", responseObj.token);
            sessionStorage.setItem("role", responseObj.user.role);
            this.props.setUser(responseObj.user);
            this.setState({ loginMessage: message }, this.loginSuccess);
            this.props.history.push("/home");
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ error: err.message }, this.loginError);
      });
  };

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "20vh",
              marginBottom: "-20vh"
            }}
          >
            <img src={image} />
          </div>
          <Card className="main-card mb-3 login">
            <CardBody>
              <Form>
                <Row form>
                  <Col md="4"></Col>
                  <Col md="4">
                    <CardTitle style={{ textAlign: "left", marginTop: "4px" }}>
                      Login
                    </CardTitle>
                    <FormGroup>
                      <Label for="exampleEmail11">Username/Email</Label>
                      <Input
                        value={this.state.username}
                        type="text"
                        name="username"
                        id="exampleEmail11"
                        placeholder="enter username or email"
                        onChange={this.onChangeHandler}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword11">Password</Label>
                      <Input
                        value={this.state.password}
                        type="password"
                        name="password"
                        id="examplePassword11"
                        placeholder="password"
                        onChange={this.onChangeHandler}
                      />
                    </FormGroup>
                    {!this.state.loading ? (
                      <Button
                        color="success"
                        className="mt-2"
                        onClick={this.loginHandler}
                      >
                        Sign in
                      </Button>
                    ) : (
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default connect(
  null,
  { setUser }
)(Login);
