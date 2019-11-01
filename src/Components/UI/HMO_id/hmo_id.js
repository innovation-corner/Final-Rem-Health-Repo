import React, { Component, Fragment } from "react";
import moment from "moment";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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

export default class Data extends Component {
  state = {
    data: {},
    loading: false,
    adminName: "",
    email: "",
    address: "",
    phonenumber: "",
    dob: "",
    name: "",
    gender: "",
    disableState: true,
    disableInput: true,
    button: "Edit",
    date: "Text",
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
    cancel: false
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
    const response = await fetch(`https://api.remhealth.co/hmo/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const { hmo } = await response.json();
    console.log(hmo);
    const { createdAt, name, admin, address } = hmo;

    await this.setState({
      email: admin.email,
      dob: createdAt,
      id,
      address,
      name,
      adminName: admin.name,
      phonenumber: admin.phonenumber
    });
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
        name: this.state.name,
        address: this.state.address
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

            const { name, address } = data;

            this.setState({
              name,
              address
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ error: err.message }, this.loginError);
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
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle style={{ textAlign: "center" }}>
                      HMO Info
                    </CardTitle>
                    <Form>
                      <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="name"> Name</Label>
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
                                <Label for="dob">Date Of Registration</Label>
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
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="adminName">Admin</Label>
                                <Input
                                  value={this.state.adminName}
                                  type="text"
                                  name="adminName"
                                  id="adminName"
                                  onChange={this.onChangeHandler}
                                  disabled
                                />
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
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
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
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="address">Address</Label>
                                <Input
                                  value={this.state.address}
                                  type="text-area"
                                  name="address"
                                  id="address"
                                  placeholder="address"
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
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
