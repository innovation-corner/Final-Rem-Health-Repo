import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import JwPagination from "jw-react-pagination";

import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
  Progress,
  TabContent,
  TabPane
} from "reactstrap";

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
    data: [],
    count: 0,
    currentPage: 0,
    totalLength: 0,
    totalData: [],
    pageOfItems: []
  };

  async componentWillMount() {
    const token = await sessionStorage.getItem("token");
    const totData = await fetch("http://localhost:8000/user/view", {
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
    const totData = await fetch(`http://localhost:8000/info/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const length = await totData.json();
    const totalLength = length.data.count;
    const totalData = length.data.rows;

    await this.setState({
      data: totalData.rows,
      count: totalData.count,
      totalLength,
      totalData
    });
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
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
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  {/* <DynamicPagination /> */}
                  <div className="card-header">
                    Most Recent Registrations
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
