import React, { PureComponent, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
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
  state = {
    dropdownOpen: false,
    activeTab1: "11",
    name: "User",
    token: "",
    data: [],
    length: 0,
    totalLength: 0,
    totalData: [],
    femalePercentage: 0,
    malePercentage: 0,
    femaleLength: 0,
    maleLength: 0,
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

  async componentWillMount() {
    const token = await sessionStorage.getItem("token");
    const totData = await fetch("http://localhost:8000/user/view", {
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

    this.setState({
      name: user.name
    });
  }

  async componentDidMount() {
    // try {
    const token = await sessionStorage.getItem("token");
    this.setState({ token });
    const month = moment()
      .startOf("month")
      .toISOString();
    const today = moment().toISOString();

    const sixMonths = await this.getAgeRange(6);
    const twelveMonths = await this.getAgeRange(12);
    const twentyFourMonths = await this.getAgeRange(24);
    const sixMonthsFemaleData = sixMonths.filter(
      data => data.gender == "Female"
    );

    const sixMonthsFemale = sixMonthsFemaleData.length;

    const twelveMonthsFemaleData = twelveMonths.filter(
      data => data.gender == "Female"
    );
    const twelveMonthsFemale = twelveMonthsFemaleData.length;

    const twentyFourMonthsFemaleData = twentyFourMonths.filter(
      data => data.gender == "Female"
    );
    const twentyFourMonthsFemale = twentyFourMonthsFemaleData.length;

    const twentyFourMonthsData = twentyFourMonths.length;
    const twelveMonthsData = twelveMonths.length;
    const sixMonthsData = sixMonths.length;

    const twentyFourMonthsMale = twentyFourMonthsData - twentyFourMonthsFemale;
    const twelveMonthsMale = twelveMonthsData - twelveMonthsFemale;
    const sixMonthsMale = sixMonthsData - sixMonthsFemale;

    await this.setState({
      sixMonthsFemale,
      twelveMonthsFemale,
      twentyFourMonthsFemale,
      sixMonthsMale,
      twelveMonthsMale,
      twentyFourMonthsMale
    });

    const { data } = await this.checkRegistrations(month, today);

    const totData = await fetch(`http://localhost:8000/info/total`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`
      }
    });

    const length = await totData.json();
    const totalLength = length.data.count;
    const totalData = length.data.rows;

    await this.setState({
      data: data.rows,
      length: data.count,
      totalLength,
      totalData
    });
    const { femalePercentage, malePercentage } = await this.genderPercentage();

    await this.getbarChartInfo();
    await this.setState({
      femalePercentage,
      malePercentage
    });

    // } catch (error) {
    //   console.log(error)
    // }
  }
  async assignMonth(male, female, state) {
    try {
      switch (state) {
        case "sixMonths":
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getData(monthStart, monthEnd, month) {
    const res = await fetch(
      `http://localhost:8000/info/list?dateFrom=${monthStart}&dateTo=${monthEnd}`,
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

    if (this.state.totalData.length <= 1) {
      if (this.state.totalData[0].gender == "Female") {
        femalePercentage = 100;
        malePercentage = 0;
        this.setState({
          femaleLength: 1
        });
      }
      femalePercentage = 0;
      malePercentage = 100;
      this.setState({
        maleLength: 1
      });
    } else {
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
    }
    return { femalePercentage, malePercentage };
  }

  async checkRegistrations(dateFrom, dateTo, currentPage, perPage) {
    perPage = perPage || 50;
    currentPage = currentPage - 1 || 0;
    const res = await fetch(
      `http://localhost:8000/info/list?dateFrom=${dateFrom}&dateTo=${dateTo}&currentPage=${currentPage}&perPage=${perPage}`,
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
  async getAgeRange(period) {
    let monthStart = moment()
      .startOf("month")
      .subtract(period, "months")
      .toISOString();

    let end = moment().toISOString();

    const res = await fetch(
      `http://localhost:8000/info/date?dateFrom=${monthStart}&dateTo=${end}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.token}`
        }
      }
    );
    const response = await res.json();
    return response.data;
  }

  /**--------------------------------------------------------------------------------------------------------------------- */
  async getbarChartInfo() {
    let femaleLength, maleLength;
    let monthStart = moment()
      .startOf("month")
      .toISOString();

    let monthEnd = moment()
      .endOf("month")
      .toISOString();

    let month = moment().format("MMM");
    const males = [];

    for (let i = 5; i > -1; i--) {
      monthStart = moment()
        .startOf("month")
        .subtract(i, "month")
        .toISOString();

      monthEnd = moment()
        .endOf("month")
        .subtract(i, "month")
        .toISOString();

      month = moment()
        .subtract(i, "month")
        .format("MMM");

      const { data } = await this.getData(monthStart, monthEnd, month);
      if (data) {
        if (data.rows) {
          const females = data.rows.filter(datum => datum.gender == "Female");
          femaleLength = females.length;
          maleLength = data.rows.length - femaleLength;

          chartData.push({
            name: month,
            Females: femaleLength,
            Males: maleLength
          });

          this.setState({ barChart: chartData });
          return males.push({ X: month, y: maleLength });
        }
      }
    }
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
            <PageTitle
              heading={"Hello " + this.state.name + "! Welcome to Remind Me"}
              subheading=""
              icon="lnr-cog icon-gradient bg-mean-fruit"
            />
            <Row>
              <Col md="12" lg="6">
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
                      <Col md="6">
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
                                  Registrations this month
                                </div>
                              </div>
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
                                  {this.kFormatter(this.state.totalLength)}
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Total Registrations
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="divider mt-4" />
                    <Row className="mt-3">
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
                    </Row>
                  </CardBody>
                </Card>
                <Row>
                  <Col lg="12" md="12">
                    <div className="card mb-3 widget-chart">
                      <div className="widget-chart-content">
                        <div className="icon-wrapper rounded-circle">
                          <div
                            className="icon-wrapper-bg bg-warning"
                            style={{ marginLeft: "0%", marginBottom: "5%" }}
                          />
                          <i className="lnr-chart-bars text-warning" />
                        </div>
                      </div>
                      <div className="widget-chart-wrapper chart-wrapper-relative">
                        <ResponsiveContainer height={300}>
                          <BarChart
                            width={500}
                            height={300}
                            data={this.state.barChart}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              width={100}
                              dataKey="Females"
                              stackId="a"
                              fill="#8884d8"
                            />
                            <Bar dataKey="Males" stackId="a" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md="6" lg="6">
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
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                  <div className="widget-numbers">Males</div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1"> </span>
                  </div>
                </div>
              </Col>

              <Col md="3">
                <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                  <div className="widget-numbers">
                    {this.state.sixMonthsMale}
                  </div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1">{`< six months old`}</span>
                  </div>
                </div>
              </Col>

              <Col md="3">
                <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                  <div className="widget-numbers">
                    {this.state.twelveMonthsMale}
                  </div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1">{`< twelve months old`}</span>
                  </div>
                </div>
              </Col>

              <Col md="3">
                <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                  <div className="widget-numbers">
                    {this.state.twentyFourMonthsMale}
                  </div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1">{`< twenty four months old`}</span>
                  </div>
                </div>
              </Col>

              <Col md="3">
                <div className="card mb-3 bg-love-kiss widget-chart text-white card-border">
                  <div className="widget-numbers">Females</div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1"> </span>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card mb-3 bg-love-kiss widget-chart text-white card-border">
                  <div className="widget-numbers">
                    {this.state.sixMonthsFemale}
                  </div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1">{`< six months old`}</span>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card mb-3 bg-love-kiss widget-chart text-white card-border">
                  <div className="widget-numbers">
                    {this.state.twelveMonthsFemale}
                  </div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1">{`< twenty four months old`}</span>
                  </div>
                </div>
              </Col>

              <Col md="3">
                <div className="card mb-3 bg-love-kiss widget-chart text-white card-border">
                  <div className="widget-numbers">
                    {this.state.twentyFourMonthsFemale}
                  </div>
                  <div className="widget-subheading"> </div>
                  <div className="widget-description text-white">
                    <span className="pl-1">{`< twenty four months old`}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
