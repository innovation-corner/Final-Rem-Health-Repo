module.exports = {
  assignStateCode(state) {
    switch (state) {
      case "Abia":
        return (stateCode = "AB");
      case "Akwa Ibom":
        return (stateCode = "Ak");
      case "Anambra":
        return (stateCode = "AN");
      case "Bayelsa":
        return (stateCode = "BA");
      case "Bauchi":
        return (stateCode = "BU");
      case "Benue":
        return (stateCode = "BE");
      case "Borno":
        return (stateCode = "BO");
      case "Cross River":
        return (stateCode = "CR");
      case "Delta":
        return (stateCode = "DE");
      case "Ebonyi":
        return (stateCode = "EB");
      case "Edo":
        return (stateCode = "ED");
      case "Ekiti":
        return (stateCode = "EK");
      case "Enugu":
        return (stateCode = "EN");
      case "Gombe":
        return (stateCode = "GO");
      case "Imo":
        return (stateCode = "IM");
      case "Jigawa":
        return (stateCode = "JI");
      case "Kaduna":
        return (stateCode = "KD");
      case "Katsina":
        return (stateCode = "KS");
      case "Kano":
        return (stateCode = "KN");
      case "Kebbi":
        return (stateCode = "KB");
      case "Kogi":
        return (stateCode = "KG");
      case "Kwara":
        return (stateCode = "KW");
      case "Lagos":
        return (stateCode = "LA");
      case "Nassarawa":
        return (stateCode = "NS");
      case "Niger":
        return (stateCode = "NG");
      case "Ogun":
        return (stateCode = "OG");
      case "Ondo":
        return (stateCode = "OD");
      case "Osun":
        return (stateCode = "OS");
      case "Oyo":
        return (stateCode = "OY");
      case "Plateau":
        return (stateCode = "PL");
      case "Rivers":
        return (stateCode = "RV");
      case "Sokoto":
        return (stateCode = "SK");
      case "Taraba":
        return (stateCode = "TR");
      case "Yobe":
        return (stateCode = "YB");
      case "Zamfara":
        return (stateCode = "ZF");
      case "F.C.T":
        return (stateCode = "FCT");
    }
  },
  async assignLga(lga) {
    switch (lga) {
      // ABIA
      case "Aba North":
        return (lgaCode = "AN");
      case "Aba South":
        return (lgaCode = "AS");
      case "Arochukwu":
        return (lgaCode = "AR");
      case "Bende":
        return (lgaCode = "BE");
      case "Ikwuano":
        return (lgaCode = "IK");
      case "Isiala Ngwa North":
        return (lgaCode = "INN");
      case "Isiala Ngwa South":
        return (lgaCode = "INS");
      case "Isuikwuato":
        return (lgaCode = "ISA");
      case "Obi Ngwa":
        return (lgaCode = "ON");
      case "Ohafia":
        return (lgaCode = "OH");
      case "Osisioma":
        return (lgaCode = "OS");
      case "Ugwunagbo":
        return (lgaCode = "UG");
      case "Ukwa East":
        return (lgaCode = "UKE");
      case "Ukwa West":
        return (lgaCode = "UKW");
      case "Umuahia North":
        return (lgaCode = "UMN");
      case "Umuahia South":
        return (lgaCode = "UMS");
      case "Umu Nneochi":
        return (lgaCode = "UMN");

      // ADAMAWA
      case "Demsa":
        return (lgaCode = "DE");
      case "Fufure":
        return (lgaCode = "FU");
      case "Ganye":
        return (lgaCode = "GN");
      case "Gayuk":
        return (lgaCode = "GAY");
      case "Gombi":
        return (lgaCode = "GO");
      case "Grie":
        return (lgaCode = "GR");
      case "Hong":
        return (lgaCode = "HO");
      case "Jada":
        return (lgaCode = "JD");
      case "Larmurde":
        return (lgaCode = "LM");
      case "Madagali":
        return (lgaCode = "MG");
      case "Maiha":
        return (lgaCode = "MA");
      case "Mayo Belwa":
        return (lgaCode = "MB");
      case "Michika":
        return (lgaCode = "MC");
      case "Mubi North":
        return (lgaCode = "MUN");
      case "Mubi South":
        return (lgaCode = "MUS");
      case "Numan":
        return (lgaCode = "NU");
      case "Shelleng":
        return (lgaCode = "SH");
      case "Song":
        return (lgaCode = "SO");
      case "Toungo":
        return (lgaCode = "TO");
      case "Yola North":
        return (lgaCode = "YN");
      case "Yola South":
        return (lgaCode = "YS");

      //   Akwa Ibom

      case "Abak":
        return (lgaCode = "ABK");
      case "Eastern Obolo":
        return (lgaCode = "EOB");
      case "Eket":
        return (lgaCode = "EKT");
      case "Esit Eket":
        return (lgaCode = "ESE");
      case "Essien Udim":
        return (lgaCode = "ESU");
      case "Etim Ekpo":
        return (lgaCode = "ETE");
      case "Etinan":
        return (lgaCode = "ETI");
      case "Ibeno":
        return (lgaCode = "IBE");
      case "Ibesikpo Asutan":
        return (lgaCode = "");
      case "Ibiono-Ibom":
        return (lgaCode = "IBI");
      case "Ika":
        return (lgaCode = "IKA");
      case "Ikono":
        return (lgaCode = "IKO");
      case "Ikot Abasi":
        return (lgaCode = "IA");
      case "Ikot Ekpene":
        return (lgaCode = "IE");
      case "Ini":
        return (lgaCode = "INI");
      case "Itu":
        return (lgaCode = "ITU");
      case "Mbo":
        return (lgaCode = "MBO");
      case "Mkpat-Enin":
        return (lgaCode = "MKE");
      case "Nsit-Atai":
        return (lgaCode = "NSA");
      case "Nsit-Ibom":
        return (lgaCode = "NSI");
      case "Nsit-Ubium":
        return (lgaCode = "NSU");
      case "Obot Akara":
        return (lgaCode = "OBA");
      case "Okobo":
        return (lgaCode = "OKO");
      case "Onna":
        return (lgaCode = "ONA");
      case "Oron":
        return (lgaCode = "ORO");
      case "Oruk Anam":
        return (lgaCode = "ORA");
      case "Udung-Uko":
        return (lgaCode = "UDU");
      case "Ukanafun":
        return (lgaCode = "UKU");
      case "Uruan":
        return (lgaCode = "URU");
      case "Urue-Offong Oruko":
        return (lgaCode = "UOO");
      case "Uyo":
        return (lgaCode = "UYO");

      //   ANAMBRA

      case "Aguata":
        return (lgaCode = "AG");
      case "Anambra East":
        return (lgaCode = "ANE");
      case "Anambra West":
        return (lgaCode = "ANW");
      case "Anaocha":
        return (lgaCode = "ANA");
      case "Awka North":
        return (lgaCode = "AWN");
      case "Awka South":
        return (lgaCode = "AWS");
      case "Ayamelum":
        return (lgaCode = "AYA");
      case "Dunukofia":
        return (lgaCode = "DUN");
      case "Ekwusigo":
        return (lgaCode = "EKW");
      case "Idemili North":
        return (lgaCode = "IDN");
      case "Idemili South":
        return (lgaCode = "IDS");
      case "Ihiala":
        return (lgaCode = "IHI");
      case "Njikoka":
        return (lgaCode = "NJI");
      case "Nnewi North":
        return (lgaCode = "NN");
      case "Nnewi South":
        return (lgaCode = "NS");
      case "Ogbaru":
        return (lgaCode = "OG");
      case "Onitsha North":
        return (lgaCode = "ONN");
      case "Onitsha South":
        return (lgaCode = "ONS");
      case "Orumba North":
        return (lgaCode = "ORN");
      case "Orumba South":
        return (lgaCode = "ORS");
      case "Oyi":
        return (lgaCode = "OYI");

      // Bauchi
      case "Alkaleri":
        return (lgaCode = "ALK");
      case "Bauchi":
        return (lgaCode = "BAU");
      case "Bogoro":
        return (lgaCode = "BOG");
      case "Damban":
        return (lgaCode = "DAM");
      case "Darazo":
        return (lgaCode = "DAR");
      case "Dass":
        return (lgaCode = "DAS");
      case "Gamawa":
        return (lgaCode = "GAM");
      case "Ganjuwa":
        return (lgaCode = "GAN");
      case "Giade":
        return (lgaCode = "GIA");
      case "Itas-Gadau":
        return (lgaCode = "ITG");
      case "Jama are":
        return (lgaCode = "JAA");
      case "Katagum":
        return (lgaCode = "KAT");
      case "Kirfi":
        return (lgaCode = "KIR");
      case "Misau":
        return (lgaCode = "MIS");
      case "Ningi":
        return (lgaCode = "NIN");
      case "Shira":
        return (lgaCode = "SHI");
      case "Tafawa Balewa":
        return (lgaCode = "TAB");
      case " Toro":
        return (lgaCode = "TOR");
      case " Warji":
        return (lgaCode = "WAR");
      case " Zaki":
        return (lgaCode = "ZAK");

      // BAYELSA

      case "Brass":
        return (lgaCode = "BRS");
      case "Ekeremor":
        return (lgaCode = "EKE");
      case "Kolokuma Opokuma":
        return (lgaCode = "KOL");
      case "Nembe":
        return (lgaCode = "NEM");
      case "Ogbia":
        return (lgaCode = "OGB");
      case "Sagbama":
        return (lgaCode = "SAG");
      case "Southern Ijaw":
        return (lgaCode = "IJA");
      case "Yenagoa":
        return (lgaCode = "YEN");

      // BENUE

      case "Agatu":
        return (lgaCode = "AGA");
      case "Apa":
        return (lgaCode = "APA");
      case "Ado":
        return (lgaCode = "ADO");
      case "Buruku":
        return (lgaCode = "BUR");
      case "Gboko":
        return (lgaCode = "GBO");
      case "Guma":
        return (lgaCode = "GUM");
      case "Gwer East":
        return (lgaCode = "GWE");
      case "Gwer West":
        return (lgaCode = "GWW");
      case "Katsina-Ala":
        return (lgaCode = "KAA");
      case "Konshisha":
        return (lgaCode = "KON");
      case "Kwande":
        return (lgaCode = "KWA");
      case "Logo":
        return (lgaCode = "LOG");
      case "Makurdi":
        return (lgaCode = "MAK");
      case "Obi":
        return (lgaCode = "OBI");
      case "Ogbadibo":
        return (lgaCode = "OGB");
      case "Ohimini":
        return (lgaCode = "OHI");
      case "Oju":
        return (lgaCode = "OJU");
      case "Okpokwu":
        return (lgaCode = "OKP");
      case "Oturkpo":
        return (lgaCode = "OTU");
      case "Tarka":
        return (lgaCode = "TAR");
      case "Ukum":
        return (lgaCode = "UKU");
      case "Ushongo":
        return (lgaCode = "USH");
      case "Vandeikya":
        return (lgaCode = "VAN");

      // BORNO
      case "Abadam":
        return (lgaCode = "ABA");
      case "Askira-Uba":
        return (lgaCode = "ASK");
      case "Bama":
        return (lgaCode = "BAM");
      case "Bayo":
        return (lgaCode = "BAY");
      case "Biu":
        return (lgaCode = "BIU");
      case "Chibok":
        return (lgaCode = "CHI");
      case "Damboa":
        return (lgaCode = "DAM");
      case "Dikwa":
        return (lgaCode = "DIK");
      case "Gubio":
        return (lgaCode = "GUB");
      case "Guzamala":
        return (lgaCode = "GUZ");
      case "Gwoza":
        return (lgaCode = "GWO");
      case "Hawul":
        return (lgaCode = "HAW");
      case "Jere":
        return (lgaCode = "JER");
      case "Kaga":
        return (lgaCode = "KAG");
      case "Kala-Balge":
        return (lgaCode = "KAL");
      case "Konduga":
        return (lgaCode = "KON");
      case "Kukawa":
        return (lgaCode = "KUK");
      case "Kwaya Kusar":
        return (lgaCode = "KWK");
      case "Mafa":
        return (lgaCode = "MAF");
      case "Magumeri":
        return (lgaCode = "MAG");
      case "Maiduguri":
        return (lgaCode = "MAD");
      case "Marte":
        return (lgaCode = "MAR");
      case "Mobbar":
        return (lgaCode = "MOB");
      case "Monguno":
        return (lgaCode = "MON");
      case "Ngala":
        return (lgaCode = "NGA");
      case "Nganzai":
        return (lgaCode = "NGZ");
      case "Shani":
        return (lgaCode = "SHA");

      // CROSS RIVER

      case "Abi":
        return (lgaCode = "ABI");
      case "Akamkpa":
        return (lgaCode = "AKA");
      case "Akpabuyo":
        return (lgaCode = "AKP");
      case "Bakassi":
        return (lgaCode = "BAK");
      case "Bekwarra":
        return (lgaCode = "BEK");
      case "Biase":
        return (lgaCode = "BIA");
      case "Boki":
        return (lgaCode = "BOK");
      case "Calabar Municipal":
        return (lgaCode = "CAM");
      case "Calabar South":
        return (lgaCode = "CAS");
      case "Etung":
        return (lgaCode = "ETU");
      case "Ikom":
        return (lgaCode = "IK");
      case "Obanliku":
        return (lgaCode = "OBA");
      case "Obubra":
        return (lgaCode = "OBU");
      case "Obudu":
        return (lgaCode = "OBD");
      case "Odukpani":
        return (lgaCode = "ODU");
      case "Ogoja":
        return (lgaCode = "OGO");
      case "Yakuur":
        return (lgaCode = "YAK");
      case "Yala":
        return (lgaCode = "YAL");

      // DELTA

      case "Aniocha North":
        return (lgaCode = "ANN");
      case "Aniocha South":
        return (lgaCode = "ANS");
      case "Bomadi":
        return (lgaCode = "BOM");
      case "Burutu":
        return (lgaCode = "BUR");
      case "Ethiope East":
        return (lgaCode = "ETE");
      case "Ethiope West":
        return (lgaCode = "ETW");
      case "Ika North East":
        return (lgaCode = "INE");
      case "Ika South":
        return (lgaCode = "IKS");
      case "Isoko North":
        return (lgaCode = "ISN");
      case "Isoko South":
        return (lgaCode = "ISS");
      case "Ndokwa East":
        return (lgaCode = "NDE");
      case "Ndokwa West":
        return (lgaCode = "NDW");
      case "Okpe":
        return (lgaCode = "OKP");
      case "Oshimili North":
        return (lgaCode = "OSN");
      case "Oshimili South":
        return (lgaCode = "OSS");
      case "Patani":
        return (lgaCode = "PAT");
      case "Sapele":
        return (lgaCode = "SAP");
      case "Udu":
        return (lgaCode = "UDU");
      case "Ughelli North":
        return (lgaCode = "UGN");
      case "Ughelli South":
        return (lgaCode = "UGS");
      case "Ukwuani":
        return (lgaCode = "UKW");
      case "Uvwie":
        return (lgaCode = "UVW");
      case "Warri North":
        return (lgaCode = "WAN");
      case "Warri South":
        return (lgaCode = "WAS");
      case "Warri South West":
        return (lgaCode = "WSW");

      //   EBONYI
      case "Abakaliki":
        return (lgaCode = "ABA");
      case "Afikpo North":
        return (lgaCode = "AFN");
      case "Afikpo South":
        return (lgaCode = "AFS");
      case "Ebonyi":
        return (lgaCode = "EBO");
      case "Ezza North":
        return (lgaCode = "EN");
      case "Ezza South":
        return (lgaCode = "ES");
      case "Ikwo":
        return (lgaCode = "IK");
      case "Ishielu":
        return (lgaCode = "ISH");
      case "Ivo":
        return (lgaCode = "IVO");
      case "Izzi":
        return (lgaCode = "IZZ");
      case "Ohaozara":
        return (lgaCode = "OHO");
      case "Ohaukwu":
        return (lgaCode = "OHU");
      case "Onicha":
        return (lgaCode = "ONI");

      // EDO
      case "Akoko-Edo":
        return (lgaCode = "AKE");
      case "Egor":
        return (lgaCode = "EGO");
      case "Esan Central":
        return (lgaCode = "ESC");
      case "Esan North-East":
        return (lgaCode = "ENE");
      case "Esan South-East":
        return (lgaCode = "ESE");
      case "Esan West":
        return (lgaCode = "ESW");
      case "Etsako Central":
        return (lgaCode = "ETC");
      case "Etsako East":
        return (lgaCode = "ETE");
      case "Etsako West":
        return (lgaCode = "ETW");
      case "Igueben":
        return (lgaCode = "IGU");
      case "Ikpoba Okha":
        return (lgaCode = "IKO");
      case "Orhionmwon":
        return (lgaCode = "ORH");
      case "Oredo":
        return (lgaCode = "ORE");
      case "Ovia North-East":
        return (lgaCode = "ONE");
      case "Ovia South-West":
        return (lgaCode = "OSW");
      case "Owan East":
        return (lgaCode = "OWE");
      case "Owan West":
        return (lgaCode = "OWW");
      case "Uhunmwonde":
        return (lgaCode = "UHU");

      // EKITI
      case "Ado Ekiti":
        return (lgaCode = "ADE");
      case "Efon":
        return (lgaCode = "EFO");
      case "Ekiti East":
        return (lgaCode = "EKE");
      case "Ekiti South-West":
        return (lgaCode = "ESW");
      case "Ekiti West":
        return (lgaCode = "EW");
      case "Emure":
        return (lgaCode = "EMU");
      case "Gbonyin":
        return (lgaCode = "GBO");
      case "Ido Osi":
        return (lgaCode = "IDO");
      case "Ijero":
        return (lgaCode = "IJE");
      case "Ikere":
        return (lgaCode = "IKE");
      case "Ikole":
        return (lgaCode = "IKO");
      case "Ilejemeje":
        return (lgaCode = "ILE");
      case "Irepodun-Ifelodun":
        return (lgaCode = "IRI");
      case "Ise-Orun":
        return (lgaCode = "ISO");
      case "Moba":
        return (lgaCode = "MOB");
      case "Oye":
        return (lgaCode = "OYE");

      // ENUGU
      case "Aninri":
        return (lgaCode = "ANI");
      case "Awgu":
        return (lgaCode = "AG");
      case "Enugu East":
        return (lgaCode = "EE");
      case "Enugu North":
        return (lgaCode = "EN");
      case "Enugu South":
        return (lgaCode = "ES");
      case "Ezeagu":
        return (lgaCode = "EZ");
      case "Igbo Etiti":
        return (lgaCode = "IGE");
      case "Igbo Eze North":
        return (lgaCode = "IEN");
      case "Igbo Eze South":
        return (lgaCode = "IES");
      case "Isi Uzo":
        return (lgaCode = "IU");
      case "Nkanu East":
        return (lgaCode = "NKE");
      case "Nkanu West":
        return (lgaCode = "NKW");
      case "Nsukka":
        return (lgaCode = "NSK");
      case "Oji River":
        return (lgaCode = "OJR");
      case "Udenu":
        return (lgaCode = "UDE");
      case "Udi":
        return (lgaCode = "UDI");
      case "Uzo Uwani":
        return (lgaCode = "UZU");

      //GOMBE
      case "Akko":
        return (lgaCode = "AK");
      case "Balanga":
        return (lgaCode = "BAL");
      case "Billiri":
        return (lgaCode = "BIL");
      case "Dukku":
        return (lgaCode = "DUK");
      case "Funakaye":
        return (lgaCode = "FUN");
      case "Gombe":
        return (lgaCode = "GOM");
      case "Kaltungo":
        return (lgaCode = "KAL");
      case "Kwami":
        return (lgaCode = "KWA");
      case "Nafada":
        return (lgaCode = "NAF");
      case "Shongom":
        return (lgaCode = "SHO");
      case "Yamaltu-Deba":
        return (lgaCode = "YD");

      // IMO
      case "Aboh Mbaise":
        return (lgaCode = "ABM");
      case "Ahiazu Mbaise":
        return (lgaCode = "AHM");
      case "Ehime Mbano":
        return (lgaCode = "EM");
      case "Ezinihitte":
        return (lgaCode = "EZ");
      case "Ideato North":
        return (lgaCode = "IDN");
      case "Ideato South":
        return (lgaCode = "IDS");
      case "Ihitte-Uboma":
        return (lgaCode = "IHU");
      case "Ikeduru":
        return (lgaCode = "IKE");
      case "Isiala Mbano":
        return (lgaCode = "ISM");
      case "Isu":
        return (lgaCode = "ISU");
      case "Mbaitoli":
        return (lgaCode = "MBA");
      case "Ngor Okpala":
        return (lgaCode = "NGO");
      case "Njaba":
        return (lgaCode = "NJA");
      case "Nkwerre":
        return (lgaCode = "NKW");
      case "Nwangele":
        return (lgaCode = "NWA");
      case "Obowo":
        return (lgaCode = "OBO");
      case "Oguta":
        return (lgaCode = "OGU");
      case "Ohaji-Egbema":
        return (lgaCode = "OHE");
      case "Okigwe":
        return (lgaCode = "OKI");
      case "Orlu":
        return (lgaCode = "ORL");
      case "Orsu":
        return (lgaCode = "ORS");
      case "Oru East":
        return (lgaCode = "ORE");
      case "Oru West":
        return (lgaCode = "ORW");
      case "Owerri Municipal":
        return (lgaCode = "OWM");
      case "Owerri North":
        return (lgaCode = "OWN");
      case "Owerri West":
        return (lgaCode = "OWW");
      case "Unuimo":
        return (lgaCode = "UNU");

      // JIGAWA
      case "Auyo":
        return (lgaCode = "AUY");
      case "Babura":
        return (lgaCode = "BAB");
      case "Biriniwa":
        return (lgaCode = "BII");
      case "Birnin Kudu":
        return (lgaCode = "BIK");
      case "Buji":
        return (lgaCode = "BUJ");
      case "Dutse":
        return (lgaCode = "DUT");
      case "Gagarawa":
        return (lgaCode = "GAG");
      case "Garki":
        return (lgaCode = "GAR");
      case "Gumel":
        return (lgaCode = "GUM");
      case "Guri":
        return (lgaCode = "GUR");
      case "Gwaram":
        return (lgaCode = "GWR");
      case "Gwiwa":
        return (lgaCode = "GWI");
      case "Hadejia":
        return (lgaCode = "HAD");
      case "Jahun":
        return (lgaCode = "JAH");
      case "Kafin Hausa":
        return (lgaCode = "KAH");
      case "Kazaure":
        return (lgaCode = "KAZ");
      case "Kiri Kasama":
        return (lgaCode = "KIK");
      case "Kiyawa":
        return (lgaCode = "KIY");
      case "Kaugama":
        return (lgaCode = "KAU");
      case "Maigatari":
        return (lgaCode = "MAI");
      case "Malam Madori":
        return (lgaCode = "MAL");
      case "Miga":
        return (lgaCode = "MIG");
      case "Ringim":
        return (lgaCode = "RIN");
      case "Roni":
        return (lgaCode = "RON");
      case "Sule Tankarkar":
        return (lgaCode = "SUT");
      case "Taura":
        return (lgaCode = "TAU");
      case "Yankwashi":
        return (lgaCode = "YAN");

      // KADUNA
      case "Birnin Gwari":
        return (lgaCode = "BIG");
      case "Chikun":
        return (lgaCode = "CHI");
      case "Giwa":
        return (lgaCode = "GIW");
      case "Igabi":
        return (lgaCode = "IGA");
      case "Ikara":
        return (lgaCode = "IKA");
      case "Jaba":
        return (lgaCode = "JAB");
      case "Jema'a":
        return (lgaCode = "JEM");
      case "Kachia":
        return (lgaCode = "KAC");
      case "Kaduna North":
        return (lgaCode = "KAN");
      case "Kaduna South":
        return (lgaCode = "KAS");
      case "Kagarko":
        return (lgaCode = "KAG");
      case "Kajuru":
        return (lgaCode = "KAJ");
      case "Kaura":
        return (lgaCode = "KAA");
      case "Kauru":
        return (lgaCode = "KAU");
      case "Kubau":
        return (lgaCode = "KUB");
      case "Kudan":
        return (lgaCode = "KUD");
      case "Lere":
        return (lgaCode = "LER");
      case "Makarfi":
        return (lgaCode = "MAK");
      case "Sabon Gari":
        return (lgaCode = "SAB");
      case "Sanga":
        return (lgaCode = "SAN");
      case "Soba":
        return (lgaCode = "SOB");
      case "Zangon Kataf":
        return (lgaCode = "ZAK");
      case "Zaria":
        return (lgaCode = "ZAR");

      // KANO
      case "Ajingi":
        return (lgaCode = "AJI");
      case "Albasu":
        return (lgaCode = "ALB");
      case "Bagwai":
        return (lgaCode = "BAG");
      case "Bebeji":
        return (lgaCode = "BEB");
      case "Bichi":
        return (lgaCode = "BIC");
      case "Bunkure":
        return (lgaCode = "BUN");
      case "Dala":
        return (lgaCode = "DAL");
      case "Dambatta":
        return (lgaCode = "DAM");
      case "Dawakin Kudu":
        return (lgaCode = "DAK");
      case "Dawakin Tofa":
        return (lgaCode = "DAT");
      case "Doguwa":
        return (lgaCode = "DOG");
      case "Fagge":
        return (lgaCode = "FAG");
      case "Gabasawa":
        return (lgaCode = "GAB");
      case "Garko":
        return (lgaCode = "GAK");
      case "Garun Mallam":
        return (lgaCode = "GAM");
      case "Gaya":
        return (lgaCode = "GAY");
      case "Gezawa":
        return (lgaCode = "GEZ");
      case "Gwale":
        return (lgaCode = "GWL");
      case "Gwarzo":
        return (lgaCode = "");
      case "Kabo":
        return (lgaCode = "KAB");
      case "Kano Municipal":
        return (lgaCode = "");
      case "Karaye":
        return (lgaCode = "KAM");
      case "Kibiya":
        return (lgaCode = "KIB");
      case "Kiru":
        return (lgaCode = "KIR");
      case "Kumbotso":
        return (lgaCode = "KUM");
      case "Kunchi":
        return (lgaCode = "KUN");
      case "Kura":
        return (lgaCode = "KUR");
      case "Madobi":
        return (lgaCode = "MAD");
      case "Makoda":
        return (lgaCode = "MAK");
      case "Minjibir":
        return (lgaCode = "MIN");
      case "Nasarawa":
        return (lgaCode = "NAS");
      case "Rano":
        return (lgaCode = "RAN");
      case "Rimin Gado":
        return (lgaCode = "RIM");
      case "Rogo":
        return (lgaCode = "ROG");
      case "Shanono":
        return (lgaCode = "SHA");
      case "Sumaila":
        return (lgaCode = "SUM");
      case "Takai":
        return (lgaCode = "TAK");
      case "Tarauni":
        return (lgaCode = "TAR");
      case "Tofa":
        return (lgaCode = "TOF");
      case "Tsanyawa":
        return (lgaCode = "TSA");
      case "Tudun Wada":
        return (lgaCode = "TUD");
      case "Ungogo":
        return (lgaCode = "UNG");
      case "Warawa":
        return (lgaCode = "WAR");
      case "Wudil":
        return (lgaCode = "WUD");

      // KATSINA
      case "Bakori":
        return (lgaCode = "BAK");
      case "Batagarawa":
        return (lgaCode = "BAG");
      case "Batsari":
        return (lgaCode = "BAT");
      case "Baure":
        return (lgaCode = "BAU");
      case "Bindawa":
        return (lgaCode = "BIN");
      case "Charanchi":
        return (lgaCode = "CHA");
      case "Dandume":
        return (lgaCode = "DAN");
      case "Danja":
        return (lgaCode = "DAJ");
      case "Dan Musa":
        return (lgaCode = "DAM");
      case "Daura":
        return (lgaCode = "DAU");
      case "Dutsi":
        return (lgaCode = "DUT");
      case "Dutsin Ma":
        return (lgaCode = "DUM");
      case "Faskari":
        return (lgaCode = "FAS");
      case "Funtua":
        return (lgaCode = "FUN");
      case "Ingawa":
        return (lgaCode = "ING");
      case "Jibia":
        return (lgaCode = "JIB");
      case "Kafur":
        return (lgaCode = "KAF");
      case "Kaita":
        return (lgaCode = "KAI");
      case "Kankara":
        return (lgaCode = "KAN");
      case "Kankia":
        return (lgaCode = "KAK");
      case "Katsina":
        return (lgaCode = "KAT");
      case "Kurfi":
        return (lgaCode = "KUR");
      case "Kusada":
        return (lgaCode = "KUS");
      case "Mai Adua":
        return (lgaCode = "MAI");
      case "Malumfashi":
        return (lgaCode = "MAL");
      case "Mani":
        return (lgaCode = "MAN");
      case "Mashi":
        return (lgaCode = "MAS");
      case "Matazu":
        return (lgaCode = "MAT");
      case "Musawa":
        return (lgaCode = "MUS");
      case "Rimi":
        return (lgaCode = "RIM");
      case "Sabuwa":
        return (lgaCode = "SAB");
      case "Safana":
        return (lgaCode = "SAF");
      case "Sandamu":
        return (lgaCode = "SAN");
      case "Zango":
        return (lgaCode = "ZAN");

      // KEBBI
      case "Aleiro":
        return (lgaCode = "ALE");
      case "Arewa Dandi":
        return (lgaCode = "ARE");
      case "Argungu":
        return (lgaCode = "ARG");
      case "Augie":
        return (lgaCode = "AUG");
      case "Bagudo":
        return (lgaCode = "BAG");
      case "Birnin Kebbi":
        return (lgaCode = "BIK");
      case "Bunza":
        return (lgaCode = "BUN");
      case "Dandi":
        return (lgaCode = "DAN");
      case "Fakai":
        return (lgaCode = "FAK");
      case "Gwandu":
        return (lgaCode = "GWA");
      case "Jega":
        return (lgaCode = "JEG");
      case "Kalgo":
        return (lgaCode = "KAL");
      case "Koko Besse":
        return (lgaCode = "KOB");
      case "Maiyama":
        return (lgaCode = "MAI");
      case "Ngaski":
        return (lgaCode = "NGA");
      case "Sakaba":
        return (lgaCode = "SAK");
      case "Shanga":
        return (lgaCode = "SHA");
      case "Suru":
        return (lgaCode = "SUR");
      case "Wasagu Danko":
        return (lgaCode = "WAS");
      case "Yauri":
        return (lgaCode = "YAU");
      case "Zuru":
        return (lgaCode = "ZUR");

      // KOGI

      case "Adavi":
        return (lgaCode = "ADA");
      case "Ajaokuta":
        return (lgaCode = "AJA");
      case "Ankpa":
        return (lgaCode = "ANK");
      case "Bassa":
        return (lgaCode = "BAS");
      case "Dekina":
        return (lgaCode = "DEK");
      case "Ibaji":
        return (lgaCode = "IBA");
      case "Idah":
        return (lgaCode = "IDA");
      case "Igalamela Odolu":
        return (lgaCode = "IGA");
      case "Ijumu":
        return (lgaCode = "IJU");
      case "Kabba Bunu":
        return (lgaCode = "KAB");
      case "Kogi":
        return (lgaCode = "KOG");
      case "Lokoja":
        return (lgaCode = "LOK");
      case "Mopa Muro":
        return (lgaCode = "MOP");
      case "Ofu":
        return (lgaCode = "OFU");
      case "Ogori Magongo":
        return (lgaCode = "OGO");
      case "Okehi":
        return (lgaCode = "OKH");
      case "Okene":
        return (lgaCode = "OKN");
      case "Olamaboro":
        return (lgaCode = "OLA");
      case "Omala":
        return (lgaCode = "OMA");
      case "Yagba East":
        return (lgaCode = "YAE");
      case "Yagba West":
        return (lgaCode = "YAW");

      // KWARA

      case "Asa":
        return (lgaCode = "ASA");
      case "Baruten":
        return (lgaCode = "BAR");
      case "Edu":
        return (lgaCode = "EDU");
      case "Ekiti":
        return (lgaCode = "EKI");
      case "Ifelodun":
        return (lgaCode = "IFE");
      case "Ilorin East":
        return (lgaCode = "ILE");
      case "Ilorin South":
        return (lgaCode = "ILS");
      case "Ilorin West":
        return (lgaCode = "ILW");
      case "Irepodun":
        return (lgaCode = "IRE");
      case "Isin":
        return (lgaCode = "ISI");
      case "Kaiama":
        return (lgaCode = "KAI");
      case "Moro":
        return (lgaCode = "MOR");
      case "Offa":
        return (lgaCode = "OFF");
      case "Oke Ero":
        return (lgaCode = "OKE");
      case "Oyun":
        return (lgaCode = "OYU");
      case "Pategi":
        return (lgaCode = "PAT");

      // LAGOS
      case "Agege":
        return (lgaCode = "AGE");
      case "Ajeromi-Ifelodun":
        return (lgaCode = "AJE");
      case "Alimosho":
        return (lgaCode = "ALI");
      case "Amuwo-Odofin":
        return (lgaCode = "AMU");
      case "Apapa":
        return (lgaCode = "APA");
      case "Badagry":
        return (lgaCode = "BAD");
      case "Epe":
        return (lgaCode = "EPE");
      case "Eti Osa":
        return (lgaCode = "ETI");
      case "Ibeju-Lekki":
        return (lgaCode = "IBE");
      case "Ifako-Ijaiye":
        return (lgaCode = "IFA");
      case "Ikeja":
        return (lgaCode = "KJA");
      case "Ikorodu":
        return (lgaCode = "IKR");
      case "Kosofe":
        return (lgaCode = "KOO");
      case "Lagos Island":
        return (lgaCode = "LAI");
      case "Lagos Mainland":
        return (lgaCode = "LAM");
      case "Mushin":
        return (lgaCode = "MUS");
      case "Ojo":
        return (lgaCode = "OJO");
      case "Oshodi-Isolo":
        return (lgaCode = "OSH");
      case "Shomolu":
        return (lgaCode = "SHO");
      case "Surulere":
        return (lgaCode = "SUR");

      // NASARRAWA
      case "Akwanga":
        return (lgaCode = "AKW");
      case "Awe":
        return (lgaCode = "AWE");
      case "Doma":
        return (lgaCode = "DOM");
      case "Karu":
        return (lgaCode = "KAR");
      case "Keana":
        return (lgaCode = "KEA");
      case "Keffi":
        return (lgaCode = "KEF");
      case "Kokona":
        return (lgaCode = "KOK");
      case "Lafia":
        return (lgaCode = "LFA");
      case "Nasarawa":
        return (lgaCode = "NAS");
      case "Nasarawa Egon":
        return (lgaCode = "NAE");
      case "Obi":
        return (lgaCode = "OBI");
      case "Toto":
        return (lgaCode = "TOT");
      case "Wamba":
        return (lgaCode = "WAM");

      // NIGER

      case "Agaie":
        return (lgaCode = "AGA");
      case "Agwara":
        return (lgaCode = "AGW");
      case "Bida":
        return (lgaCode = "BID");
      case "Borgu":
        return (lgaCode = "BOR");
      case "Bosso":
        return (lgaCode = "BOS");
      case "Chanchaga":
        return (lgaCode = "CHA");
      case "Edati":
        return (lgaCode = "EDA");
      case "Gbako":
        return (lgaCode = "GBA");
      case "Gurara":
        return (lgaCode = "GUR");
      case "Katcha":
        return (lgaCode = "KAT");
      case "Kontagora":
        return (lgaCode = "KON");
      case "Lapai":
        return (lgaCode = "LAP");
      case "Lavun":
        return (lgaCode = "LAV");
      case "Magama":
        return (lgaCode = "MAG");
      case "Mariga":
        return (lgaCode = "");
      case "Mashegu":
        return (lgaCode = "MAR");
      case "Mokwa":
        return (lgaCode = "MOK");
      case "Moya":
        return (lgaCode = "MOY");
      case "Paikoro":
        return (lgaCode = "PAI");
      case "Rafi":
        return (lgaCode = "RAF");
      case "Rijau":
        return (lgaCode = "RIJ");
      case "Shiroro":
        return (lgaCode = "SHI");
      case "Suleja":
        return (lgaCode = "SUL");
      case "Tafa":
        return (lgaCode = "TAF");
      case "Wushishi":
        return (lgaCode = "WUS");

      // OGUN

      case "Abeokuta North":
        return (lgaCode = "ABN");
      case "Abeokuta South":
        return (lgaCode = "ABS");
      case "Ado-Odo Ota":
        return (lgaCode = "AOO");
      case "Egbado North":
        return (lgaCode = "EGN");
      case "Egbado South":
        return (lgaCode = "EGS");
      case "Ewekoro":
        return (lgaCode = "EWE");
      case "Ifo":
        return (lgaCode = "IFO");
      case "Ijebu East":
        return (lgaCode = "IJE");
      case "Ijebu North":
        return (lgaCode = "IJN");
      case "Ijebu North East":
        return (lgaCode = "INE");
      case "Ijebu Ode":
        return (lgaCode = "IJO");
      case "Ikenne":
        return (lgaCode = "IKE");
      case "Imeko Afon":
        return (lgaCode = "IME");
      case "Ipokia":
        return (lgaCode = "IPO");
      case "Obafemi Owode":
        return (lgaCode = "OBA");
      case "Odeda":
        return (lgaCode = "ODE");
      case "Odogbolu":
        return (lgaCode = "ODO");
      case "Ogun Waterside":
        return (lgaCode = "OGW");
      case "Remo North":
        return (lgaCode = "REM");
      case "Shagamu":
        return (lgaCode = "SHA");

      // ONDO
      case "Akoko North-East":
        return (lgaCode = "ANE");
      case "Akoko North-West":
        return (lgaCode = "ANW");
      case "Akoko South-West":
        return (lgaCode = "ASW");
      case "Akoko South-East":
        return (lgaCode = "ASE");
      case "Akure North":
        return (lgaCode = "AKN");
      case "Akure South":
        return (lgaCode = "AKS");
      case "Ese Odo":
        return (lgaCode = "ESE");
      case "Idanre":
        return (lgaCode = "IDA");
      case "Ifedore":
        return (lgaCode = "IFE");
      case "Ilaje":
        return (lgaCode = "ILA");
      case "Ile Oluji-Okeigbo":
        return (lgaCode = "IOO");
      case "Irele":
        return (lgaCode = "IRE");
      case "Odigbo":
        return (lgaCode = "ODI");
      case "Okitipupa":
        return (lgaCode = "OKI");
      case "Ondo East":
        return (lgaCode = "ONE");
      case "Ondo West":
        return (lgaCode = "ONW");
      case "Ose":
        return (lgaCode = "OSE");
      case "Owo":
        return (lgaCode = "OWO");

      // OSUN
      case "Atakunmosa East":
        return (lgaCode = "ATE");
      case "Atakunmosa West":
        return (lgaCode = "ATW");
      case "Aiyedaade":
        return (lgaCode = "ADD");
      case "Aiyedire":
        return (lgaCode = "ADR");
      case "Boluwaduro":
        return (lgaCode = "BOL");
      case "Boripe":
        return (lgaCode = "BOR");
      case "Ede North":
        return (lgaCode = "EDN");
      case "Ede South":
        return (lgaCode = "EDS");
      case "Ife Central":
        return (lgaCode = "IFC");
      case "Ife East":
        return (lgaCode = "IFE");
      case "Ife North":
        return (lgaCode = "IFN");
      case "Ife South":
        return (lgaCode = "IFS");
      case "Egbedore":
        return (lgaCode = "EGB");
      case "Ejigbo":
        return (lgaCode = "EJI");
      case "Ifedayo":
        return (lgaCode = "IFD");
      case "Ifelodun":
        return (lgaCode = "IFL");
      case "Ila":
        return (lgaCode = "ILA");
      case "Ilesa East":
        return (lgaCode = "ILE");
      case "Ilesa West":
        return (lgaCode = "ILW");
      case "Irepodun":
        return (lgaCode = "IRD");
      case "Irewole":
        return (lgaCode = "IRW");
      case "Isokan":
        return (lgaCode = "ISO");
      case "Iwo":
        return (lgaCode = "IWO");
      case "Obokun":
        return (lgaCode = "OBO");
      case "Odo Otin":
        return (lgaCode = "ODO");
      case "Ola Oluwa":
        return (lgaCode = "OLO");
      case "Olorunda":
        return (lgaCode = "OLN");
      case "Oriade":
        return (lgaCode = "ORI");
      case "Orolu":
        return (lgaCode = "ORO");
      case "Osogbo":
        return (lgaCode = "OSO");

      // OYO
      case "Afijio":
        return (lgaCode = "AFI");
      case "Akinyele":
        return (lgaCode = "AKI");
      case "Atiba":
        return (lgaCode = "ATB");
      case "Atisbo":
        return (lgaCode = "ATI");
      case "Egbeda":
        return (lgaCode = "EGB");
      case "Ibadan North":
        return (lgaCode = "IBN");
      case "Ibadan North-East":
        return (lgaCode = "INE");
      case "Ibadan North-West":
        return (lgaCode = "INW");
      case "Ibadan South-East":
        return (lgaCode = "ISE");
      case "Ibadan South-West":
        return (lgaCode = "ISW");
      case "Ibarapa Central":
        return (lgaCode = "IBC");
      case "Ibarapa East":
        return (lgaCode = "IBE");
      case "Ibarapa North":
        return (lgaCode = "IBN");
      case "Ido":
        return (lgaCode = "IDO");
      case "Irepo":
        return (lgaCode = "IRE");
      case "Iseyin":
        return (lgaCode = "ISE");
      case "Itesiwaju":
        return (lgaCode = "ITE");
      case "Iwajowa":
        return (lgaCode = "IWA");
      case "Kajola":
        return (lgaCode = "KAJ");
      case "Lagelu":
        return (lgaCode = "LAG");
      case "Ogbomosho North":
        return (lgaCode = "OGN");
      case "Ogbomosho South":
        return (lgaCode = "OGS");
      case "Ogo Oluwa":
        return (lgaCode = "OGO");
      case "Olorunsogo":
        return (lgaCode = "OLO");
      case "Oluyole":
        return (lgaCode = "OLU");
      case "Ona Ara":
        return (lgaCode = "ONA");
      case "Orelope":
        return (lgaCode = "ORE");
      case "Ori Ire":
        return (lgaCode = "ORI");
      case "Oyo":
        return (lgaCode = "OYO");
      case "Oyo East":
        return (lgaCode = "OYE");
      case "Saki East":
        return (lgaCode = "SAE");
      case "Saki West":
        return (lgaCode = "SAW");
      case "Surulere":
        return (lgaCode = "SUR");

      // PLATEAU
      case "Bokkos":
        return (lgaCode = "BOK");
      case "Barkin Ladi":
        return (lgaCode = "BAL");
      case "Bassa":
        return (lgaCode = "BAS");
      case "Jos East":
        return (lgaCode = "JOE");
      case "Jos North":
        return (lgaCode = "JON");
      case "Jos South":
        return (lgaCode = "JOS");
      case "Kanam":
        return (lgaCode = "KAM");
      case "Kanke":
        return (lgaCode = "KAK");
      case "Langtang South":
        return (lgaCode = "LAS");
      case "Langtang North":
        return (lgaCode = "LAN");
      case "Mangu":
        return (lgaCode = "MAN");
      case "Mikang":
        return (lgaCode = "MIK");
      case "Pankshin":
        return (lgaCode = "PAN");
      case "Qua an Pan":
        return (lgaCode = "QAP");
      case "Riyom":
        return (lgaCode = "RIY");
      case "Shendam":
        return (lgaCode = "SHE");
      case "Wase":
        return (lgaCode = "WAS");

      // RIVERS
      case "Port Harcourt":
        return (lgaCode = "PH");
      case "Obio-Akpor":
        return (lgaCode = "OA");
      case "Okrika":
        return (lgaCode = "OK");
      case "Ogu–Bolo":
        return (lgaCode = "OB");
      case "Eleme":
        return (lgaCode = "EL");
      case "Tai":
        return (lgaCode = "TA");
      case "Gokana":
        return (lgaCode = "GK");
      case "Khana":
        return (lgaCode = "KH");
      case "Oyigbo":
        return (lgaCode = "OY");
      case "Opobo–Nkoro":
        return (lgaCode = "OP");
      case "Andoni":
        return (lgaCode = "AND");
      case "Bonny":
        return (lgaCode = "BON");
      case "Degema":
        return (lgaCode = "");
      case "Asari-Toru":
        return (lgaCode = "AST");
      case "Akuku-Toru":
        return (lgaCode = "AKT");
      case "Abua–Odual":
        return (lgaCode = "ABO");
      case "Ahoada West":
        return (lgaCode = "AHW");
      case "Ahoada East":
        return (lgaCode = "AHE");
      case "Ogba–Egbema–Ndoni":
        return (lgaCode = "OEN");
      case "Emohua":
        return (lgaCode = "EMO");
      case "Ikwerre":
        return (lgaCode = "IKW");
      case "Etche":
        return (lgaCode = "ETC");
      case "Omuma":
        return (lgaCode = "OMU");

      //SOKOTO

      case "Binji":
        return (lgaCode = "BIN");
      case "Bodinga":
        return (lgaCode = "BOD");
      case "Dange Shuni":
        return (lgaCode = "DAN");
      case "Gada":
        return (lgaCode = "GAD");
      case "Goronyo":
        return (lgaCode = "GOR");
      case "Gudu":
        return (lgaCode = "GUD");
      case "Gwadabawa":
        return (lgaCode = "GWA");
      case "Illela":
        return (lgaCode = "ILL");
      case "Isa":
        return (lgaCode = "ISA");
      case "Kebbe":
        return (lgaCode = "KEB");
      case "Kware":
        return (lgaCode = "KWA");
      case "Rabah":
        return (lgaCode = "RAB");
      case "Sabon Birni":
        return (lgaCode = "SAB");
      case "Shagari":
        return (lgaCode = "SHA");
      case "Silame":
        return (lgaCode = "SIL");
      case "Sokoto North":
        return (lgaCode = "SON");
      case "Sokoto South":
        return (lgaCode = "SOS");
      case "Tambuwal":
        return (lgaCode = "TAM");
      case "Tangaza":
        return (lgaCode = "TAN");
      case "Tureta":
        return (lgaCode = "TUR");
      case "Wamako":
        return (lgaCode = "WAM");
      case "Wurno":
        return (lgaCode = "WUR");
      case "Yabo":
        return (lgaCode = "YAB");

      // TARABA

      case "Ardo Kola":
        return (lgaCode = "ARK");
      case "Bali":
        return (lgaCode = "BAL");
      case "Donga":
        return (lgaCode = "DAN");
      case "Gashaka":
        return (lgaCode = "GAK");
      case "Gassol":
        return (lgaCode = "GAS");
      case "Ibi":
        return (lgaCode = "IBI");
      case "Jalingo":
        return (lgaCode = "JAL");
      case "Karim Lamido":
        return (lgaCode = "KAR");
      case "Kumi":
        return (lgaCode = "KUM");
      case "Lau":
        return (lgaCode = "LAU");
      case "Sardauna":
        return (lgaCode = "SAR");
      case "Takum":
        return (lgaCode = "TAK");
      case "Ussa":
        return (lgaCode = "USS");
      case "Wukari":
        return (lgaCode = "WUK");
      case "Yorro":
        return (lgaCode = "YOR");
      case "Zing":
        return (lgaCode = "ZIN");

      // YOBE
      case "Bade":
        return (lgaCode = "BAD");
      case "Bursari":
        return (lgaCode = "BUR");
      case "Damaturu":
        return (lgaCode = "DAM");
      case "Fika":
        return (lgaCode = "FIK");
      case "Fune":
        return (lgaCode = "FUN");
      case "Geidam":
        return (lgaCode = "GEI");
      case "Gujba":
        return (lgaCode = "GUJ");
      case "Gulani":
        return (lgaCode = "GUL");
      case "Jakusko":
        return (lgaCode = "JAK");
      case "Karasuwa":
        return (lgaCode = "KAR");
      case "Machina":
        return (lgaCode = "MAC");
      case "Nangere":
        return (lgaCode = "NAN");
      case "Nguru":
        return (lgaCode = "NGU");
      case "Potiskum":
        return (lgaCode = "POT");
      case "Tarmuwa":
        return (lgaCode = "TAR");
      case "Yunusari":
        return (lgaCode = "YUN");
      case "Yusufari":
        return (lgaCode = "YUS");

      // ZAMFARA
      case "Anka":
        return (lgaCode = "ANK");
      case "Bakura":
        return (lgaCode = "BAK");
      case "Birnin Magaji Kiyaw":
        return (lgaCode = "BIR");
      case "Bukkuyum":
        return (lgaCode = "BUK");
      case "Bungudu":
        return (lgaCode = "BUN");
      case "Gummi":
        return (lgaCode = "GUM");
      case "Gusau":
        return (lgaCode = "GUS");
      case "Kaura Namoda":
        return (lgaCode = "KAU");
      case "Maradun":
        return (lgaCode = "MAN");
      case "Maru":
        return (lgaCode = "MAR");
      case "Shinkafi":
        return (lgaCode = "SHI");
      case "Talata Mafara":
        return (lgaCode = "TAM");
      case "Chafe":
        return (lgaCode = "CHA");
      case "Zurmi":
        return (lgaCode = "ZUR");

      // FCT
      case "Abaji":
        return (lgaCode = "ABA");
      case "Bwari":
        return (lgaCode = "BWA");
      case "Gwagwalada":
        return (lgaCode = "GWA");
      case "Kuje":
        return (lgaCode = "KUJ");
      case "Kwali":
        return (lgaCode = "KWL");
      case "AMAC":
        return (lgaCode = "AMAC");
    }
  }
};
