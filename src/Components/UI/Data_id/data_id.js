import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link, matchPath } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import JwPagination from "jw-react-pagination";
import Map from "../Map/Map";

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

const max = moment().format("YYYY-MM-DD");
const list = [
  "BCG",
  "HBV 1",
  "OPV",
  "OPV 1",
  "PCV 1",
  "Rotarix 1",
  "Pentavalent 1",
  "OPV 2",
  "Rotarix 2",
  "PCV 2",
  "Pentavalent 2",
  "OPV 3",
  "PCV 3",
  "IPV",
  "Rotarix 3",
  "Pentavalent 3",
  "Vitamin A1",
  "Measles Vaccine",
  "Yellow Fever Vaccine",
  "Meningitis Vaccine",
  "Vitamin A2",
  "OPV Booster",
  "Measles 2 Vaccine",
  "Typhoid Vaccine"
];
export default class Data extends Component {
  state = {
    data: {},
    loading: false,
    soo: "",
    email: "",
    language: "",
    phonenumber: "",
    dob: "",
    qrCode: "",
    pageOfItems: [],
    name: "",
    gender: "",
    fatherName: "",
    motherName: "",
    disableState: true,
    disableInput: true,
    button: "Edit",
    date: "Text",
    immunization: [],
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
    id: 0,
    cancel: false,
    locations: [],
    showMap: false,
    zoom: null
  };

  async componentWillMount() {
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
    if (user.role === "superAdmin" || user.role === "nationalAdmin") {
      this.setState({ disableState: false });
    }
    this.setState({
      soo: user.state
    });
  }

  async componentDidMount() {
    const token = await sessionStorage.getItem("token");

    const { id } = this.props.match.params;
    const response = await fetch(`https://api.remhealth.co/info/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const { data } = await response.json();

    const {
      email,
      phonenumber,
      dob,
      name,
      immunizationCode,
      gender,
      fatherName,
      motherName,
      state,
      language
    } = data;

    await this.setState({
      email,
      phonenumber,
      dob,
      id,
      name,
      fatherName,
      motherName,
      immunizationCode,
      gender,
      language,
      soo: state
    });

    let image;
    let randomCode = data.qrCode;
    if (data.qrCode) {
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomCode}&margin=2`,
        {
          method: "POST"
        }
      );

      const images = await res.blob();

      image = await URL.createObjectURL(images);
    }
    this.setState({ qrCode: image });

