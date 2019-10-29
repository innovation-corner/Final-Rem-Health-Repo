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
    name: ""
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
    if (!totData.ok) {
      return this.props.history.push("/login");
    }

    const { user } = await totData.json();
    if (
      user.role !== "superAdmin" &&
      user.role !== "nationalAdmin" &&
      user.role !== "stateAdmin"
    ) {
      return this.props.history.push("/home");
    }
  }

  noData = msg =>
    (this.toastId = toast(msg, {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  retrievedData = msg =>
    (this.toastId = toast(msg, {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "success",
      hideProgressBar: true
    }));

  onChangeHandler = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async e => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    this.setState({ loading: true });

    const res = await fetch("https://api.remhealth.co/vaccine/add", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    this.setState({ loading: false });
    const response = await res.json();
    if (!res.ok) {
      this.noData(response.message);
      return;
    }
    this.retrievedData(response.message);
  };
  // max = moment().format("YYYY-MM-DD");
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
                <CardTitle style={{ textAlign: "center" }}>
                  Add Vaccine
                </CardTitle>
                <Form>
                  <Row form>
                    <Col md={2}></Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="name"> Name</Label>
                        <Input
                          value={this.state.name}
                          required
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Vaccine name"
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
                          onClick={this.submitHandler}
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
