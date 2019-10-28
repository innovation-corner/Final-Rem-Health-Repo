import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
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
    name: "",
    vaccines: []
  };

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
    // this.setState({
    //   soo: user.state
    // });

    const res = await fetch("https://api.remhealth.co/vaccine/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const { vaccines } = await res.json();
    this.setState({
      vaccines
    });
  }

  onChangeHandler = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
  };

  deleteHandler = async (e, id) => {
    console.log(id);
    const token = sessionStorage.getItem("token");
    const res = await fetch(`https://api.remhealth.co/vaccine/remove/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const response = await res.json();
    if (!res.ok) {
      this.noData(response.message);
      return;
    }
    this.retrievedData(response.message);

    const res1 = await fetch("https://api.remhealth.co/vaccine/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const { vaccines } = await res1.json();
    this.setState({
      vaccines
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
                {/* <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="dob">Choose Criteria</Label>
                      <Input
                        value={this.state.searchCriteria}
                        type="select"
                        required
                        name="searchCriteria"
                        id="searchCriteria"
                        max={max}
                        onChange={this.onChangeHandler}
                      >
                        <option defaultValue></option>
                        <option>Age</option>
                        <option>Gender</option>
                        <option>Vaccine</option>
                        <option>Age Range</option>
                        <option>Date Range</option>
                        {this.state.role == "superAdmin" ||
                        this.state.role == "nationalAdmin" ? (
                          <option>State</option>
                        ) : null}
                        {this.state.role == "stateAdmin" ||
                        this.state.role == "user" ? (
                          <option>LGA</option>
                        ) : null}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  {this.state.dateRange ? (
                    <Col md={3}>
                      <FormGroup>
                        <Label for="dateFrom">From</Label>
                        <Input
                          value={this.state.dateFrom}
                          type="date"
                          required
                          name="dateFrom"
                          id="dateFrom"
                          max={max}
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.dateRange ? (
                    <Col md={3}>
                      <FormGroup>
                        <Label for="dateTo">To</Label>
                        <Input
                          value={this.state.dateTo}
                          type="date"
                          required
                          name="dateTo"
                          id="dateTo"
                          max={max}
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.dateRange ? (
                    <Col md={3}>
                      <FormGroup>
                        <Label for="dateRangeType">Type</Label>
                        <Input
                          value={this.state.dateRangeType}
                          type="select"
                          required
                          name="dateRangeType"
                          id="dateRangeType"
                          onChange={this.onChangeHandler}
                        >
                          <option defaultValue>Registration</option>
                          <option>Date Of Birth</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.searchByAge ? (
                    <Col md={3}>
                      <FormGroup>
                        <Label for="ageSearch">Select Age</Label>
                        <Input
                          value={this.state.ageSearch}
                          type="number"
                          required
                          name="ageSearch"
                          id="ageSearch"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.searchByAge ? (
                    <Col md={2}>
                      <FormGroup>
                        <Label for="ageType">Type</Label>
                        <Input
                          value={this.state.ageType}
                          type="select"
                          required
                          name="ageType"
                          id="ageType"
                          onChange={this.onChangeHandler}
                        >
                          <option defaultValue>Days</option>
                          <option>Weeks</option>
                          <option>Months</option>
                          <option>Years</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.ageRange ? (
                    <Col md={3}>
                      <FormGroup>
                        <Label for="ageFrom">From</Label>
                        <Input
                          value={this.state.ageFrom}
                          type="number"
                          required
                          name="ageFrom"
                          id="ageFrom"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.ageRange ? (
                    <Col md={2}>
                      <FormGroup>
                        <Label for="ageFromType">Range Type</Label>
                        <Input
                          value={this.state.ageFromType}
                          type="select"
                          required
                          name="ageFromType"
                          id="ageFromType"
                          onChange={this.onChangeHandler}
                        >
                          <option defaultValue>Days</option>
                          <option>Weeks</option>
                          <option>Months</option>
                          <option>Years</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.ageRange ? (
                    <Col style={{ textAlign: "center" }} md={1}>
                      -
                    </Col>
                  ) : null}
                  {this.state.ageRange ? (
                    <Col md={3}>
                      <FormGroup>
                        <Label for="ageTo">To</Label>
                        <Input
                          value={this.state.ageTo}
                          type="number"
                          required
                          name="ageTo"
                          id="ageTo"
                          onChange={this.onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.ageRange ? (
                    <Col md={2}>
                      <FormGroup>
                        <Label for="ageToType">Range Type</Label>
                        <Input
                          value={this.state.ageToType}
                          type="select"
                          required
                          name="ageToType"
                          id="ageToType"
                          onChange={this.onChangeHandler}
                        >
                          <option defaultValue>Days</option>
                          <option>Weeks</option>
                          <option>Months</option>
                          <option>Years</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.searchByGender ? (
                    <Col md={2}>
                      <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input
                          value={this.state.gender}
                          type="select"
                          required
                          name="gender"
                          id="gender"
                          onChange={this.onChangeHandler}
                        >
                          <option defaultValue>Male</option>
                          <option defaultValue>Female</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.searchByState ? (
                    <Col md={2}>
                      <FormGroup>
                        <Label for="soo">State</Label>
                        <Input
                          value={this.state.soo}
                          type="select"
                          name="soo"
                          id="soo"
                          onChange={this.onChangeHandler}
                          disabled={this.state.disableState}
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
                  ) : null}
                  {this.state.searchByState ? (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="lga">Local Government Area</Label>
                        <Input
                          value={this.state.slga}
                          type="select"
                          name="slga"
                          id="lga"
                          onChange={this.onChangeHandler}
                          disabled={
                            this.state.disableState || this.state.soo == ""
                          }
                        >
                          <option defaultValue>--select lga--</option>
                          {this.state.lga.map(slga => {
                            return (
                              <option key={slga} value={slga}>
                                {slga}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.searchByLga ? (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="slga">Local Government Area</Label>
                        <Input
                          value={this.state.slga}
                          type="select"
                          name="slga"
                          id="lga"
                          onChange={this.onChangeHandler}
                        >
                          <option>--select lga--</option>
                          {this.state.lga.map(slga => {
                            return (
                              <option key={slga} value={slga}>
                                {slga}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {this.state.searchByVaccine ? (
                    <Col md={2}>
                      <FormGroup>
                        <Label for="vaccine">Vaccine</Label>
                        <Input
                          value={this.state.vaccine}
                          type="select"
                          required
                          name="vaccine"
                          id="vaccine"
                          onChange={this.onChangeHandler}
                        >
                          <option defaultValue>BCG</option>
                          <option defaultValue>HBV 1</option>
                          <option defaultValue>OPV</option>
                          <option defaultValue>OPV 1</option>
                          <option defaultValue>PCV 1</option>
                          <option defaultValue>Rotarix 1</option>
                          <option defaultValue>Pentavalent 1</option>
                          <option defaultValue>OPV 2</option>
                          <option defaultValue>Rotarix 2</option>
                          <option defaultValue>PCV 2</option>
                          <option defaultValue>OPV 2</option>
                          <option defaultValue>Pentavalent 2</option>
                          <option defaultValue>OPV 3</option>
                          <option defaultValue>PCV 3</option>
                          <option defaultValue>IPV</option>
                          <option defaultValue>Rotarix 3</option>
                          <option defaultValue>Pentavalent 3</option>
                          <option defaultValue>Vitamin A1</option>
                          <option defaultValue>Measles Vaccine</option>
                          <option defaultValue>Yellow Fever Vaccine</option>
                          <option defaultValue>Meningitis Vaccine</option>
                          <option defaultValue>Vitamin A2</option>
                          <option defaultValue>OPV Booster</option>
                          <option defaultValue>Measles 2 Vaccine</option>
                          <option defaultValue>Typhoid Vaccine</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup> 
                     <Label for="submit"></Label> 
                       <Button
                        onClick={this.filterHandler}
                        disabled={this.state.searchCriteria == ""}
                        color="warning"
                      >
                        Filter
                      </Button>
                    </FormGroup>
                  </Col>
                </Row> */}
                {this.state.vaccines.length < 1 ? (
                  <Card>
                    <div className="card-header">No data</div>
                  </Card>
                ) : (
                  <Card className="main-card mb-3">
                    <div className="card-header">
                      <div className="app-header-left">
                        {/* <SearchBox
                          input={this.state.input}
                          buttonHandler={this.buttonHandler}
                          searchHandler={this.searchHandler}
                          onChangeHandler={this.onChangeHandler}
                          activeSearch={this.state.activeSearch}
                        /> */}
                      </div>
                      <div className="btn-actions-pane-right">
                        <div role="group" className="btn-group-sm btn-group">
                          <Link to="/vaccine/new">
                            <button className="mr-2 btn-icon btn-icon-only btn btn-outline-success">
                              <i className="pe-7s-plus btn-icon-wrapper"> </i>
                            </button>
                          </Link>
                          Add Vaccine
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th className="text-center">Id</th>
                            <th className="text-center">Name</th>
                            {/* <th className="text-center">Phonenumber</th>
                          <th className="text-center">State</th>
                          <th className="text-center">LGA</th>
                          <th className="text-center">Gender</th>
                          <th className="text-center">Immunization Code</th> */}
                          </tr>
                        </thead>
                        {this.state.vaccines.map((item, i) => {
                          return (
                            <tbody key={item.name}>
                              <tr>
                                <td className="text-center text-muted">
                                  #{i + 1}
                                </td>
                                <td className="text-center">{item.name}</td>
                                <td
                                  className="text-center"
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={e => this.deleteHandler(e, item.id)}
                                >
                                  delete
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                      {/* <JwPagination
                        items={this.state.totalData}
                        onChangePage={this.onChangePage}
                        pageSize={50}
                      /> */}
                    </div>
                  </Card>
                )}
              </Col>
            </Row>
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
