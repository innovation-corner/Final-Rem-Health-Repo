import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PrintThisComponent from "../../Print";

import PageTitle from "../../../Layout/AppMain/PageTitle";
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

class QrCode extends Component {
  state = {
    num: 0,
    randomCode: [],
    loading: false,
    disablePrint: true
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
      return this.props.history.push("/home");
    }
  }

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const generateCode = (length, chars) => {
      if (!chars) {
        chars = "0123456789abcdefghijklmnopqrstuvwxyz";
      }
      let result = "";
      for (let i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
    };

    const qrCode = [];
    const num = this.state.num;
    let image;
    for (let i = 0; i < num; i++) {
      const randomCode = generateCode(21);

      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomCode}&margin=2`,
        {
          method: "POST"
        }
      );

      const images = await res.blob();

      // Then create a local URL for that image and print it
      // image = URL.createObjectURL(images);
      // var reader = images.toDataUrl();
      // console.log(reader)
      // console.log(images);
      // reader.readAsDataURL(image);
      // reader.onloadend = function() {
      //   var base64data = reader.result;
      //   console.log(base64data.substr(base64data.indexOf(",") + 1));

      //   qrCode.push(base64data);
      // };
      // console.log(qrCode);

      image = await URL.createObjectURL(images);
      // console.log(reader);

      // const convertURIToImageData = async URI => {
      //   return new Promise(function(resolve, reject) {
      //     console.log(URI);
      //     if (URI == null) return reject();
      //     var canvas = document.createElement("canvas"),
      //       context = canvas.getContext("2d"),
      //       image = new Image();
      //     image.addEventListener(
      //       "load",
      //       function() {
      //         canvas.width = image.width;
      //         canvas.height = image.height;
      //         context.drawImage(image, 0, 0, canvas.width, canvas.height);
      //         resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      //       },
      //       false
      //     );
      //     image.src = URI;
      //   });
      // };

      // var URI = `data:image/x-icon;base64,${images}`;

      // const data = await convertURIToImageData(URI);
      // // Here you can use imageData
      // console.log("hi");
      // console.log(data);

      // console.log(image);
      qrCode.push(image);
    }
    this.setState({
      randomCode: qrCode,
      num: 0,
      loading: false,
      disablePrint: false
    });
    // console.log(image);
  };
  print = e => {
    e.preventDefault();
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
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
            <PageTitle
              heading={"Generate Qr Code"}
              subheading=""
              icon="lnr-cog icon-gradient bg-mean-fruit"
            />
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle style={{ textAlign: "center" }}>
                      Enter Amount of Code to generate
                    </CardTitle>
                    <Form>
                      <Row form>
                        <Col md={2}></Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="num">Quantity</Label>
                            <Input
                              value={this.state.num}
                              required
                              type="number"
                              name="num"
                              id="num"
                              placeholder="Enter qty"
                              onChange={this.onChangeHandler}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {!this.state.loading ? (
                        <Row form>
                          <Col md={2}></Col>
                          <Col md={4}>
                            <Button
                              color="success"
                              className="mt-2"
                              onClick={this.submitHandler}
                            >
                              Generate
                            </Button>
                          </Col>
                          <Col md={4}>
                            <Button
                              color="warning"
                              className="mt-2"
                              onClick={this.print}
                              disabled={this.state.disablePrint}
                            >
                              Print
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        <Row form>
                          <Col md={2}></Col>
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
              </Col>
            </Row>
            <Row>
              <Col md={1}></Col>

              <Col>
                <div id="divcontents">
                  <Row>
                    {this.state.randomCode.map(images => {
                      return (
                        <div
                          key={images}
                          style={{ marginRight: "20px", marginTop: "2vh" }}
                        >
                          <img src={images} /> <br />
                          <small>Powered by Rem Health</small>
                        </div>
                      );
                    })}
                  </Row>
                </div>
                <iframe
                  id="ifmcontentstoprint"
                  className="printing"
                  style={{ height: "0px", width: "0px", position: "absolute" }}
                ></iframe>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default QrCode;
