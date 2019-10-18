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

class User extends React.Component {
  state = {
    loading: false,
    soo: "",
    email: "",
    language: "",
    phonenumber: "",
    username: "",
    address: "",
    name: "",
    hmo: "",
    role: "",
    password: "",
    error: "",
    oldPassword: "",
    disableState: true,
    passwordRequired: false,
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

    const { user } = await totData.json();

    if (user.role !== "superAdmin") {
      alert("please contact remhealth to add a new user");
      return this.props.history.push("/home");
    }
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

  errorToast = () =>
    (this.toastId = toast(this.state.error, {
      transition: Bounce,
      autoClose: 5000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  successToast = () =>
    (this.toastId = toast(this.state.success, {
      transition: Bounce,
      autoClose: 5000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  submitHandler = async e => {
    e.preventDefault();
    try {
      const token = await sessionStorage.getItem("token");
      if (
        this.state.role !== "nationalAdmin" &&
        (this.state.soo == "--State--" || this.state.soo == "") &&
        (this.state.role !== "superAdmin" &&
          (this.state.soo == "--State--" || this.state.soo == "")) &&
        (this.state.role !== "HMO" &&
          (this.state.soo == "--State--" || this.state.soo == ""))
      ) {
        this.setState({ error: "Please select state" }, this.errorToast);
        return;
      }
      if (
        this.state.username == "" ||
        this.state.email == "" ||
        this.state.name == ""
      ) {
        this.setState(
          { error: "Please fill all input fields" },
          this.errorToast
        );
        return;
      }
      if (
        this.state.role == "HMO" &&
        (this.state.hmo == "" || this.state.address == "")
      ) {
        this.setState(
          { error: "Please fill in HMO name and Address" },
          this.errorToast
        );
        return;
      }
      this.setState({ loading: true });

      let url;
      let data = {
        password: this.state.password,
        state: this.state.soo,
        email: this.state.email,
        role: this.state.role,
        username: this.state.username,
        address: this.state.address,
        name: this.state.name,
        contactName: this.state.hmo,
        phonenumber: this.state.phonenumber
      };
      this.state.role == "HMO"
        ? (url = "https://api.remhealth.co/hmo/register")
        : "https://api.remhealth.co/auth/register";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      this.setState({ loading: false });
      const response = await res.json();
      if (!res.ok) {
        console.log(this.state.role, this.state.soo);

        return this.setState({ error: response.message }, this.errorToast);
      }
      console.log(response)
      return this.setState({ error: response.message }, this.successToast);
    } catch (e) {
      console.log(e);
    }
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
          <Card className="main-card mb-3 new">
            <CardBody>
              <CardTitle style={{ textAlign: "left" }}>Add User</CardTitle>
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
                        type="select"
                        name="soo"
                        id="state"
                        onChange={this.onChangeHandler}
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
                  <Col md={4}>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        value={this.state.username}
                        type="text"
                        name="username"
                        id="username"
                        required
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
                      <Label for="role">Role</Label>
                      <Input
                        value={this.state.role}
                        type="select"
                        name="role"
                        id="role"
                        onChange={this.onChangeHandler}
                      >
                        <option defaultValue>user</option>
                        <option defaultValue>HMO</option>
                        <option>stateAdmin</option>
                        <option>nationalAdmin</option>
                        <option>superAdmin</option>
                      </Input>
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
                {this.state.role == "HMO" ? (
                  <Row form>
                    <Col md={2}></Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="password">HMO</Label>
                        <Input
                          value={this.state.hmo}
                          type="text"
                          name="hmo"
                          id="hmo"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                          value={this.state.address}
                          type="text-area"
                          name="address"
                          id="address"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                ) : null}
                <Row form>
                  <Col md={2}></Col>
                  {this.state.role == "HMO" ? (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="phonenumber">Phonenumber</Label>
                        <Input
                          value={this.state.phonenumber}
                          type="text"
                          name="phonenumber"
                          id="phonenumber"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  ) : null}
                </Row>

                {!this.state.loading ? (
                  <Row form>
                    <Col md={5}></Col>
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
                    <Col md={5}></Col>
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
)(User);