    const immunizationDetails = await fetch(
      `https://api.remhealth.co/immunization/child/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (immunizationDetails.ok) {
      const immunization = await immunizationDetails.json();

      const list = [
        "BCG",
        "HBV 1",
        "OPV",
        "OPV 1",
        "PCV 1",
        "Rotarix 1",
        "Pentavalent 1",
        "OPV 2",
        "Rotarix 2",
        "PCV 2",
        "OPV 2",
        "Pentavalent 2",
        "OPV 3",
        "PCV 3",
        "IPV",
        "Rotarix 3",
        "Pentavalent 3",
        "Vitamin A1",
        "Measles Vaccine",
        "Yellow Fever Vaccine",
        "Meningitis Vaccine",
        "Vitamin A2",
        "OPV Booster",
        "Measles 2 Vaccine",
        "Typhoid Vaccine"
      ];

      let color = "";
      let immunizationData = [];

      // immunization.data.forEach(im => {
      //   if (list.includes(im.name)) {
      //     return (im.color = "rgba(0, 255, 0, 0.5)");
      //   }
      // });
      // This piece of code is irrelevant atm but i think it has a future
      // await list.map(item => {
      //   immunization.data.forEach(im => {
      //     if (item == im.type) {
      //       immunizationData.push({
      //         type: item,
      //         color: "rgba(0, 255, 0, 0.5)",
      //         date: im.createdAt,
      //         lat: im.lat,
      //         lng: im.lon
      //       });
      //     } else {
      //       immunizationData.push({ type: item, color: "", date: "-" });
      //     }
      //   });
      // });
      await this.setState({
        immunization: immunization.data
      });
    }
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
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

  submitHandler = e => {
    e.preventDefault();
    if (this.state.button == "Edit") {
      return this.setState({
        button: "Save",
        disableInput: false,
        cancel: true
      });
    }
    if (this.state.button == "Save") {
      this.setState({ loading: true });
    }
    fetch(`https://api.remhealth.co/info/edit/${this.state.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: this.state.email,
        phonenumber: this.state.phonenumber,
        dob: this.state.dob,
        gender: this.state.gender,
        motherName: this.state.motherName,
        fatherName: this.state.fatherName,
        name: this.state.name,
        language: this.state.language,
        name: this.state.name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({ loading: false, disableInput: true });
        if (!res.ok && res.status !== 401) {
          throw Error(res.message);
        } else if (res.status === 401) {
          res.json().then(res => {
            this.setState({ error: res.message }, this.loginError);
          });
        } else {
          return res.json().then(res => {
            const { data } = res;

            const {
              email,
              phonenumber,
              dob,
              name,
              immunizationCode,
              gender,
              state,
              id,
              language
            } = data;

            this.setState({
              email,
              phonenumber,
              dob,
              id,
              name,
              immunizationCode,
              gender,
              language,
              soo: state
            });
          });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        this.setState({ error: err.message }, this.loginError);
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
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle style={{ textAlign: "center" }}>
                      Registration Info
                    </CardTitle>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Row>
                            <Col md={12}>
                              {this.state.qrCode ? (
                                <img src={this.state.qrCode} />
                              ) : (
                                "No QR Code"
                              )}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={8}>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="name">Full Name</Label>
                                <Input
                                  value={this.state.name}
                                  required
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="Enter full name"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="dob">Date Of Birth</Label>
                                <Input
                                  value={moment(this.state.dob).format(
                                    "YYYY-MM-DD"
                                  )}
                                  type="date"
                                  required
                                  name="dob"
                                  id="dob"
                                  max={max}
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="state">State</Label>
                                <Input
                                  value={this.state.soo}
                                  type="select"
                                  name="soo"
                                  id="state"
                                  onChange={this.onChangeHandler}
                                  disabled={
                                    this.state.disableState ||
                                    this.state.disableInput
                                  }
                                >
                                  <option>--State--</option>
                                  {this.state.sor.map(sors => {
                                    return (
                                      <option key={sors} value={sors}>
                                        {sors}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="phonenumber">Phonenumber</Label>
                                <Input
                                  value={this.state.phonenumber}
                                  type="text"
                                  name="phonenumber"
                                  id="phonenumber"
                                  required
                                  placeholder="Phone Number"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="gender">Gender</Label>
                                <Input
                                  value={this.state.gender}
                                  type="select"
                                  name="gender"
                                  id="gender"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                >
                                  <option>Male</option>
                                  <option>Female</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="language">Language</Label>
                                <Input
                                  value={this.state.language}
                                  type="select"
                                  name="language"
                                  id="language"
                                  placeholder="language"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                >
                                  <option>English</option>
                                  <option>Pidgin</option>
                                  <option>Igbo</option>
                                  <option>Yoruba</option>
                                  <option>Hausa</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="immunizationCode">
                                  Immunization Code
                                </Label>
                                <Input
                                  value={this.state.immunizationCode}
                                  type="text"
                                  name="immunizationCode"
                                  id="immunizationCode"
                                  onChange={this.onChangeHandler}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                  value={this.state.email}
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="yourmail@host.com"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="motherName">Mother's Name</Label>
                                <Input
                                  value={this.state.motherName}
                                  type="text"
                                  name="motherName"
                                  id="motherName"
                                  placeholder="Full Name"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="fatherName">Father's Name</Label>
                                <Input
                                  value={this.state.fatherName}
                                  type="text"
                                  name="fatherName"
                                  id="fatherName"
                                  placeholder="Full Name"
                                  onChange={this.onChangeHandler}
                                  disabled={this.state.disableInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          {!this.state.loading ? (
                            <Row form>
                              <Col md={6}>
                                <Button
                                  color="success"
                                  className="mt-2"
                                  onClick={this.submitHandler}
                                >
                                  {this.state.button}
                                </Button>
                                {this.state.cancel ? (
                                  // <Col md={4}>
                                  <Button
                                    style={{ marginLeft: "5px" }}
                                    color="warning"
                                    className="mt-2"
                                    onClick={() =>
                                      this.setState({
                                        cancel: false,
                                        button: "Edit",
                                        disableInput: true
                                      })
                                    }
                                  >
                                    Cancel
                                  </Button>
                                ) : // </Col>
                                null}
                              </Col>
                            </Row>
                          ) : (
                            <Row form>
                              <Col md={6}></Col>
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
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle style={{ textAlign: "center" }}>
                      Immunization Info
                    </CardTitle>
                  </CardBody>
                  <div className="table-responsive">
                    <table className="align-middle mb-0 table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">Name</th>
                          <th className="text-center">Date Immunized</th>
                        </tr>
                      </thead>
                      {list.map(item => {
                        let color = "";
                        let date = "-";
                        this.state.immunization.forEach(im => {
                          if (item == im.type) {
                            color = "rgba(0, 255, 0, 0.5)";
                            date = moment(im.createdAt).format(
                              "DD - MM - YYYY"
                            );
                          }
                        });
                        return (
                          <tbody key={item}>
                            <tr style={{ backgroundColor: color }}>
                              <td className="text-center">{item}</td>
                              <td className="text-center">{date}</td>
                              <td
                                className="text-center"
                                onClick={e => {
                                  this.modalHandler(e, item.lat, item.lon);
                                }}
                              >
                                {item.lat ? (
                                  <i className="pe-7s-map-marker"></i>
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                    {/* <JwPagination
                      items={this.state.immunization}
                      onChangePage={this.onChangePage}
                      pageSize={50} 
                    />*/}
                  </div>
                </Card>
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
