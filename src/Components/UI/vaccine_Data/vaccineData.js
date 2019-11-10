import React, { PureComponent, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import DynamicInputs from "../DynamicInputs/DynamicInput";
import {
  Row,
  Col,
  CardHeader,
  Card,
  Button,
  FormGroup,
  CardBody
} from "reactstrap";
import JwPagination from "jw-react-pagination";
import Map from "../Map/Map";

import { toast, Bounce } from "react-toastify";
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
    imunizedArray: [],
    defaultedArray: [],
    length: 0,
    immunized: 0,
    defaulted: 0,
    slga: "",
    soo: "Abia",
    lga: [],
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
    twentyFourMonthsFemale: 0,
    locations: []
  };

  criteriaHandler = id => {
    let inputs = [...this.state.inputs];

    switch (this.state.inputs[id]["searchCriteria form-control"]) {
      case "Age":
        inputs[id]["searchByAge"] = true;
        inputs[id]["searchByGender"] = false;
        inputs[id]["ageRange"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByState"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
        break;

      case "Gender":
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = true;
        inputs[id]["ageRange"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByState"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
        break;

      case "Vaccine":
        inputs[id]["searchByVaccine"] = true;
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = false;
        inputs[id]["ageRange"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByState"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
        break;

      case "Date Range":
        inputs[id]["dateRange"] = true;
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = false;
        inputs[id]["ageRange"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["searchByState"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
        break;

      case "Age Range":
        inputs[id]["ageRange"] = true;
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByState"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
        break;

      case "State":
        inputs[id]["searchByState"] = true;
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = false;
        inputs[id]["ageRange"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
        break;

      case "LGA":
        inputs[id]["searchByLga"] = true;
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = false;
        inputs[id]["ageRange"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByState"] = false;
        this.setState({ inputs });
        break;

      default:
        inputs[id]["searchByAge"] = false;
        inputs[id]["searchByGender"] = false;
        inputs[id]["ageRange"] = false;
        inputs[id]["searchByVaccine"] = false;
        inputs[id]["dateRange"] = false;
        inputs[id]["searchByState"] = false;
        inputs[id]["searchByLga"] = false;
        this.setState({ inputs });
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

  handleState = id => {
    let inputs = [...this.state.inputs];
    console.log(inputs[id]);
    console.log(id);
    let states = inputs[id]["soo form-control"];
    console.log(states);
    switch (states) {
      case "Abia":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Adamawa":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "AkwaIbom":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Anambra":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Bauchi":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Bayelsa":
        inputs[id].lga = [
          "Brass",
          "Ekeremor",
          "Kolokuma Opokuma",
          "Nembe",
          "Ogbia",
          "Sagbama",
          "Southern Ijaw",
          "Yenagoa"
        ];
        this.setState({ inputs });
        break;

      case "Benue":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Borno":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Cross River":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Delta":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Ebonyi":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Edo":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Ekiti":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Rivers":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Enugu":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "FCT":
        inputs[id].lga = [
          "Abaji",
          "Bwari",
          "Gwagwalada",
          "Kuje",
          "Kwali",
          "AMAC"
        ];
        this.setState({ inputs });
        break;
      case "Gombe":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Imo":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Jigawa":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Kaduna":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Kano":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Katsina":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Kebbi":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Kogi":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Kwara":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Lagos":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Nasarawa":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Niger":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Ogun":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Ondo":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Osun":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Oyo":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Plateau":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Sokoto":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Taraba":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Yobe":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      case "Zamfara":
        inputs[id].lga = [
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
        ];
        this.setState({ inputs });
        break;

      default:
        inputs[id].lga = [];
        this.setState({ inputs });
    }
  };

  kFormatter(num) {
    return Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M"
      : Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.sign(num) * Math.abs(num);
  }

  modalHandler = (e, lat, lng) => {
    e.preventDefault();
    const locations = [{ lat, lng }];
    // this.setState({ locations, initial: locations[0] });
    this.state.showMap
      ? this.setState({ showMap: false, zoom: null })
      : this.setState({ locations }, this.setState({ showMap: true }));
  };

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

      this.setState({ role: user.role, soo: user.state });
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
    await this.setState({
      imunizedArray: immunized,
      defaulted: defaulted.length,
      defaultedArray: defaulted,
      immunized: immunized.length,
      yet: yet.length,
      length: data.length,
      totalData: data
    });
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

  onChangeHandler = async e => {
    e.preventDefault();
    e.persist();
    console.log(e.target.className);
    if (
      [
        "dateTo form-control",
        "dateFrom form-control",
        "gender form-control",
        "dateRangeType form-control",
        "ageSearch form-control",
        "ageType form-control",
        "ageFromType form-control",
        "disableState form-control",
        "ageFrom form-control",
        "ageToType form-control",
        "ageTo form-control",
        "vaccine form-control",
        "searchCriteria form-control",
        "searchByAge form-control",
        ,
        "searchByGender form-control",
        ,
        "searchByVaccine form-control",
        ,
        "soo form-control",
        "dateRange form-control",
        ,
        "searchByState form-control",
        ,
        "searchByLga form-control",
        ,
        "ageRange form-control",
        ,
        "slga form-control"
      ].includes(e.target.className)
    ) {
      let inputs = [...this.state.inputs];
      inputs[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ inputs });
      this.criteriaHandler(e.target.dataset.id);
      if ([e.target.name] == "soo" + e.target.dataset.id) {
        this.handleState(e.target.dataset.id);
        return;
      }
    } else {
      console.log(e.target.type);
      e.target.value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      await this.setState({ [e.target.name]: e.target.value });
    }
  };

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
                    onClick={this.filterHandler}
                    // disabled={this.state.searchCriteria == ""}
                    color="warning"
                  >
                    Filter
                  </Button>
                </FormGroup>
              </Col>
            </Row>
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
                  {this.state.imunizedArray.length > 0 ? (
                    <div
                      role="group"
                      className="btn-group-sm btn-group"
                      onClick={this.mapHandler}
                    >
                      <button className="mr-2 btn-icon btn-icon-only btn btn-outline-success">
                        <i className="pe-7s-map-marker btn-icon-wrapper"> </i>
                      </button>
                    </div>
                  ) : null}
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
                      <th className="text-center">Due Date</th>
                      <th className="text-center">Immunization Date</th>
                    </tr>
                  </thead>
                  {this.state.pageOfItems.map(item => {
                    let color, immunizationDate, dueDate;
                    let lat;
                    let lon;

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
                        lat = im.record[im.record.length - 1].lat;
                        lon = im.record[im.record.length - 1].lon;
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
                          <td className="text-center">
                            {moment(dueDate).format("DD - MM - YYYY")}
                          </td>
                          <td className="text-center">{immunizationDate}</td>

                          <td
                            className="text-center"
                            style={{ cursor: "pointer" }}
                            onClick={e => {
                              {
                                lat ? this.modalHandler(e, lat, lon) : null;
                              }
                            }}
                          >
                            {lat ? <i className="pe-7s-map-marker"></i> : null}
                          </td>

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
