import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link, matchPath } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import JwPagination from "jw-react-pagination";

import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody
} from "reactstrap";

const max = moment().format("YYYY-MM-DD");

export default class Data extends Component {
  state = {
    data: {},
    loading: false,
    soo: "",
    email: "",
    language: "",
    phonenumber: "",
    dob: "",
    qrCode: "",
    name: "",
    gender: "",
    disableState: true,
    disableInput: true,
    button: "Edit",
    date: "Text",
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
    ],
    id: 0,
    cancel: false
  };

  async componentWillMount() {
    const token = await sessionStorage.getItem("token");
    const totData = await fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    console.log("total data ooo", totData.ok);
    if (!totData.ok) {
      return this.props.history.push("/login");
    }

    const { user } = await totData.json();
    if (user.role === "superAdmin" || user.role === "nationalAdmin") {
      this.setState({ disableState: false });
    }
    this.setState({
      soo: user.state
    });
  }

  async componentDidMount() {
    const token = await sessionStorage.getItem("token");

    console.log(this.props);
    const { id } = this.props.match.params;
    const response = await fetch(`https://api.remhealth.co/info/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const { data } = await response.json();

    const {
      email,
      phonenumber,
      dob,
      name,
      immunizationCode,
      gender,
      state,
      language
    } = data;

    await this.setState({
      email,
      phonenumber,
      dob,
      id,
      name,
      immunizationCode,
      gender,
      language,
      soo: state
    });

    let image;
    let randomCode = data.qrCode;
    if (data.qrCode) {
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomCode}&margin=2`,
        {
          method: "POST"
        }
      );

      const images = await res.blob();

      image = await URL.createObjectURL(images);
    }
    this.setState({ qrCode: image });
  }

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.button == "Edit") {
      return this.setState({
        button: "Save",
        disableInput: false,
        cancel: true
      });
    }
    if (this.state.button == "Save") {
      this.setState({ loading: true });
    }
    fetch(`https://api.remhealth.co/info/edit/${this.state.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: this.state.email,
        phonenumber: this.state.phonenumber,
        dob: this.state.dob,
        gender: this.state.gender,
        name: this.state.name,
        language: this.state.language,
        name: this.state.name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({ loading: false, disableInput: true });
        if (!res.ok && res.status !== 401) {
          throw Error(res.message);
        } else if (res.status === 401) {
          res.json().then(res => {
            this.setState({ error: res.message }, this.loginError);
          });
        } else {
          return res.json().then(res => {
            const { data } = res;

            const {
              email,
              phonenumber,
              dob,
              name,
              immunizationCode,
              gender,
              state,
              id,
              language
            } = data;

            this.setState({
              email,
              phonenumber,
              dob,
              id,
              name,
              immunizationCode,
              gender,
              language,
              soo: state
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ error: err.message }, this.loginError);
      });
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
          <div>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle style={{ textAlign: "center" }}>
                      Registration Info
                    </CardTitle>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Row>
                            <Col md={12}>
                              {this.state.qrCode? this.state.qrCode : 'No Qr Code'}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={8}>
                          <Row form>
                            <Col md={6}>
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
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="dob">D.O.B</Label>
                                <Input
                                  value={moment(this.state.dob).format(
                                    "YYYY-MM-DD"
                                  )}
                                  type="date"
                                  required
                                  name="dob"
                                  id="dob"
                                  max={max}
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="state">State</Label>
                                <Input
                                  value={this.state.soo}
                                  type="select"
                                  name="soo"
                                  id="state"
                                  onChange={this.onChangeHandler}
                                  disabled={
                                    this.state.disableState ||
                                    this.state.disableInput
                                  }
                                >
                                  <option>--State--</option>
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
                            <Col md={6}>
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
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="gender">Gender</Label>
                                <Input
                                  value={this.state.gender}
                                  type="select"
                                  name="gender"
                                  id="gender"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                >
                                  <option>Male</option>
                                  <option>Female</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="language">Language</Label>
                                <Input
                                  value={this.state.language}
                                  type="select"
                                  name="language"
                                  id="language"
                                  placeholder="language"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
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
                            <Col md={6}>
                              <FormGroup>
                                <Label for="immunizationCode">
                                  Immunization Code
                                </Label>
                                <Input
                                  value={this.state.immunizationCode}
                                  type="text"
                                  name="immunizationCode"
                                  id="immunizationCode"
                                  onChange={this.onChangeHandler}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
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
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          {!this.state.loading ? (
                            <Row form>
                              <Col md={6}>
                                <Button
                                  color="success"
                                  className="mt-2"
                                  onClick={this.submitHandler}
                                >
                                  {this.state.button}
                                </Button>
                                {this.state.cancel ? (
                                  // <Col md={4}>
                                  <Button
                                    style={{ marginLeft: "5px" }}
                                    color="warning"
                                    className="mt-2"
                                    onClick={() =>
                                      this.setState({
                                        cancel: false,
                                        button: "Edit",
                                        disableInput: true
                                      })
                                    }
                                  >
                                    Cancel
                                  </Button>
                                ) : // </Col>
                                null}
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
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
