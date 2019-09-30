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
    filterBy: "Dob",
    input: "",
    dateTo: "",
    dateFrom: "",
    activeSearch: false,
    totalData: [],
    pageOfItems: []
  };
  noData = () =>
    (this.toastId = toast("No Data Found", {
      transition: Bounce,
      autoClose: 3000,
      position: "top-right",
      type: "error",
      hideProgressBar: true
    }));

  async componentWillMount() {
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

    this.setState({
      name: user.name
    });
  }

  async componentDidMount() {
    const token = await sessionStorage.getItem("token");

    console.log(this.state.pageOfItems);
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

  searchHandler = e => {
    e.preventDefault();
    this.setState({ activeSearch: true });
    if (this.state.input != "") {
      const token = sessionStorage.getItem("token");
      fetch(`https://api.remhealth.co/info/list?search=${this.state.input}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          console.log(res, "hi");
          if (res.status != 200) {
            this.setState({ totalData: [] }, this.noData);
            return;
          }
          return res.json();
        })
        .then(res => {
          this.setState({ totalData: res.data.rows });
        });
    }
  };

  filterHandler = e => {
    e.preventDefault();
    console.log('hi')
    let url;
    if (this.state.filterBy == "Dob") {
      url = "https://api.remhealth.co/info/date";
    } else {
      url = "https://api.remhealth.co/info/list";
    }
    const start = moment(this.state.dateFrom).toIsoString();
    const end = moment(this.state.dateTo).toIsoString();

    if (start != "" && end ) {
      const token = sessionStorage.getItem("token");
      fetch(`${url}?dateFrom=${this.state.dateFrom}&dateTo=${this.state.dateTo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          console.log(res, "hi");
          if (res.status != 200) {
            this.setState({ totalData: [] }, this.noData);
            return;
          }
          return res.json();
        })
        .then(res => {
          console.log(res)
          this.setState({ totalData: res.data});
        });
    }
  };

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
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
                      {/* <Label for="dob">From</Label> */}
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

                  <Col md={3}>
                    <FormGroup>
                      {/* <Label for="dob">To</Label> */}
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
                  <Col md={3}>
                    <FormGroup>
                      {/* <Label for="dob">To</Label> */}
                      <Input
                        value={this.state.filterBy}
                        type="select"
                        required
                        name="filterBy"
                        id="filterBy"
                        max={max}
                        onChange={this.onChangeHandler}
                      >
                        <option defaultValue>Dob</option>
                        <option>Registration</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      {/* <Label for="submit"></Label> */}
                      <Button
                        onClick={this.filterHandler}
                        color="warning"
                      >{`Filter By ${this.state.filterBy}`}</Button>
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
