import React, { PureComponent, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import classnames from "classnames";
import moment from "moment";

import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  CartesianGrid
} from "recharts";

import {
  Row,
  Col,
  CardHeader,
  Card,
  CardBody,
  CardTitle,
  Progress,
  TabContent,
  TabPane
} from "reactstrap";
import JwPagination from "jw-react-pagination";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import DynamicDoughnutExample from "./dynamicDoughnut";

import {
  faAngleUp,
  faArrowRight,
  faArrowUp,
  faArrowLeft,
  faAngleDown,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../assets/utils/images/avatars/4.jpg";

// const data = [
//   {
//     label: "somethingA",
//     values: [{ x: "SomethingA", y: 10 }, { x: "SomethingB", y: 4 }]
//   },
//   {
//     label: "somethingB",
//     values: [{ x: "SomethingA", y: 6 }, { x: "SomethingB", y: 8 }]
//   }
// ];

let chartData = [];
export default class MainDashboard extends PureComponent {
  constructor() {
    super();

    // bind the onChangePage method to this React component
    this.onChangePage = this.onChangePage.bind(this);
  }
  state = {
    dropdownOpen: false,
    activeTab1: "11",
    name: "User",
    token: "",
    data: [],
    imunizedArray: [],
    defaultedArray: [],
    length: 0,
    immunized: 0,
    defaulted: 0,
    yet: 0,
    totalLength: 0,
    totalData: [],
    role: "user",
    femalePercentage: 0,
    malePercentage: 0,
    femaleLength: 0,
    maleLength: 0,
    pageOfItems: [],
    barChart: [],
    sixMonthsMale: 0,
    sixMonthsFemale: 0,
    twelveMonthsMale: 0,
    twelveMonthsFemale: 0,
    twentyFourMonthsMale: 0,
    twentyFourMonthsFemale: 0
  };
  // async componentDidUpdate(prevState) {
  //Typical usage, don't forget to compare the props
  //   const token = await sessionStorage.getItem("token");
  //   this.state.token !== prevState.token
  //   this.setState({ token });
  //   this.state.token
  //     ? this.props.history.push("/home")
  //     : this.props.history.push("/login");
  //   if (this.props.userName !== prevProps.userName) {
  //     this.fetchData(this.props.userName);
  //   }
  // }
  kFormatter(num) {
    return Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M"
      : Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.sign(num) * Math.abs(num);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  async componentWillMount() {
    const token = await sessionStorage.getItem("token");
    try {
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

      this.setState({ role: user.role });
    } catch (error) {
      return this.props.history.push("/login");
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const token = sessionStorage.getItem("token");
    this.setState({ token });
    let dateFrom, dateTo, dueDate; //dueDate is just some weird way of comparing dob against today's date
    let url = "https://api.remhealth.co/info/date";
    const { id } = this.props.match.params;

    switch (id) {
      case "BCG":
      case "HBV 1":
      case "OPV":
        dateFrom = moment()
          .subtract(7, "days")
          .startOf("week")
          .toISOString();
        dueDate = moment()
          .subtract(7, "days")
          .toISOString();
        dateTo = moment().toISOString();
        break;

      case "OPV 1":
      case "PCV 1":
      case "Rotarix 1":
      case "Pentavalent 1":
        dateFrom = moment()
          .subtract(6, "weeks")
          .startOf("week")
          .toISOString();
        dueDate = moment()
          .subtract(6, "weeks")
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
        dueDate = moment()
          .subtract(10, "weeks")
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
        dueDate = moment()
          .subtract(14, "weeks")
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
        dueDate = moment()
          .subtract(6, "months")
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
        dueDate = moment()
          .subtract(9, "months")
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
          .startOf("month")
          .toISOString();
        dueDate = moment()
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
        dueDate = moment()
          .subtract(18, "months")
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
        dueDate = moment()
          .subtract(24, "months")
          .toISOString();
        dateTo = moment()
          .subtract(24, "months")
          .endOf("month")
          .toISOString();
        break;
    }

    const res = await fetch(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      // this.setState({ totalData: [], error: "No data found" }, this.noData);
      console.log("shit!!!");
      return;
    }
    const response = await res.json();

    const { data } = response;

    let defaulted = [];
    let immunized = [];
    let yet = [];
    // fetch immunization records to check their status
    const asyncForEach = async (array, cb) => {
      for (let index = 0; index < array.length; index++) {
        await cb(array[index], index, array);
      }
    };
    await asyncForEach(data, async datum => {
      const res = await fetch(
        `https://api.remhealth.co/immunization/child/${datum.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.token}`
          }
        }
      );
      if (res.ok) {
        const { data } = await res.json();
        if (data.length) {
          const record = data.filter(im => im.type == id);
          if (record.length) {
            immunized.push({ datum, record });
          } else {
            if (dueDate > datum.dob) {
              defaulted.push(datum.id);
            } else {
              yet.push("stuff");
            }
          }
        }
      } else {
        if (dueDate > datum.dob) {
          defaulted.push(datum.id);
        } else {
          yet.push("stuff");
        }
      }
    });

    // I coulda just used the length on the render portion, but I'm a bit lazy right now, TODO though
    await this.setState(
      {
        imunizedArray: immunized,
        defaulted: defaulted.length,
        defaultedArray: defaulted,
        immunized: immunized.length,
        yet: yet.length,
        length: data.length,
        totalData: data
      },
      this.setState({})
    );
    console.log(this.state.imunizedArray);
  }
  async getData(monthStart, monthEnd, month) {
    const res = await fetch(
      `https://api.remhealth.co/info/list?dateFrom=${monthStart}&dateTo=${monthEnd}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`
        }
      }
    );
    return res.json();
  }

  async genderPercentage() {
    const total = this.state.totalLength;

    let malePercentage, femalePercentage;

    const females = this.state.totalData.filter(data => {
      return data.gender == "Female";
    });
    const femaleLength = females.length;

    femalePercentage = (femaleLength / total) * 100;
    malePercentage = 100 - femalePercentage;
    this.setState({
      femaleLength,
      maleLength: total - femaleLength
    });
    return { femalePercentage, malePercentage };
  }

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
            <Row>
              <Col md="12" lg="12">
                <Card className="mb-3">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                        {" "}
                      </i>
                      Statistics
                    </div>
                  </CardHeader>
                  <CardBody className="pt-2">
                    <Row className="mt-3">
                      <Col md="3">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  {this.kFormatter(this.state.length)}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Immunizations Due
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  {this.kFormatter(this.state.immunized)}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Immunized
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  {this.kFormatter(this.state.defaulted)}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Defaulted
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  {this.kFormatter(this.state.yet)}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Yet to be immunized
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="divider mt-4" />
                    {/* <Row className="mt-3">
                      <Col md="6">
                        <div className="widget-chart-content">
                          <div
                            className="icon-wrapper rounded-circle"
                            style={{ marginLeft: "0%", marginBottom: "5%" }}
                          >
                            <div className="icon-wrapper-bg bg-info" />
                            <i className="lnr-poop text-info" />
                          </div>
                        </div>
                      </Col>
                      <Col md="6">Total Registrations</Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  {`${parseFloat(
                                    Math.round(
                                      this.state.malePercentage * 100
                                    ) / 100
                                  ).toFixed(2)}%`}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  {this.kFormatter(
                                    Number(this.state.maleLength)
                                  )}{" "}
                                  Males
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <Progress
                                className="progress-bar-sm progress-bar-animated-alt"
                                color="primary"
                                value={`${this.state.malePercentage}`}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  {`${parseFloat(
                                    Math.round(
                                      this.state.femalePercentage * 100
                                    ) / 100
                                  ).toFixed(2)}%`}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  {this.state.femaleLength} Females
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <Progress
                                className="progress-bar-sm progress-bar-animated-alt"
                                color="warning"
                                value={`${this.state.femalePercentage}`}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>*/}
                  </CardBody>
                </Card>
              </Col>
              {/* <Col md="6" lg="6">
                <Row>
                  <Col md="12">
                    <Card className="main-card mb-3">
                      <div
                        className="widget-chart-content"
                        style={{ marginLeft: "3%", marginTop: "5%" }}
                      >
                        <div
                          className="icon-wrapper rounded-circle"
                          style={{ marginLeft: "3%", marginTop: "5%" }}
                        >
                          <div className="icon-wrapper-bg bg-success" />
                          <i className="lnr-pie-chart text-success" />
                        </div>
                      </div>
                      <CardBody style={{ marginLeft: "3%", marginTop: "5%" }}>
                        <DynamicDoughnutExample />
                        <CardTitle>Male/Female Chart DIstribution </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col> */}
            </Row>
            <Card className="main-card mb-3">
              <div className="card-header">
                <div className="app-header-left"></div>
                <div className="btn-actions-pane-right">
                  {/* <div role="group" className="btn-group-sm btn-group">
                    <Link to="/new">
                      <button className="mr-2 btn-icon btn-icon-only btn btn-outline-success">
                        <i className="pe-7s-plus btn-icon-wrapper"> </i>
                      </button>
                    </Link>
                    Add New Data
                  </div> */}
                </div>
              </div>
              <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">Id</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Date Of Birth</th>
                      <th className="text-center">Phonenumber</th>
                      <th className="text-center">State</th>
                      <th className="text-center">LGA</th>
                      <th className="text-center">Gender</th>
                      <th className="text-center">Due Date</th>
                      <th className="text-center">Immunization Date</th>
                    </tr>
                  </thead>
                  {this.state.pageOfItems.map(item => {
                    let color, immunizationDate, dueDate;

                    switch (this.props.match.params.id) {
                      case "BCG":
                      case "HBV 1":
                      case "OPV":
                        dueDate = moment(item.dob).add(7, "days");
                        break;

                      case "OPV 1":
                      case "PCV 1":
                      case "Rotarix 1":
                      case "Pentavalent 1":
                        dueDate = moment(item.dob).add(6, "weeks");
                        break;

                      case "OPV 2":
                      case "Rotarix 2":
                      case "PCV 2":
                      case "Pentavalent 2":
                        dueDate = moment(item.dob).add(10, "weeks");
                        break;

                      case "OPV 3":
                      case "PCV 3":
                      case "IPV":
                      case "Pentavalent 3":
                        dueDate = moment(item.dob).add(14, "weeks");
                        break;

                      case "Vitamin A1":
                      case "Rotarix 3":
                        dueDate = moment(item.dob).add(6, "months");
                        break;

                      case "Measles Vaccine":
                      case "Yellow Fever Vaccine":
                        dueDate = moment(item.dob).add(9, "months");
                        break;

                      case "Meningitis Vaccine":
                      case "Vitamin A2":
                      case "OPV Booster":
                        dueDate = moment(item.dob).add(12, "months");
                        break;

                      case "Measles 2 Vaccine":
                        dueDate = moment(item.dob).add(18, "months");
                        break;

                      case "Typhoid Vaccine":
                        dueDate = moment(item.dob).add(24, "months");
                        break;
                    }
                    this.state.imunizedArray.forEach(im => {
                      if (im.datum.id == item.id) {
                        color = "rgba(0, 255, 0, 0.5)";
                        console.log(im.record[0].createdAt);
                        immunizationDate = moment(
                          im.record[0].createdAt
                        ).format("DD - MM - YYYY");
                      }
                    });
                    this.state.defaultedArray.forEach(im => {
                      if (im == item.id) {
                        color = "rgba(255,0,0, 0.1)";
                      }
                    });
                    return (
                      <tbody key={item.immunizationCode}>
                        <tr style={{ backgroundColor: color }}>
                          <td className="text-center text-muted">#{item.id}</td>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">
                            {moment(item.dob).format("DD - MM - YYYY")}
                          </td>
                          <td className="text-center">{item.phonenumber}</td>
                          <td className="text-center">{item.state}</td>
                          <td className="text-center">{item.lga || "-"}</td>
                          <td className="text-center">{item.gender}</td>
                          <td className="text-center">
                            {moment(dueDate).format("DD - MM - YYYY")}
                          </td>
                          <td className="text-center">{immunizationDate}</td>
                          <td className="text-center">
                            <Link
                              to={`/data/${item.id}`}
                              params={{ id: item.id }}
                            >
                              profile
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
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
