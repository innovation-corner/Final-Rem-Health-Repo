import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Card
} from "reactstrap";

import { toast, Bounce } from "react-toastify";
import { connect } from "react-redux";
import { setUser } from "../../../store/actions";

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
            <i
              className="lnr-arrow-left"
              style={{ cursor: "pointer" }}
              onClick={this.props.history.goBack}
            >
              {" "}
            </i>{" "}
            <br />
            <Row>
              <Col md="12">
                {this.state.vaccines.length < 1 ? (
                  <Card>
                    <div className="card-header">No data</div>
                  </Card>
                ) : (
                  <Card className="main-card mb-3">
                    <div className="card-header">
                      <div className="app-header-left">
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
                                <td className="text-center">
                                  <Link
                                    to={`/vaccine/${item.name}`}
                                    params={{ id: item.name }}
                                  >
                                    details
                                  </Link>
                                </td>
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
