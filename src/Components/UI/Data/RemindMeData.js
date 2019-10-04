import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import JwPagination from "jw-react-pagination";
import SearchBox from "../../../Layout/AppHeader/Components/SearchBox";

import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  Progress,
  TabContent,
  TabPane
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

const max = moment().format("YYYY-MM-DD");

export default class Data extends Component {
  constructor() {
    super();

    // bind the onChangePage method to this React component
    this.onChangePage = this.onChangePage.bind(this);
  }
  state = {
    dropdownOpen: false,
    activeTab1: "11",
    name: "",
    input: "",
    dateTo: "",
    error: "",
    message: "",
    dateFrom: "",
    gender: "",
    activeSearch: false,
    totalData: [],
    dateRangeType: "Registration",
    ageSearch: "",
    pageOfItems: [],
    searchType: "",
    ageType: "Days",
    ageFromType: "Days",
    ageFrom: "",
    ageToType: "Days",
    ageTo: "",
    vaccine: "BCG",
    searchCriteria: "",
    searchByAge: false,
    searchByGender: false,
    searchByVaccine: false,
    dateRange: false,
    ageRange: false
  };

  noData = () =>
    (this.toastId = toast(this.state.error, {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  retrievedData = () =>
    (this.toastId = toast(this.state.message, {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "success",
      hideProgressBar: true
    }));

  async componentWillMount() {
    const token = await sessionStorage.getItem("token");
    const tdata = await fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const { user } = await tdata.json();
    if (!tdata.ok) {
      return this.props.history.push("/login");
    }

    this.setState({
      name: user.name
    });
  }

  async componentDidMount() {
    const token = await sessionStorage.getItem("token");
    const tdata = await fetch("https://api.remhealth.co/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!tdata.ok) {
      return this.props.history.push("/login");
    }

    const { user } = await tdata.json();

    this.setState({
      name: user.name
    });

    const totData = await fetch(`https://api.remhealth.co/info/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const length = await totData.json();
    const totalData = length.data.rows;

    await this.setState({
      totalData
    });
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  criteriaHandler = () => {
    switch (this.state.searchCriteria) {
      case "Age":
        this.setState({
          searchByAge: true,
          searchByGender: false,
          ageRange: false,
          searchByVaccine: false,
          dateRange: false
        });
        break;

      case "Gender":
        this.setState({
          searchByGender: true,
          ageRange: false,
          searchByAge: false,
          searchByVaccine: false,
          dateRange: false
        });
        break;

      case "Vaccine":
        this.setState({
          searchByVaccine: true,
          ageRange: false,
          searchByAge: false,
          searchByGender: false,
          dateRange: false
        });
        break;

      case "Date Range":
        return this.setState({
          dateRange: true,
          searchByAge: false,
          ageRange: false,
          searchByGender: false,
          searchByVaccine: false
        });

      case "Age Range":
        return this.setState({
          ageRange: true,
          searchByAge: false,
          dateRange: false,
          searchByGender: false,
          searchByVaccine: false
        });

      default:
        return this.setState({
          ageRange: false,
          searchByAge: false,
          dateRange: false,
          searchByGender: false,
          searchByVaccine: false
        });
        break;
    }
  };

  searchHandler = async e => {
    e.preventDefault();
    this.setState({ activeSearch: true });
    if (this.state.input != "") {
      const token = sessionStorage.getItem("token");
      await fetch(
        `https://api.remhealth.co/info/list?search=${this.state.input}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then(res => {
          if (res.status != 200) {
            this.setState(
              { totalData: [], error: "No Data Found" },
              this.noData
            );
            return;
          }
          return res.json();
        })
        .then(res => {
          this.setState(
            { totalData: res.data.rows, message: "Data retrieved" },
            this.retrievedData
          );
        });
      return;
    }
    if (this.state.activeSearch)
      this.setState({ error: "No search criteria" }, this.noData);
  };

  filterHandler = async e => {
    e.preventDefault();
    ("age, age range, date range, vaccine, gender");
    let url;
    const dates =
      this.state.searchCriteria == "Age Range" ||
      (this.state.searchCriteria == "Date Range" &&
        this.state.dateRangeType == "Registration") ||
      this.state.searchCriteria == "Vaccine";

    let dateFrom, dateTo;

    if (dates) {
      url = "https://api.remhealth.co/info/date";
    } else {
      url = "https://api.remhealth.co/info/list";
    }
    if (this.state.searchCriteria == "Age Range") {
      dateFrom = moment()
        .subtract(this.state.ageFrom, this.state.ageFromType)
        .toISOString();
      dateTo = moment()
        .subtract(this.state.ageTo, this.state.ageToType)
        .toISOString();
    } else if (this.state.searchCriteria == "Date Range") {
      dateFrom = this.state.dateFrom;
      dateTo = this.state.dateTo;
    } else if (this.state.searchCriteria == "Vaccine") {
      switch (this.state.vaccine) {
        case "BCG":
        case "HBV 1":
        case "OPV":
          console.log("hello");
          dateFrom = moment()
            .subtract(7, "days")
            .startOf("week")
            .toISOString();
          dateTo = moment()
            .toISOString();
          break;

        case "OPV 1":
        case "PCV 1":
        case "Rotarix 1":
        case "Pentavalent 1":
          dateFrom = moment()
            .subtract(6, "weeks")
            .startOf("week")
            .toISOString();
          dateTo = moment()
            .subtract(6, "weeks")
            .endOf("weeks")
            .toISOString();
          break;

        case "OPV 2":
        case "Rotarix 2":
        case "PCV 2":
        case "Pentavalent 2":
          dateFrom = moment()
            .subtract(10, "weeks")
            .startOf("week")
            .toISOString();
          dateTo = moment()
            .subtract(10, "weeks")
            .endOf("week")
            .toISOString();
          break;

        case "OPV 3":
        case "PCV 3":
        case "IPV":
        case "Pentavalent 3":
          dateFrom = moment()
            .subtract(14, "weeks")
            .startOf("week")
            .toISOString();
          dateTo = moment()
            .subtract(14, "weeks")
            .endOf("week")
            .toISOString();
          break;

        case "Vitamin A1":
          dateFrom = moment()
            .subtract(6, "months")
            .startOf("month")
            .toISOString();
          dateTo = moment()
            .subtract(6, "months")
            .endOf("month")
            .toISOString();
          break;

        case "Measles Vaccine":
        case "Yellow Fever Vaccine":
          dateFrom = moment()
            .subtract(9, "months")
            .startOf("month")
            .toISOString();
          dateTo = moment()
            .subtract(9, "months")
            .endOf("month")
            .toISOString();
          break;

        case "Meningitis Vaccine":
        case "Vitamin A2":
        case "OPV booster":
          dateFrom = moment()
            .subtract(12, "months")
            .toISOString();
          dateTo = moment()
            .endOf("weeks")
            .toISOString();
          break;

        case "Measles 2":
          dateFrom = moment()
            .subtract(18, "months")
            .startOf("month")
            .toISOString();
          dateTo = moment()
            .subtract(12, "months")
            .endOf("month")
            .toISOString();
          break;

        case "Typhoid Vaccine":
          dateFrom = moment()
            .subtract(24, "months")
            .startOf("month")
            .toISOString();
          dateTo = moment()
            .subtract(24, "months")
            .endOf("month")
            .toISOString();
          break;
      }
    } else if (this.state.searchCriteria == "Gender") {
      if (this.state.gender != "") {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${url}?search=${this.state.gender}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const { data } = await res.json();
          this.setState(
            { totalData: data.rows, message: "Data retrieved" },
            this.retrievedData
          );
          return;
        }
        this.setState({ totalData: [], error: "No data found" }, this.noData);
      }
    } else if (this.state.searchCriteria == "Age") {
      console.log("hi");
      dateFrom = moment()
        .subtract(this.state.ageSearch, this.state.ageType)
        .startOf(this.state.ageType)
        .format("YYYY-MM-DD");
      dateTo = moment()
        .subtract(this.state.ageSearch, this.state.ageType)
        .endOf(this.state.ageType)
        .toISOString();
    }

    console.log(this.state.searchCriteria, url);
    const start = moment(dateFrom);
    const end = moment(dateTo);
    if (start.diff(end, "days") > 0) {
      this.setState({ error: "Please check the dates" }, this.noData);
      return;
    }

    if (dateFrom != "" && dateFrom != "") {
      const token = sessionStorage.getItem("token");
      await fetch(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.status != 200) {
            this.setState(
              { totalData: [], error: "No data found" },
              this.noData
            );
            return;
          }
          return res.json();
        })
        .then(res => {
          console.log(res);
          const data = res.data.rows ? res.data.rows : res.data;
          this.setState(
            {
              totalData: data,
              message: "Data retrieved"
            },
            this.retrievedData
          );
        });
      return;
    }
    this.setState({ error: "Please select dates" }, this.noData);
  };

  onChangeHandler = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
    this.criteriaHandler();
  };

  buttonHandler = e => {
    e.preventDefault();
    this.setState({ activeSearch: !this.state.activeSearch });
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
                <Row form>
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
                          <option>Dob</option>
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
                      {/* <Label for="submit"></Label> */}
                      <Button
                        onClick={this.filterHandler}
                        disabled={this.state.searchCriteria == ""}
                        color="warning"
                      >
                        Filter
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Card className="main-card mb-3">
                  <div className="card-header">
                    <div className="app-header-left">
                      <SearchBox
                        input={this.state.input}
                        buttonHandler={this.buttonHandler}
                        searchHandler={this.searchHandler}
                        onChangeHandler={this.onChangeHandler}
                        activeSearch={this.state.activeSearch}
                      />
                    </div>
                    <div className="btn-actions-pane-right">
                      <div role="group" className="btn-group-sm btn-group">
                        <Link to="/new">
                          <button className="mr-2 btn-icon btn-icon-only btn btn-outline-success">
                            <i className="pe-7s-plus btn-icon-wrapper"> </i>
                          </button>
                        </Link>
                        Add New Data
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">Id</th>
                          <th>Name</th>
                          <th className="text-center">DOB</th>
                          <th className="text-center">Phonenumber</th>
                          <th className="text-center">Gender</th>
                          <th className="text-center">Immunization Code</th>
                        </tr>
                      </thead>
                      {this.state.pageOfItems.map(item => {
                        return (
                          <tbody key={item.name}>
                            <tr>
                              <td className="text-center text-muted">
                                #{item.id}
                              </td>
                              <td className="text-center">{item.name}</td>
                              <td className="text-center">
                                {moment(item.dob).format("DD - MM - YYYY")}
                              </td>
                              <td className="text-center">
                                {item.phonenumber}
                              </td>
                              <td className="text-center">{item.gender}</td>
                              <td className="text-center">
                                {item.immunizationCode}
                              </td>
                              <td className="text-center">
                                <Link
                                  to={`/data/${item.id}`}
                                  params={{ id: item.id }}
                                >
                                  view
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                    <JwPagination
                      items={this.state.totalData}
                      onChangePage={this.onChangePage}
                      pageSize={50}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
