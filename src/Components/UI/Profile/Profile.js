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
    language: "",
    phonenumber: "",
    username: "",
    name: "",
    password: "",
    oldPassword: "",
    disableState: true,
    passwordRequired: false
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
      username: user.username
    });
  }

  onChangeHandler = e => {
    e.preventDefault();
    if ([e.target.name] == "password" && e.target.value !== "") {
      this.setState({
        passwordRequired: true,
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        passwordRequired: false
      });
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
          <Card className="main-card mb-3 new">
            <CardBody>
              <CardTitle style={{ textAlign: "left" }}>Edit Profile</CardTitle>
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

                {!this.state.loading ? (
                  <Row form>
                    <Col md={6}></Col>
                    <Col md={4}>
                      <Button
                        color="success"
                        className="mt-2"
                        onClick={this.loginHandler}
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
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default connect(
  null,
  { setUser }
)(Add);
