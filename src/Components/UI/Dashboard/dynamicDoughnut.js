import React, { Component } from "react";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";

export default class Pie extends Component {
  state = {
    token: "",
    data: [],
    length: 0,
    totalLength: 0,
    totalData: [],
    femalePercentage: 0,
    malePercentage: 0,
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#428bca", "#d9534f"],
        hoverBackgroundColor: ["#7097e1", "#4dd6a7"]
      }
    ],
    labels: ["Males", "Females"]
  };

  //   async componentWillMount() {
  //     const { femalePercentage, malePercentage } = await this.genderPercentage();

  //     await this.setState({
  //       femalePercentage,
  //       malePercentage
  //     });
  //   }
  async genderPercentage() {
    const total = this.state.totalLength;
    let malePercentage, femalePercentage;

    if (this.state.totalData.length <= 1) {
      if (this.state.totalData[0].gender == "Female") {
        femalePercentage = 100;
        malePercentage = 0;
      }
      femalePercentage = 0;
      malePercentage = 100;
    } else {
      const females = this.state.totalData.filter(data => {
        return data.gender == "Female";
      });
      const femaleLength = females.length;

      femalePercentage = (femaleLength / total) * 100;
      malePercentage = 100 - femalePercentage;
    }
    return { femalePercentage, malePercentage };
  }

  async componentDidMount() {
    // try {
    const token = await sessionStorage.getItem("token");
    this.setState({ token });
    const month = moment()
      .startOf("month")
      .toISOString();
    const today = moment().toISOString();

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
      totalLength,
      totalData
    });
    const { femalePercentage, malePercentage } = await this.genderPercentage();

    await this.setState({
      datasets: [
        {
          data: [malePercentage, femalePercentage]
        }
      ]
    });

    // } catch (error) {
    //   console.log(error)
    // }
  }
  render() {
    return (
      <div style={{ marginLeft: "10%", marginBottom: "5%", marginTop: "-15%" }}>
        <Doughnut data={this.state} />
      </div>
    );
  }
}
