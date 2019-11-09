import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import JwPagination from "jw-react-pagination";
import SearchBox from "../../../Layout/AppHeader/Components/SearchBox";
import DynamicInputs from "../DynamicInputs/DynamicInput";

import Map from "../Map/Map";

import { Row, Col, Card, Button, FormGroup, Label, Input } from "reactstrap";

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
    tooltipOpen: false,
    name: "",
    inputs: [
      {
        dateTo: "",
        dateFrom: "",
        gender: "Male",
        dateRangeType: "Registration",
        ageSearch: "",
        ageType: "Days",
        ageFromType: "Days",
        disableState: true,
        ageFrom: "",
        ageToType: "Days",
        ageTo: "",
        vaccine: "BCG",
        searchCriteria: "",
        searchByAge: false,
        searchByGender: false,
        searchByVaccine: false,
        dateRange: false,
        searchByState: false,
        searchByLga: false,
        ageRange: false,
        soo: "Abia",
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
        ],
        slga: "",
        lga: []
      }
    ],
    showMap: false,
    input: "",
    dateTo: "",
    error: "",
    message: "",
    dateFrom: "",
    gender: "Male",
    role: "",
    soo: "Abia",
    activeSearch: false,
    totalData: [],
    dateRangeType: "Registration",
    ageSearch: "",
    pageOfItems: [],
    ageType: "Days",
    ageFromType: "Days",
    ageFrom: "",
    ageToType: "Days",
    ageTo: "",
    vaccine: "BCG",
    searchCriteria: "",
    searchByState: false,
    searchByLga: false,
    searchByAge: false,
    searchByGender: false,
    searchByVaccine: false,
    dateRange: false,
    ageRange: false,
    lga: [],
    zoom: null,
    slga: "",
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
    ],
    locations: []
  };

  filterHandler = async e => {
    e.preventDefault();
    ("age, age range, date range, vaccine, gender");
    let { inputs } = this.state;
    let all = [];

    let dueDate, dateFrom, dateTo;
    const { id } = this.props.match.params;

    switch (id) {
      case "BCG":
      case "HBV 1":
      case "OPV":
        dateFrom = moment()
          .subtract(7, "days")
          .startOf("week")
          .toISOString();
        dateTo = moment().toISOString();
        dueDate = moment()
          .subtract(7, "days")
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
        dueDate = moment()
          .subtract(6, "weeks")
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
        dueDate = moment()
          .subtract(10, "weeks")
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

    const asyncForEach = async (array, cb) => {
      for (let index = 0; index < array.length; index++) {
        await cb(array[index], index, array);
      }
    };

    await asyncForEach(inputs, async query => {
      if (query["searchCriteria form-control"] == "Gender") {
        // just in case there's no selected gender, default is male
        const input = query["gender form-control"] || "Male";
        all.push(
          { name: "gender", type: "equals", value: input },
          { name: "dob", type: "between", value: [dateFrom, dateTo] }
        );
        return;
      }

      if (query["searchCriteria form-control"] == "Date Range") {
        const selectedDateFrom = moment(query["dateFrom form-control"]);
        const selectedDateTo = moment(query["dateTo form-control"]);
        let dateFrom;
        let dateTo;

        const { id } = this.props.match.params;

        switch (id) {
          case "BCG":
          case "HBV 1":
          case "OPV":
            dateFrom = selectedDateFrom
              .subtract(7, "days")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo.toISOString();
            break;

          case "OPV 1":
          case "PCV 1":
          case "Rotarix 1":
          case "Pentavalent 1":
            dateFrom = selectedDateFrom
              .subtract(6, "weeks")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(6, "weeks")
              .endOf("weeks")
              .toISOString();
            break;

          case "OPV 2":
          case "Rotarix 2":
          case "PCV 2":
          case "Pentavalent 2":
            dateFrom = selectedDateFrom
              .subtract(10, "weeks")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(10, "weeks")
              .endOf("week")
              .toISOString();
            break;

          case "OPV 3":
          case "PCV 3":
          case "IPV":
          case "Pentavalent 3":
            dateFrom = selectedDateFrom
              .subtract(14, "weeks")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(14, "weeks")
              .endOf("week")
              .toISOString();
            break;

          case "Vitamin A1":
            dateFrom = selectedDateFrom
              .subtract(6, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(6, "months")
              .endOf("month")
              .toISOString();
            break;

          case "Measles Vaccine":
          case "Yellow Fever Vaccine":
            dateFrom = selectedDateFrom
              .subtract(9, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(9, "months")
              .endOf("month")
              .toISOString();
            break;

          case "Meningitis Vaccine":
          case "Vitamin A2":
          case "OPV booster":
            dateFrom = selectedDateFrom.subtract(12, "months").toISOString();
            dateTo = selectedDateTo.endOf("weeks").toISOString();
            break;

          case "Measles 2":
            dateFrom = selectedDateFrom
              .subtract(18, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(12, "months")
              .endOf("month")
              .toISOString();
            break;

          case "Typhoid Vaccine":
            dateFrom = selectedDateFrom
              .subtract(24, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(24, "months")
              .endOf("month")
              .toISOString();
            break;
        }
        return all.push({
          name: "dob",
          type: "between",
          value: [dateFrom, dateTo]
        });
      }

      if (query["searchCriteria form-control"] == "State") {
        const lga = query["slga form-control"];
        if (lga !== "" && lga !== null && lga) {
          all.push(
            {
              name: "lga",
              type: "equals",
              value: lga
            },
            { name: "dob", type: "between", value: [dateFrom, dateTo] }
          );
        }
        const state = query["soo form-control"];
        return all.push(
          {
            name: "state",
            type: "equals",
            value: state
          },
          { name: "dob", type: "between", value: [dateFrom, dateTo] }
        );
      }

      if (query["searchCriteria form-control"] == "Lga") {
        const lga = query["slga form-control"];
        return all.push(
          {
            name: "lga",
            type: "equals",
            value: lga
          },
          { name: "dob", type: "between", value: [dateFrom, dateTo] }
        );
      }
    });

    const token = sessionStorage.getItem("token");

    const res = await fetch(`https://api.remhealth.co/info/query`, {
      method: "POST",
      body: JSON.stringify({
        values: all
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.log("shit!!!");
      return;
    }
    const response = await res.json();

    const { data } = response;

    let defaulted = [];
    let immunized = [];
    let yet = [];

    // fetch immunization records to check their status
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
    this.retrievedData(`${response.data.length} results found`);
    await this.setState({
      imunizedArray: immunized,
      defaulted: defaulted.length,
      defaultedArray: defaulted,
      immunized: immunized.length,
      yet: yet.length,
      length: data.length,
      totalData: data
    });
  };

  addCat = e => {
    this.setState(prevState => ({
      inputs: [
        ...prevState.inputs,
        {
          dateTo: "",
          dateFrom: "",
          gender: "Male",
          dateRangeType: "Registration",
          ageSearch: "",
          ageType: "Days",
          ageFromType: "Days",
          disableState: true,
          ageFrom: "",
          ageToType: "Days",
          ageTo: "",
          vaccine: "BCG",
          searchCriteria: "",
          searchByAge: false,
          searchByGender: false,
          searchByVaccine: false,
          dateRange: false,
          searchByState: false,
          searchByLga: false,
          ageRange: false,
          soo: "Abia",
          slga: "",
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
          ],
          lga: []
        }
      ]
    }));
  };

  filterHandler = async e => {
    e.preventDefault();
    ("age, age range, date range, vaccine, gender");
    let { inputs } = this.state;
    let all = [];

    let dueDate, dateFrom, dateTo;
    const { id } = this.props.match.params;

    switch (id) {
      case "BCG":
      case "HBV 1":
      case "OPV":
        dateFrom = moment()
          .subtract(7, "days")
          .startOf("week")
          .toISOString();
        dateTo = moment().toISOString();
        dueDate = moment()
          .subtract(7, "days")
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
        dueDate = moment()
          .subtract(6, "weeks")
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
        dueDate = moment()
          .subtract(10, "weeks")
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

    const asyncForEach = async (array, cb) => {
      for (let index = 0; index < array.length; index++) {
        await cb(array[index], index, array);
      }
    };

    await asyncForEach(inputs, async query => {
      if (query["searchCriteria form-control"] == "Gender") {
        // just in case there's no selected gender, default is male
        const input = query["gender form-control"] || "Male";
        all.push(
          { name: "gender", type: "equals", value: input },
          { name: "dob", type: "between", value: [dateFrom, dateTo] }
        );
        return;
      }

      if (query["searchCriteria form-control"] == "Date Range") {
        const selectedDateFrom = moment(query["dateFrom form-control"]);
        const selectedDateTo = moment(query["dateTo form-control"]);
        let dateFrom;
        let dateTo;

        const { id } = this.props.match.params;

        switch (id) {
          case "BCG":
          case "HBV 1":
          case "OPV":
            dateFrom = selectedDateFrom
              .subtract(7, "days")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo.toISOString();
            break;

          case "OPV 1":
          case "PCV 1":
          case "Rotarix 1":
          case "Pentavalent 1":
            dateFrom = selectedDateFrom
              .subtract(6, "weeks")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(6, "weeks")
              .endOf("weeks")
              .toISOString();
            break;

          case "OPV 2":
          case "Rotarix 2":
          case "PCV 2":
          case "Pentavalent 2":
            dateFrom = selectedDateFrom
              .subtract(10, "weeks")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(10, "weeks")
              .endOf("week")
              .toISOString();
            break;

          case "OPV 3":
          case "PCV 3":
          case "IPV":
          case "Pentavalent 3":
            dateFrom = selectedDateFrom
              .subtract(14, "weeks")
              .startOf("week")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(14, "weeks")
              .endOf("week")
              .toISOString();
            break;

          case "Vitamin A1":
            dateFrom = selectedDateFrom
              .subtract(6, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(6, "months")
              .endOf("month")
              .toISOString();
            break;

          case "Measles Vaccine":
          case "Yellow Fever Vaccine":
            dateFrom = selectedDateFrom
              .subtract(9, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(9, "months")
              .endOf("month")
              .toISOString();
            break;

          case "Meningitis Vaccine":
          case "Vitamin A2":
          case "OPV booster":
            dateFrom = selectedDateFrom.subtract(12, "months").toISOString();
            dateTo = selectedDateTo.endOf("weeks").toISOString();
            break;

          case "Measles 2":
            dateFrom = selectedDateFrom
              .subtract(18, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(12, "months")
              .endOf("month")
              .toISOString();
            break;

          case "Typhoid Vaccine":
            dateFrom = selectedDateFrom
              .subtract(24, "months")
              .startOf("month")
              .toISOString();
            dateTo = selectedDateTo
              .subtract(24, "months")
              .endOf("month")
              .toISOString();
            break;
        }
        return all.push({
          name: "dob",
          type: "between",
          value: [dateFrom, dateTo]
        });
      }

      if (query["searchCriteria form-control"] == "State") {
        const lga = query["slga form-control"];
        if (lga !== "" && lga !== null && lga) {
          all.push(
            {
              name: "lga",
              type: "equals",
              value: lga
            },
            { name: "dob", type: "between", value: [dateFrom, dateTo] }
          );
        }
        const state = query["soo form-control"];
        return all.push(
          {
            name: "state",
            type: "equals",
            value: state
          },
          { name: "dob", type: "between", value: [dateFrom, dateTo] }
        );
      }

      if (query["searchCriteria form-control"] == "Lga") {
        const lga = query["slga form-control"];
        return all.push(
          {
            name: "lga",
            type: "equals",
            value: lga
          },
          { name: "dob", type: "between", value: [dateFrom, dateTo] }
        );
      }
    });

    const token = sessionStorage.getItem("token");

    const res = await fetch(`https://api.remhealth.co/info/query`, {
      method: "POST",
      body: JSON.stringify({
        values: all
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.log("shit!!!");
      return;
    }
    const response = await res.json();

    const { data } = response;

    let defaulted = [];
    let immunized = [];
    let yet = [];

    // fetch immunization records to check their status
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
    this.retrievedData(`${response.data.length} results found`);
    await this.setState({
      imunizedArray: immunized,
      defaulted: defaulted.length,
      defaultedArray: defaulted,
      immunized: immunized.length,
      yet: yet.length,
      length: data.length,
      totalData: data
    });
  };

  modalHandler = (e, lat, lng) => {
    e.preventDefault();
    const locations = [{ lat, lng }];
    // this.setState({ locations, initial: locations[0] });
    this.state.showMap
      ? this.setState({ showMap: false, zoom: null })
      : this.setState({ locations }, this.setState({ showMap: true }));
  };

  toggle = () => this.setState({ tooltipOpen: !this.state.tooltipOpen });
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

    this.setState({ role: user.role, soo: user.state });
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

    if (user.role === "superAdmin" || user.role === "nationalAdmin") {
      this.setState({ disableState: false });
    }

    if (user.role !== "superAdmin") {
      return this.props.history.push("/home");
    }

    this.setState({
      soo: user.state,
      name: user.name,
      role: user.role
    });

    const res = await fetch(`https://api.remhealth.co/disease/view/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const response = await res.json();

    if (res.ok) {
      const diseaseData = response.data;

      const totalData = diseaseData.filter(disease => {
        const { id } = this.props.match.params;
        return disease.type == id;
      });

      this.setState({
        totalData
      });
    }
  }

  mapHandler = e => {
    const loc = this.state.totalData
      .filter(data => {
        return data.lon !== null && data.lat !== null;
      })
      .map(data => {
        return {
          lat: data.lat,
          lng: data.lon
        };
      });
    this.setState(
      { locations: loc, zoom: 5 },

      this.state.showMap
        ? this.setState({ showMap: false, zoom: null })
        : this.setState({ showMap: true })
    );
  };

  handleState = () => {
    let states = this.state.soo;
    switch (states) {
      case "Abia":
        this.setState({
          lga: [
            "Aba North",
            "Aba South",
            "Arochukwu",
            "Bende",
            "Ikwuano",
            "Isiala Ngwa North",
            "Isiala Ngwa South",
            "Isuikwuato",
            "Obi Ngwa",
            "Ohafia",
            "Osisioma",
            "Ugwunagbo",
            "Ukwa East",
            "Ukwa West",
            "Umuahia North",
            "muahia South",
            "Umu Nneochi"
          ]
        });
        break;

      case "Adamawa":
        this.setState({
          lga: [
            "Demsa",
            "Fufure",
            "Ganye",
            "Gayuk",
            "Gombi",
            "Grie",
            "Hong",
            "Jada",
            "Larmurde",
            "Madagali",
            "Maiha",
            "Mayo Belwa",
            "Michika",
            "Mubi North",
            "Mubi South",
            "Numan",
            "Shelleng",
            "Song",
            "Toungo",
            "Yola North",
            "Yola South"
          ]
        });
        break;

      case "AkwaIbom":
        this.setState({
          lga: [
            "Abak",
            "Eastern Obolo",
            "Eket",
            "Esit Eket",
            "Essien Udim",
            "Etim Ekpo",
            "Etinan",
            "Ibeno",
            "Ibesikpo Asutan",
            "Ibiono-Ibom",
            "Ika",
            "Ikono",
            "Ikot Abasi",
            "Ikot Ekpene",
            "Ini",
            "Itu",
            "Mbo",
            "Mkpat-Enin",
            "Nsit-Atai",
            "Nsit-Ibom",
            "Nsit-Ubium",
            "Obot Akara",
            "Okobo",
            "Onna",
            "Oron",
            "Oruk Anam",
            "Udung-Uko",
            "Ukanafun",
            "Uruan",
            "Urue-Offong Oruko",
            "Uyo"
          ]
        });
        break;

      case "Anambra":
        this.setState({
          lga: [
            "Aguata",
            "Anambra East",
            "Anambra West",
            "Anaocha",
            "Awka North",
            "Awka South",
            "Ayamelum",
            "Dunukofia",
            "Ekwusigo",
            "Idemili North",
            "Idemili South",
            "Ihiala",
            "Njikoka",
            "Nnewi North",
            "Nnewi South",
            "Ogbaru",
            "Onitsha North",
            "Onitsha South",
            "Orumba North",
            "Orumba South",
            "Oyi"
          ]
        });
        break;

      case "Bauchi":
        this.setState({
          lga: [
            "Alkaleri",
            "Bauchi",
            "Bogoro",
            "Damban",
            "Darazo",
            "Dass",
            "Gamawa",
            "Ganjuwa",
            "Giade",
            "Itas-Gadau",
            "Jama are",
            "Katagum",
            "Kirfi",
            "Misau",
            "Ningi",
            "Shira",
            "Tafawa Balewa",
            " Toro",
            " Warji",
            " Zaki"
          ]
        });
        break;

      case "Bayelsa":
        this.setState({
          lga: [
            "Brass",
            "Ekeremor",
            "Kolokuma Opokuma",
            "Nembe",
            "Ogbia",
            "Sagbama",
            "Southern Ijaw",
            "Yenagoa"
          ]
        });
        break;

      case "Benue":
        this.setState({
          lga: [
            "Agatu",
            "Apa",
            "Ado",
            "Buruku",
            "Gboko",
            "Guma",
            "Gwer East",
            "Gwer West",
            "Katsina-Ala",
            "Konshisha",
            "Kwande",
            "Logo",
            "Makurdi",
            "Obi",
            "Ogbadibo",
            "Ohimini",
            "Oju",
            "Okpokwu",
            "Oturkpo",
            "Tarka",
            "Ukum",
            "Ushongo",
            "Vandeikya"
          ]
        });
        break;

      case "Borno":
        this.setState({
          lga: [
            "Abadam",
            "Askira-Uba",
            "Bama",
            "Bayo",
            "Biu",
            "Chibok",
            "Damboa",
            "Dikwa",
            "Gubio",
            "Guzamala",
            "Gwoza",
            "Hawul",
            "Jere",
            "Kaga",
            "Kala-Balge",
            "Konduga",
            "Kukawa",
            "Kwaya Kusar",
            "Mafa",
            "Magumeri",
            "Maiduguri",
            "Marte",
            "Mobbar",
            "Monguno",
            "Ngala",
            "Nganzai",
            "Shani"
          ]
        });
        break;

      case "Cross River":
        this.setState({
          lga: [
            "Abi",
            "Akamkpa",
            "Akpabuyo",
            "Bakassi",
            "Bekwarra",
            "Biase",
            "Boki",
            "Calabar Municipal",
            "Calabar South",
            "Etung",
            "Ikom",
            "Obanliku",
            "Obubra",
            "Obudu",
            "Odukpani",
            "Ogoja",
            "Yakuur",
            "Yala"
          ]
        });
        break;

      case "Delta":
        this.setState({
          lga: [
            "Aniocha North",
            "Aniocha South",
            "Bomadi",
            "Burutu",
            "Ethiope East",
            "Ethiope West",
            "Ika North East",
            "Ika South",
            "Isoko North",
            "Isoko South",
            "Ndokwa East",
            "Ndokwa West",
            "Okpe",
            "Oshimili North",
            "Oshimili South",
            "Patani",
            "Sapele",
            "Udu",
            "Ughelli North",
            "Ughelli South",
            "Ukwuani",
            "Uvwie",
            "Warri North",
            "Warri South",
            "Warri South West"
          ]
        });
        break;

      case "Ebonyi":
        this.setState({
          lga: [
            "Abakaliki",
            "Afikpo North",
            "Afikpo South",
            "Ebonyi",
            "Ezza North",
            "Ezza South",
            "Ikwo",
            "Ishielu",
            "Ivo",
            "Izzi",
            "Ohaozara",
            "Ohaukwu",
            "Onicha"
          ]
        });
        break;

      case "Edo":
        this.setState({
          lga: [
            "Akoko-Edo",
            "Egor",
            "Esan Central",
            "Esan North-East",
            "Esan South-East",
            "Esan West",
            "Etsako Central",
            "Etsako East",
            "Etsako West",
            "Igueben",
            "Ikpoba Okha",
            "Orhionmwon",
            "Oredo",
            "Ovia North-East",
            "Ovia South-West",
            "Owan East",
            "Owan West",
            "Uhunmwonde"
          ]
        });
        break;

      case "Ekiti":
        this.setState({
          lga: [
            "Ado Ekiti",
            "Efon",
            "Ekiti East",
            "Ekiti South-West",
            "Ekiti West",
            "Emure",
            "Gbonyin",
            "Ido Osi",
            "Ijero",
            "Ikere",
            "Ikole",
            "Ilejemeje",
            "Irepodun-Ifelodun",
            "Ise-Orun",
            "Moba",
            "Oye"
          ]
        });
        break;

      case "Rivers":
        this.setState({
          lga: [
            "Port Harcourt",
            "Obio-Akpor",
            "Okrika",
            "Ogu–Bolo",
            "Eleme",
            "Tai",
            "Gokana",
            "Khana",
            "Oyigbo",
            "Opobo–Nkoro",
            "Andoni",
            "Bonny",
            "Degema",
            "Asari-Toru",
            "Akuku-Toru",
            "Abua–Odual",
            "Ahoada West",
            "Ahoada East",
            "Ogba–Egbema–Ndoni",
            "Emohua",
            "Ikwerre",
            "Etche",
            "Omuma"
          ]
        });
        break;

      case "Enugu":
        this.setState({
          lga: [
            "Aninri",
            "Awgu",
            "Enugu East",
            "Enugu North",
            "Enugu South",
            "Ezeagu",
            "Igbo Etiti",
            "Igbo Eze North",
            "Igbo Eze South",
            "Isi Uzo",
            "Nkanu East",
            "Nkanu West",
            "Nsukka",
            "Oji River",
            "Udenu",
            "Udi",
            "Uzo Uwani"
          ]
        });
        break;

      case "FCT":
        this.setState({
          lga: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "AMAC"]
        });
        break;
      case "Gombe":
        this.setState({
          lga: [
            "Akko",
            "Balanga",
            "Billiri",
            "Dukku",
            "Funakaye",
            "Gombe",
            "Kaltungo",
            "Kwami",
            "Nafada",
            "Shongom",
            "Yamaltu-Deba"
          ]
        });
        break;

      case "Imo":
        this.setState({
          lga: [
            "Aboh Mbaise",
            "Ahiazu Mbaise",
            "Ehime Mbano",
            "Ezinihitte",
            "Ideato North",
            "Ideato South",
            "Ihitte-Uboma",
            "Ikeduru",
            "Isiala Mbano",
            "Isu",
            "Mbaitoli",
            "Ngor Okpala",
            "Njaba",
            "Nkwerre",
            "Nwangele",
            "Obowo",
            "Oguta",
            "Ohaji-Egbema",
            "Okigwe",
            "Orlu",
            "Orsu",
            "Oru East",
            "Oru West",
            "Owerri Municipal",
            "Owerri North",
            "Owerri West",
            "Unuimo"
          ]
        });
        break;

      case "Jigawa":
        this.setState({
          lga: [
            "Auyo",
            "Babura",
            "Biriniwa",
            "Birnin Kudu",
            "Buji",
            "Dutse",
            "Gagarawa",
            "Garki",
            "Gumel",
            "Guri",
            "Gwaram",
            "Gwiwa",
            "Hadejia",
            "Jahun",
            "Kafin Hausa",
            "Kazaure",
            "Kiri Kasama",
            "Kiyawa",
            "Kaugama",
            "Maigatari",
            "Malam Madori",
            "Miga",
            "Ringim",
            "Roni",
            "Sule Tankarkar",
            "Taura",
            "Yankwashi"
          ]
        });
        break;

      case "Kaduna":
        this.setState({
          lga: [
            "Birnin Gwari",
            "Chikun",
            "Giwa",
            "Igabi",
            "Ikara",
            "Jaba",
            "Jema'a",
            "Kachia",
            "Kaduna North",
            "Kaduna South",
            "Kagarko",
            "Kajuru",
            "Kaura",
            "Kauru",
            "Kubau",
            "Kudan",
            "Lere",
            "Makarfi",
            "Sabon Gari",
            "Sanga",
            "Soba",
            "Zangon Kataf",
            "Zaria"
          ]
        });
        break;

      case "Kano":
        this.setState({
          lga: [
            "Ajingi",
            "Albasu",
            "Bagwai",
            "Bebeji",
            "Bichi",
            "Bunkure",
            "Dala",
            "Dambatta",
            "Dawakin Kudu",
            "Dawakin Tofa",
            "Doguwa",
            "Fagge",
            "Gabasawa",
            "Garko",
            "Garun Mallam",
            "Gaya",
            "Gezawa",
            "Gwale",
            "Gwarzo",
            "Kabo",
            "Kano Municipal",
            "Karaye",
            "Kibiya",
            "Kiru",
            "Kumbotso",
            "Kunchi",
            "Kura",
            "Madobi",
            "Makoda",
            "Minjibir",
            "Nasarawa",
            "Rano",
            "Rimin Gado",
            "Rogo",
            "Shanono",
            "Sumaila",
            "Takai",
            "Tarauni",
            "Tofa",
            "Tsanyawa",
            "Tudun Wada",
            "Ungogo",
            "Warawa",
            "Wudil"
          ]
        });
        break;

      case "Katsina":
        this.setState({
          lga: [
            "Bakori",
            "Batagarawa",
            "Batsari",
            "Baure",
            "Bindawa",
            "Charanchi",
            "Dandume",
            "Danja",
            "Dan Musa",
            "Daura",
            "Dutsi",
            "Dutsin Ma",
            "Faskari",
            "Funtua",
            "Ingawa",
            "Jibia",
            "Kafur",
            "Kaita",
            "Kankara",
            "Kankia",
            "Katsina",
            "Kurfi",
            "Kusada",
            "Mai Adua",
            "Malumfashi",
            "Mani",
            "Mashi",
            "Matazu",
            "Musawa",
            "Rimi",
            "Sabuwa",
            "Safana",
            "Sandamu",
            "Zango"
          ]
        });
        break;

      case "Kebbi":
        this.setState({
          lga: [
            "Aleiro",
            "Arewa Dandi",
            "Argungu",
            "Augie",
            "Bagudo",
            "Birnin Kebbi",
            "Bunza",
            "Dandi",
            "Fakai",
            "Gwandu",
            "Jega",
            "Kalgo",
            "Koko Besse",
            "Maiyama",
            "Ngaski",
            "Sakaba",
            "Shanga",
            "Suru",
            "Wasagu Danko",
            "Yauri",
            "Zuru"
          ]
        });
        break;

      case "Kogi":
        this.setState({
          lga: [
            "Adavi",
            "Ajaokuta",
            "Ankpa",
            "Bassa",
            "Dekina",
            "Ibaji",
            "Idah",
            "Igalamela Odolu",
            "Ijumu",
            "Kabba Bunu",
            "Kogi",
            "Lokoja",
            "Mopa Muro",
            "Ofu",
            "Ogori Magongo",
            "Okehi",
            "Okene",
            "Olamaboro",
            "Omala",
            "Yagba East",
            "Yagba West"
          ]
        });
        break;

      case "Kwara":
        this.setState({
          lga: [
            "Asa",
            "Baruten",
            "Edu",
            "Ekiti",
            "Ifelodun",
            "Ilorin East",
            "Ilorin South",
            "Ilorin West",
            "Irepodun",
            "Isin",
            "Kaiama",
            "Moro",
            "Offa",
            "Oke Ero",
            "Oyun",
            "Pategi"
          ]
        });
        break;

      case "Lagos":
        this.setState({
          lga: [
            "Agege",
            "Ajeromi-Ifelodun",
            "Alimosho",
            "Amuwo-Odofin",
            "Apapa",
            "Badagry",
            "Epe",
            "Eti Osa",
            "Ibeju-Lekki",
            "Ifako-Ijaiye",
            "Ikeja",
            "Ikorodu",
            "Kosofe",
            "Lagos Island",
            "Lagos Mainland",
            "Mushin",
            "Ojo",
            "Oshodi-Isolo",
            "Shomolu",
            "Surulere"
          ]
        });
        break;

      case "Nasarawa":
        this.setState({
          lga: [
            "Akwanga",
            "Awe",
            "Doma",
            "Karu",
            "Keana",
            "Keffi",
            "Kokona",
            "Lafia",
            "Nasarawa",
            "Nasarawa Egon",
            "Obi",
            "Toto",
            "Wamba"
          ]
        });
        break;

      case "Niger":
        this.setState({
          lga: [
            "Agaie",
            "Agwara",
            "Bida",
            "Borgu",
            "Bosso",
            "Chanchaga",
            "Edati",
            "Gbako",
            "Gurara",
            "Katcha",
            "Kontagora",
            "Lapai",
            "Lavun",
            "Magama",
            "Mariga",
            "Mashegu",
            "Mokwa",
            "Moya",
            "Paikoro",
            "Rafi",
            "Rijau",
            "Shiroro",
            "Suleja",
            "Tafa",
            "Wushishi"
          ]
        });
        break;

      case "Ogun":
        this.setState({
          lga: [
            "Abeokuta North",
            "Abeokuta South",
            "Ado-Odo Ota",
            "Egbado North",
            "Egbado South",
            "Ewekoro",
            "Ifo",
            "Ijebu East",
            "Ijebu North",
            "Ijebu North East",
            "Ijebu Ode",
            "Ikenne",
            "Imeko Afon",
            "Ipokia",
            "Obafemi Owode",
            "Odeda",
            "Odogbolu",
            "Ogun Waterside",
            "Remo North",
            "Shagamu"
          ]
        });
        break;

      case "Ondo":
        this.setState({
          lga: [
            "Akoko North-East",
            "Akoko North-West",
            "Akoko South-West",
            "Akoko South-East",
            "Akure North",
            "Akure South",
            "Ese Odo",
            "Idanre",
            "Ifedore",
            "Ilaje",
            "Ile Oluji-Okeigbo",
            "Irele",
            "Odigbo",
            "Okitipupa",
            "Ondo East",
            "Ondo West",
            "Ose",
            "Owo"
          ]
        });
        break;

      case "Osun":
        this.setState({
          lga: [
            "Atakunmosa East",
            "Atakunmosa West",
            "Aiyedaade",
            "Aiyedire",
            "Boluwaduro",
            "Boripe",
            "Ede North",
            "Ede South",
            "Ife Central",
            "Ife East",
            "Ife North",
            "Ife South",
            "Egbedore",
            "Ejigbo",
            "Ifedayo",
            "Ifelodun",
            "Ila",
            "Ilesa East",
            "Ilesa West",
            "Irepodun",
            "Irewole",
            "Isokan",
            "Iwo",
            "Obokun",
            "Odo Otin",
            "Ola Oluwa",
            "Olorunda",
            "Oriade",
            "Orolu",
            "Osogbo"
          ]
        });
        break;

      case "Oyo":
        this.setState({
          lga: [
            "Afijio",
            "Akinyele",
            "Atiba",
            "Atisbo",
            "Egbeda",
            "Ibadan North",
            "Ibadan North-East",
            "Ibadan North-West",
            "Ibadan South-East",
            "Ibadan South-West",
            "Ibarapa Central",
            "Ibarapa East",
            "Ibarapa North",
            "Ido",
            "Irepo",
            "Iseyin",
            "Itesiwaju",
            "Iwajowa",
            "Kajola",
            "Lagelu",
            "Ogbomosho North",
            "Ogbomosho South",
            "Ogo Oluwa",
            "Olorunsogo",
            "Oluyole",
            "Ona Ara",
            "Orelope",
            "Ori Ire",
            "Oyo",
            "Oyo East",
            "Saki East",
            "Saki West",
            "Surulere"
          ]
        });
        break;

      case "Plateau":
        this.setState({
          lga: [
            "Bokkos",
            "Barkin Ladi",
            "Bassa",
            "Jos East",
            "Jos North",
            "Jos South",
            "Kanam",
            "Kanke",
            "Langtang South",
            "Langtang North",
            "Mangu",
            "Mikang",
            "Pankshin",
            "Qua an Pan",
            "Riyom",
            "Shendam",
            "Wase"
          ]
        });
        break;

      case "Sokoto":
        this.setState({
          lga: [
            "Binji",
            "Bodinga",
            "Dange Shuni",
            "Gada",
            "Goronyo",
            "Gudu",
            "Gwadabawa",
            "Illela",
            "Isa",
            "Kebbe",
            "Kware",
            "Rabah",
            "Sabon Birni",
            "Shagari",
            "Silame",
            "Sokoto North",
            "Sokoto South",
            "Tambuwal",
            "Tangaza",
            "Tureta",
            "Wamako",
            "Wurno",
            "Yabo"
          ]
        });
        break;

      case "Taraba":
        this.setState({
          lga: [
            "Ardo Kola",
            "Bali",
            "Donga",
            "Gashaka",
            "Gassol",
            "Ibi",
            "Jalingo",
            "Karim Lamido",
            "Kumi",
            "Lau",
            "Sardauna",
            "Takum",
            "Ussa",
            "Wukari",
            "Yorro",
            "Zing"
          ]
        });
        break;

      case "Yobe":
        this.setState({
          lga: [
            "Bade",
            "Bursari",
            "Damaturu",
            "Fika",
            "Fune",
            "Geidam",
            "Gujba",
            "Gulani",
            "Jakusko",
            "Karasuwa",
            "Machina",
            "Nangere",
            "Nguru",
            "Potiskum",
            "Tarmuwa",
            "Yunusari",
            "Yusufari"
          ]
        });
        break;

      case "Zamfara":
        this.setState({
          lga: [
            "Anka",
            "Bakura",
            "Birnin Magaji Kiyaw",
            "Bukkuyum",
            "Bungudu",
            "Gummi",
            "Gusau",
            "Kaura Namoda",
            "Maradun",
            "Maru",
            "Shinkafi",
            "Talata Mafara",
            "Chafe",
            "Zurmi"
          ]
        });
        break;

      default:
        this.setState({
          lga: []
        });
    }
  };

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
          dateRange: false,
          searchByState: false,
          searchByLga: false
        });
        break;

      case "Gender":
        this.setState({
          searchByGender: true,
          ageRange: false,
          searchByAge: false,
          searchByVaccine: false,
          dateRange: false,
          searchByState: false,
          searchByLga: false
        });
        break;

      case "Vaccine":
        this.setState({
          searchByVaccine: true,
          ageRange: false,
          searchByAge: false,
          searchByGender: false,
          dateRange: false,
          searchByState: false,
          searchByLga: false
        });
        break;

      case "Date Range":
        return this.setState({
          dateRange: true,
          searchByAge: false,
          ageRange: false,
          searchByGender: false,
          searchByVaccine: false,
          searchByState: false,
          searchByLga: false
        });

      case "Age Range":
        return this.setState({
          ageRange: true,
          searchByAge: false,
          dateRange: false,
          searchByGender: false,
          searchByVaccine: false,
          searchByState: false,
          searchByLga: false
        });

      case "State":
        return this.setState({
          ageRange: false,
          searchByAge: false,
          dateRange: false,
          searchByGender: false,
          searchByVaccine: false,
          searchByState: true,
          searchByLga: false
        });

      case "LGA":
        return this.setState({
          ageRange: false,
          searchByAge: false,
          dateRange: false,
          searchByGender: false,
          searchByVaccine: false,
          searchByState: false,
          searchByLga: true
        });

      default:
        return this.setState({
          ageRange: false,
          searchByAge: false,
          dateRange: false,
          searchByGender: false,
          searchByVaccine: false,
          searchByState: false,
          searchByLga: false
        });
    }
  };

  searchHandler = async e => {
    e.preventDefault();
    this.setState({ activeSearch: true });
    if (this.state.input != "") {
      const token = sessionStorage.getItem("token");
      await fetch(
        `https://api.remhealth.co/hospital/all?search=${this.state.input}`,
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
            { totalData: res.hospitals, message: "Data retrieved" },
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
      url = "https://api.remhealth.co/disease/view/all";
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
          dateFrom = moment()
            .subtract(7, "days")
            .startOf("week")
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
        return this.setState(
          { totalData: [], error: "No data found" },
          this.noData
        );
      }
    } else if (this.state.searchCriteria == "State") {
      if (!this.state.soo) {
        return;
      }
      let param = this.state.soo;
      if (this.state.slga !== "") {
        param = this.state.slga;
      }
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${url}?search=${param}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const { data } = await res.json();
        this.setState(
          { totalData: data, message: "Data retrieved" },
          this.retrievedData
        );
        return;
      }
      return this.setState(
        { totalData: [], error: "No data found" },
        this.noData
      );
    } else if (this.state.searchCriteria == "Age") {
      dateFrom = moment()
        .subtract(this.state.ageSearch, this.state.ageType)
        .startOf(this.state.ageType)
        .format("YYYY-MM-DD");
      dateTo = moment()
        .subtract(this.state.ageSearch, this.state.ageType)
        .endOf(this.state.ageType)
        .toISOString();
    }

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
    e.persist();

    await this.setState({ [e.target.name]: e.target.value });
    if ([e.target.name] == "soo") {
      this.handleState([e.target.value]);
      return;
    }
    this.criteriaHandler();
  };

  buttonHandler = e => {
    e.preventDefault();
    this.setState({ activeSearch: !this.state.activeSearch, input: "" });
  };

  render() {
    let { inputs, role } = this.state;
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
                {this.state.totalData.length >= 1 ? (
                  <div>
                    <DynamicInputs
                      inputs={inputs}
                      vaccine={true}
                      onChangeHandler={this.onChangeHandler}
                      role={role}
                    />
                    <Row>
                      {/* <Col md={1}> </Col> */}
                      <Col style={{ marginLeft: "14px" }} md={3}>
                        <Button color="info" onClick={this.addCat}>
                          Add query
                        </Button>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          {/* <Label for="submit"></Label> */}
                          <Button
                            // onClick={this.filterHandler}
                            onClick={()=>alert(`hold on Tochukwu, it'll be functional soon`)}
                            // disabled={this.state.searchCriteria == ""}
                            color="warning"
                          >
                            Filter
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <h4>Total Cases: {this.state.totalData.length}</h4>
                      </Col>
                    </Row>
                  </div>
                ) : null}
                {this.state.totalData.length < 1 ? (
                  <Card>
                    <div className="card-header">
                      No data
                      <div className="btn-actions-pane-right">
                        {/* <div
                          id="TooltipExample"
                          role="group"
                          className="btn-group-sm btn-group"
                        >
                          <Link to="/hospital/new">
                            <button
                              style={{ marginLeft: "15px" }}
                              className="mr-2 btn-icon btn-icon-only btn btn-outline-success"
                            >
                              <i className="pe-7s-plus btn-icon-wrapper"> </i>
                            </button>
                            <Tooltip
                              placement="right"
                              isOpen={this.state.tooltipOpen}
                              target="TooltipExample"
                              toggle={this.toggle}
                            >
                              Add Hospital
                            </Tooltip>
                          </Link>
                        </div>*/}
                      </div>
                    </div>
                  </Card>
                ) : (
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
                        <div
                          onClick={this.mapHandler}
                          role="group"
                          className="btn-group-sm btn-group"
                        >
                          <button
                            style={{ marginLeft: "15px" }}
                            className="mr-2 btn-icon btn-icon-only btn btn-outline-info"
                          >
                            <i className="pe-7s-map-marker"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Child's Name</th>
                            <th className="text-center">State</th>
                            <th className="text-center">LGA</th>
                            {/* <th className="text-center">Gender</th>
                          <th className="text-center">Immunization Code</th> */}
                          </tr>
                        </thead>
                        {this.state.pageOfItems.map(item => {
                          return (
                            <tbody key={item.id}>
                              <tr>
                                <td className="text-center">{item.type}</td>
                                <td className="text-center">
                                  {item.childData.name}
                                </td>
                                <td className="text-center">{item.state}</td>
                                <td className="text-center">{item.lga}</td>

                                <td
                                  className="text-center"
                                  style={{ cursor: "pointer" }}
                                  onClick={e => {
                                    {
                                      item.lat
                                        ? this.modalHandler(
                                            e,
                                            item.lat,
                                            item.lon
                                          )
                                        : null;
                                    }
                                  }}
                                >
                                  {item.lat ? (
                                    <i className="pe-7s-map-marker"></i>
                                  ) : null}
                                </td>

                                <td className="text-center">
                                  <Link
                                    to={`/data/${item.child}`}
                                    params={{ id: item.child }}
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
                )}
              </Col>
            </Row>
            {this.state.locations.length > 0 ? (
              <Map
                initial={this.state.locations[0]}
                clicked={this.modalHandler}
                shows={this.state.showMap}
                stores={this.state.locations}
                zoom={this.state.zoom}
              />
            ) : null}
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
