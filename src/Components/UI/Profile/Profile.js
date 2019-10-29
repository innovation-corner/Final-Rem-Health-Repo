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
import { setUser } from "../../../store/actions";
import moment from "moment";

class Add extends React.Component {
  state = {
    loading: false,
    soo: "",
    email: "",
    username: "",
    name: "",
    file: null,
    password: "",
    oldPassword: "",
    disableState: true,
    passwordRequired: false,
    id: ""
  };
  async componentDidMount() {
    const token = await sessionStorage.getItem("token");
    const totData = await fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const { user } = await totData.json();
    if (!totData.ok) {
      return this.props.history.push("/login");
    }

    if (user.role === "superAdmin" || user.role === "nationalAdmin") {
      this.setState({ disableState: false });
    }
    this.setState({
      soo: user.state,
      name: user.name,
      email: user.email,
      username: user.username,
      id: user.id
    });
  }

  onChangeHandler = e => {
    e.preventDefault();
    if ([e.target.name] == "password" || e.target.value !== "") {
      this.setState({
        passwordRequired: true,
        [e.target.name]: e.target.value
      });
    } else if ([e.target.name] == "file") {
      return this.setState({
        [e.target.name]: e.target.files[0]
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        passwordRequired: false
      });
    }
  };

  errorToast = error =>
    (this.toastId = toast(error, {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  successToast = m =>
    (this.toastId = toast(m, {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "success",
      hideProgressBar: true
    }));

  onSubmitHandler = async e => {
    e.preventDefault();
    const token = await sessionStorage.getItem("token");
    this.setState({ loading: true });
    try {
      if (this.state.file) {
        try {
          const res = await fetch("https://api.remhealth.co/user/avatar", {
            method: "PUT",
            body: JSON.stringify({
              file: this.state.file
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });
          const resj = await res.json();
          console.log(resj);
        } catch (error) {
          this.setState({ loading: false });
          return this.errorToast(error);
        }
      }
      let data = {
        email: this.state.email,
        username: this.state.username,
        gender: this.state.gender,
        name: this.state.name,
        soo: this.state.soo,
        oldPassword: this.state.oldPassword
      };
      if (this.state.password !== "") {
        data.password = this.state.password;
      }
      const res = await fetch(
        `https://api.remhealth.co/user/edit/${this.state.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(data);
      if (!res.ok) {
        const response = await res.json();
        console.log(response);
        throw new Error(response.message);
      }
      this.setState({ loading: false });
      this.successToast("profile updated");
      this.setState({
        password: ""
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.message);
      // error = error.toString()
      return this.errorToast(error.message);
    }
  };

  max = moment().format("YYYY-MM-DD");
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
          <div>
            <i
              className="lnr-arrow-left"
              style={{ cursor: "pointer" }}
              onClick={this.props.history.goBack}
            >
              {" "}
            </i>{" "}
            <br />
            <Card className="main-card mb-3 new">
              <CardBody>
                <CardTitle style={{ textAlign: "left" }}>
                  Edit Profile
                </CardTitle>
                <Form>
                  <Row form>
                    <Col md={2}></Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="name">Full Name</Label>
                        <Input
                          value={this.state.name}
                          required
                          type="text"
                          name="name"
                          id="name"
                          placeholder={this.state.name}
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          value={this.state.email}
                          type="email"
                          required
                          name="email"
                          id="email"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={2}></Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                          value={this.state.soo}
                          type="text"
                          name="soo"
                          id="state"
                          onChange={this.onChangeHandler}
                          disabled={this.state.disableState}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          value={this.state.username}
                          type="text"
                          name="username"
                          id="username"
                          required
                          disabled={this.state.disableState}
                          placeholder={this.state.username}
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={2}></Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="oldPassword">Old Password</Label>
                        <Input
                          value={this.state.oldPassword}
                          type="password"
                          name="oldPassword"
                          id="oldPassword"
                          required={this.state.passwordRequired}
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          value={this.state.password}
                          type="password"
                          name="password"
                          id="password"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row form>
                  <Col md={2}></Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="oldPassword">Profile Image</Label>
                      <Input
                        value={this.state.file}
                        type="file"
                        name="file"
                        id="file"
                        onChange={this.onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}

                  {!this.state.loading ? (
                    <Row form>
                      <Col md={6}></Col>
                      <Col md={4}>
                        <Button
                          color="success"
                          className="mt-2"
                          onClick={this.onSubmitHandler}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row form>
                      <Col md={6}></Col>
                      <Col md={4}>
                        <div
                          className="spinner-border text-success"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Form>
              </CardBody>
            </Card>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default connect(
  null,
  { setUser }
)(Add);
