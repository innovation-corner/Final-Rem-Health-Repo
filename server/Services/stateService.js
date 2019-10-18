module.exports = {
  async selectState(code) {
    switch (code) {
      case "*384*3086#":
        return { code: "IM", state: "Imo" };
    }
  },

  async selectCode(state) {
    switch (state) {
      case "Abia":
        return {code : "AB", state: 'Abia' };
      case "Akwa Ibom":
        return {code : "Ak", state: 'Akwa Ibom' };
      case "Anambra":
        return {code : "AN", state: 'Anambra' };
      case "Bayelsa":
        return {code : "BA", state: 'Bayelsa' };
      case "Bauchi":
        return {code : "BU", state: 'Bauchi' };
      case "Benue":
        return {code : "BE", state: 'Benue' };
      case "Borno":
        return {code : "BO", state: 'Borno' };
      case "Cross River":
        return {code : "CR", state: 'Cross River' };
      case "Delta":
        return {code : "DE", state: 'Delta' };
      case "Ebonyi":
        return {code : "EB", state: 'Ebonyi' };
      case "Edo":
        return {code : "ED", state: 'Edo' };
      case "Ekiti":
        return {code : "EK", state: 'Ekiti' };
      case "Enugu":
        return {code : "EN", state: 'Enugu' };
      case "Gombe":
        return {code : "GO", state: 'Gombe' };
      case "Imo":
        return {code : "IM", state: 'Imo' };
      case "Jigawa":
        return {code : "JI", state: 'Jigawa' };
      case "Kaduna":
        return {code : "KD", state: 'Kaduna' };
      case "Katsina":
        return {code : "KS", state: 'Katsina' };
      case "Kano":
        return {code : "KN", state: 'Kano' };
      case "Kebbi":
        return {code : "KB", state: 'Kebbi' };
      case "Kogi":
        return {code : "KG", state: 'Kogi' };
      case "Kwara":
        return {code : "KW", state: 'Kwara' };
      case "Lagos":
        return {code : "LA", state: 'Lagos' };
      case "Nassarawa":
        return {code : "NS", state: 'Nassarawa' };
      case "Niger":
        return {code : "NG", state: 'Niger' };
      case "Ogun":
        return {code : "OG", state: 'Ogun' };
      case "Ondo":
        return {code : "OD", state: 'Ondo' };
      case "Osun":
        return {code : "OS", state: 'Osun' };
      case "Oyo":
        return {code : "OY", state: 'Oyo' };
      case "Plateau":
        return {code : "PL", state: 'Plateau' };
      case "Rivers":
        return {code : "RV", state: 'Rivers' };
      case "Sokoto":
        return {code : "SK", state: 'Sokoto' };
      case "Taraba":
        return {code : "TR", state: 'Taraba' };
      case "Yobe":
        return {code : "YB", state: 'Yobe' };
      case "Zamfara":
        return {code : "ZF", state: 'Zamfara' };
      case "F.C.T":
        return {code :"FCT", state: 'FCT' };
    }
  }
};
