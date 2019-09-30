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
    dob: "",
    name: "",
    gender: "",
    disableState: true,
    sor: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bayelsa",
      "Bauchi",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Katsina",
      "Kano",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nassarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
      "F.C.T"
    ]
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

    const response = await fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const { user } = await response.json();
    if (user.role === "superAdmin" || user.role === "nationalAdmin") {
      this.setState({ disableState: false });
    }
    this.setState({
      soo: user.state
    });
  }

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
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
              <CardTitle style={{ textAlign: "center" }}>
                Add New Data
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
                        placeholder="Enter full name"
                        onChange={this.onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="dob">D.O.B</Label>
                      <Input
                        value={this.state.dob}
                        type="date"
                        required
                        name="dob"
                        id="dob"
                        max={this.max}
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
                        type="select"
                        name="soo"
                        id="state"
                        onChange={this.onChangeHandler}
                        disabled={this.state.disableState}
                      >
                        <option defaultValue>--State--</option>
                        {this.state.sor.map(sors => {
                          return (
                            <option key={sors} value={sors}>
                              {sors}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="phonenumber">Phonenumber</Label>
                      <Input
                        value={this.state.phonenumber}
                        type="text"
                        name="phonenumber"
                        id="phonenumber"
                        required
                        placeholder="Phone Number"
                        onChange={this.onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={2}></Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="gender">Gender</Label>
                      <Input
                        value={this.state.gender}
                        type="select"
                        name="gender"
                        id="gender"
                        onChange={this.onChangeHandler}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="language">Language</Label>
                      <Input
                        value={this.state.language}
                        type="select"
                        name="language"
                        id="language"
                        placeholder="language"
                        onChange={this.onChangeHandler}
                      >
                        <option>English</option>
                        <option>Pidgin</option>
                        <option>Igbo</option>
                        <option>Yoruba</option>
                        <option>Hausa</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={3}></Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        value={this.state.email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="yourmail@host.com"
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
