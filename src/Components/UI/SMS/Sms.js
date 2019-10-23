import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import JwPagination from "jw-react-pagination";
import SearchBox from "../../../Layout/AppHeader/Components/SearchBox";
import DynamicInputs from "../DynamicInputs/DynamicInput";
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
    total: 0,
    name: "",
    cats: [{ name: "", age: "" }],
    role: "",
    input: "",
    message: "",
    error: "",
    activeSearch: false,
    save: true,
    message: "",
    totalData: [],
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
    recipients: [],
    vaccine: "BCG",
    searchCriteria: "",
    searchByAge: false,
    searchByGender: false,
    searchByVaccine: false,
    dateRange: false,
    searchByState: false,
    searchByLga: false,
    ageRange: false,
    slga: "",
    pageOfItems: [],
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
    ]
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

    this.setState({
      name: user.name
    });
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
    this.setState({
      soo: user.state,
      name: user.name,
      role: user.role
    });

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

    const asyncForEach = async (array, cb) => {
      for (let index = 0; index < array.length; index++) {
        await cb(array[index], index, array);
      }
    };

    await asyncForEach(inputs, async query => {
      console.log(query["searchCriteria form-control"]);
      if (query["searchCriteria form-control"] == "Age") {
        const dateFrom = moment()
          .subtract(
            query["ageSearch form-control"],
            query["ageType form-control"]
          )
          .startOf(query["ageType form-control"])
          .toISOString();
        const dateTo = moment()
          .subtract(
            query["ageSearch form-control"],
            query["ageType form-control"] || "days"
          )
          .endOf(query["ageType form-control"] || "day")
          .toISOString();

        console.log("done!!!-------", dateFrom, dateTo);
        console.log("done!!!-------", query["ageType form-control"]);
        return all.push({
          name: "dob",
          type: "between",
          value: [dateFrom, dateTo]
        });
      }

      if (query["searchCriteria form-control"] == "Gender") {
        // just in case there's no selected gender, default is male
        const input = query["gender form-control"] || "Male";
        all.push({ name: "gender", type: "equals", value: input });
        return;
      }
      if (query["searchCriteria form-control"] == "Age Range") {
        const dateFrom = moment()
          .subtract(
            query["ageFrom form-control"],
            query["ageFromType form-control"]
          )
          .toISOString();
        const dateTo = moment()
          .subtract(
            query["ageTo form-control"],
            query["ageToType form-control"]
          )
          .toISOString();
        return all.push({
          name: "dob",
          type: "between",
          value: [dateFrom, dateTo]
        });
      }
      if (query["searchCriteria form-control"] == "Date Range") {
        const dateFrom = query["dateFrom form-control"];
        const dateTo = query["dateTo form-control"];
        if (query["dateRangeType form-control"] == "Registration") {
          return all.push({
            name: "createdAt",
            type: "between",
            value: [dateFrom, dateTo]
          });
        }
        return all.push({
          name: "dob",
          type: "between",
          value: [dateFrom, dateTo]
        });
      }

      if (query["searchCriteria form-control"] == "Vaccine") {
        let dateFrom, dateTo;
        switch (query["vaccine form-control"]) {
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
        return all.push({
          name: "dob",
          type: "between",
          value: [dateTo, dateFrom]
        });
      }
      if (query["searchCriteria form-control"] == "State") {
        const lga = query["slga form-control"];
        if (lga !== "" && lga !== null && lga) {
          all.push({
            name: "lga",
            type: "equals",
            value: lga
          });
        }
        const state = query["soo form-control"];
        return all.push({
          name: "state",
          type: "equals",
          value: state
        });
      }

      if (query["searchCriteria form-control"] == "Lga") {
        const lga = query["slga form-control"];
        return all.push({
          name: "lga",
          type: "equals",
          value: lga
        });
      }

      // return console.log('done!',all)
    });
    // console.log("done!", all);
    // return alert("done!", all);
    let recipients = [];
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
    const response = await res.json();
    console.log(response);
    if (!res.ok) {
      this.setState({ total: 0, recipients });
      this.noData("No results found!");
      return;
    }

    this.setState({ total: response.data.length });
    response.data.map(datum => {
      return recipients.push(datum.phonenumber);
    });
    this.setState({ recipients });
    this.retrievedData(`${response.data.length} results found`);
    return;
    // if (this.state.searchCriteria == "Vaccine") {
    //   switch (this.state.vaccine) {
    //     case "BCG":
    //     case "HBV 1":
    //     case "OPV":
    //       console.log("hello");
    //       dateFrom = moment()
    //         .subtract(7, "days")
    //         .startOf("week")
    //         .toISOString();
    //       dateTo = moment().toISOString();
    //       break;

    //     case "OPV 1":
    //     case "PCV 1":
    //     case "Rotarix 1":
    //     case "Pentavalent 1":
    //       dateFrom = moment()
    //         .subtract(6, "weeks")
    //         .startOf("week")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(6, "weeks")
    //         .endOf("weeks")
    //         .toISOString();
    //       break;

    //     case "OPV 2":
    //     case "Rotarix 2":
    //     case "PCV 2":
    //     case "Pentavalent 2":
    //       dateFrom = moment()
    //         .subtract(10, "weeks")
    //         .startOf("week")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(10, "weeks")
    //         .endOf("week")
    //         .toISOString();
    //       break;

    //     case "OPV 3":
    //     case "PCV 3":
    //     case "IPV":
    //     case "Pentavalent 3":
    //       dateFrom = moment()
    //         .subtract(14, "weeks")
    //         .startOf("week")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(14, "weeks")
    //         .endOf("week")
    //         .toISOString();
    //       break;

    //     case "Vitamin A1":
    //       dateFrom = moment()
    //         .subtract(6, "months")
    //         .startOf("month")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(6, "months")
    //         .endOf("month")
    //         .toISOString();
    //       break;

    //     case "Measles Vaccine":
    //     case "Yellow Fever Vaccine":
    //       dateFrom = moment()
    //         .subtract(9, "months")
    //         .startOf("month")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(9, "months")
    //         .endOf("month")
    //         .toISOString();
    //       break;

    //     case "Meningitis Vaccine":
    //     case "Vitamin A2":
    //     case "OPV booster":
    //       dateFrom = moment()
    //         .subtract(12, "months")
    //         .toISOString();
    //       dateTo = moment()
    //         .endOf("weeks")
    //         .toISOString();
    //       break;

    //     case "Measles 2":
    //       dateFrom = moment()
    //         .subtract(18, "months")
    //         .startOf("month")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(12, "months")
    //         .endOf("month")
    //         .toISOString();
    //       break;

    //     case "Typhoid Vaccine":
    //       dateFrom = moment()
    //         .subtract(24, "months")
    //         .startOf("month")
    //         .toISOString();
    //       dateTo = moment()
    //         .subtract(24, "months")
    //         .endOf("month")
    //         .toISOString();
    //       break;
    //   }
    // } else if (this.state.searchCriteria == "Gender") {
    //   if (this.state.gender != "") {
    //     const token = sessionStorage.getItem("token");
    //     const res = await fetch(`${url}?search=${this.state.gender}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     if (res.ok) {
    //       const { data } = await res.json();
    //       this.setState(
    //         { totalData: data.rows, message: "Data retrieved" },
    //         this.retrievedData
    //       );
    //       return;
    //     }
    //     this.setState({ totalData: [], error: "No data found" }, this.noData);
    //   }
    // } else if (this.state.searchCriteria == "Age") {
    //   console.log("hi");
    //   dateFrom = moment()
    //     .subtract(this.state.ageSearch, this.state.ageType)
    //     .startOf(this.state.ageType)
    //     .format("YYYY-MM-DD");
    //   dateTo = moment()
    //     .subtract(this.state.ageSearch, this.state.ageType)
    //     .endOf(this.state.ageType)
    //     .toISOString();
    // }

    // // console.log(this.state.searchCriteria, url);
    // const start = moment(dateFrom);
    // const end = moment(dateTo);
    // if (start.diff(end, "days") > 0) {
    //   this.setState({ error: "Please check the dates" }, this.noData);
    //   return;
    // }

    // if (dateFrom != "" && dateFrom != "") {
    //   const token = sessionStorage.getItem("token");
    //   await fetch(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //     .then(res => {
    //       if (res.status != 200) {
    //         this.setState(
    //           { totalData: [], error: "No data found" },
    //           this.noData
    //         );
    //         return;
    //       }
    //       return res.json();
    //     })
    //     .then(res => {
    //       console.log(res);
    //       const data = res.data.rows ? res.data.rows : res.data;
    //       this.setState(
    //         {
    //           totalData: data,
    //           message: "Data retrieved"
    //         },
    //         this.retrievedData
    //       );
    //     });
    //   return;
    // }
    // this.setState({ error: "Please select dates" }, this.noData);
  };

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
  toggleChange = e => {
    // e.preventDefault();
    this.setState({
      save: !this.state.save
    });
  };

  sendMessage = async e => {
    e.preventDefault();
    const { message } = this.state;
    if (message == "") {
      return;
    }
    const token = sessionStorage.getItem("token");
    const res = await fetch("https://api.remhealth.co/sms/new", {
      method: "POST",
      body: JSON.stringify({
        recipients: this.state.recipients,
        message: this.state.message,
        save: this.state.save
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const response = await res.json();
    if (!res.ok) {
      console.log(response.message)
      return this.noData('message not sent');
    }
    this.retrievedData(response.message)
  };

  buttonHandler = e => {
    e.preventDefault();
    this.setState({ activeSearch: !this.state.activeSearch });
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
            <Row>
              <Col md="12">
                <div md={12}>
                  <DynamicInputs
                    inputs={inputs}
                    onChangeHandler={this.onChangeHandler}
                    role={role}
                  />
                </div>
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
                Total Recipients: {this.state.total}
                <Card className="main-card mb-3">
                  <div className="table-responsive">
                    <Row>
                      <Col md="1"></Col>
                      <Col md="3">
                        <Row
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                          <Label for="recipients">Recipients</Label>
                          <Input
                            value={this.state.recipients}
                            type="textarea"
                            disabled
                            name="recipients"
                            id="recipients"
                            onChange={this.onChangeHandler}
                            style={{ fontSize: "12px" }}
                            rows="6"
                          />
                        </Row>
                      </Col>
                      <Col md="1"></Col>
                      <Col md="6">
                        <Row
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                          <Label for="gender">Message</Label>
                          <Input
                            value={this.state.message}
                            type="textarea"
                            required
                            name="message"
                            id="message"
                            rows="6"
                            onChange={this.onChangeHandler}
                          />
                        </Row>
                        <Row
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                          {/* <Col md="6">
                            <input
                              type="checkbox"
                              name="save"
                              checked={this.state.save}
                              onChange={this.toggleChange}
                            />{" "}

                            <label for="save">Save Message</label>
                          </Col> */}
                          <Col md="6">
                            <Button
                              onClick={this.sendMessage}
                              disabled={
                                this.state.recipients.length < 1 || this.state.message == ""
                              }
                              color="success"
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px"
                              }}
                              onChange={this.onChangeHandler}
                            >
                              Send
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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
