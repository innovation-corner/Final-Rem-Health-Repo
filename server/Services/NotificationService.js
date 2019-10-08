module.exports = {
  async sixWeeks(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} 
        is due for IMMUNIZATION on ${date}. Vaccines include  (OPV 1, PCV 1, Pentavalent 1, Rotarix 1`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name}
        kwesịrị igba ọgwụ mgbochi ọrịa na ${date}. 
        Ọgwụ ndị gụnyere (OPV 1, PCV 1, Pentavalent 1, Rotarix 1`);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}. Ajesara ( HBV 1, OPV  & BCG)`);
      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date}, vaccines na ( HBV 1, OPV  & BCG) `);
      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}. 
        Alurar hada da ( HBV 1, OPV  & BCG) `);
      default:
        return (message = `Hi, your child, ${child.name} 
        is due for IMMUNIZATION on ${date}. Vaccines include  (OPV 1, PCV 1, Pentavalent 1, Rotarix 1`);
    }
  },

  async onRegistration(language, child, im) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, ${child.name}'s birth has been registered successfully.His Immunization number is ${im}`);

      case "Pidgin":
        return (message = `Howfa, ${child.name} birth don register well, e immunization number na ${im}`);

      case "Igbo":
        return (message = `Ndewo, e  debere aha ${child.name} nke ọma. Nọmba ọgwụ mgbochi ya bụ ${im}`);

      case "Yoruba":
        return (message = `Ekaboo, ${child.name} ká ibi ti a ti aami-ni ifijišẹ. Nọmba ajesara rẹ ni ${im}`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya yi rajista sosai. Lambar shaidar rigakafi ita ce ${im}`);
    }
  },

  async atBirth(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}. 
        Vaccines include ( HBV 1, OPV  & BCG) `);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date}, 
        vaccines na ( HBV 1, OPV  & BCG) `);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}. 
        Alurar hada da ( HBV 1, OPV  & BCG) `);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesara ( HBV 1, OPV  & BCG)`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na ${date}.
        Ọgwụ ndị gụnyere( HBV 1, OPV  & BCG) `);
    }
  },

  async tenWeeks(language, child) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for 
        IMMUNIZATION on ${date}. Vaccines include 
        (OPV 2, Rotarix 2, PCV 2 & Pentavalent 2) `);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na (OPV 2, Rotarix 2, PCV 2 & Pentavalent 2) `);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}. Ajesara (OPV 2, Rotarix 2, PCV 2 & Pentavalent 2) `);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na ${date}.
        Ọgwụ ndị gụnyere(OPV 2, Rotarix 2, PCV 2 & Pentavalent 2) `);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (OPV 2, Rotarix 2, PCV 2 & Pentavalent 2) `);
    }
  },

  async fourteenWeeks(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on 
        ${date}. Vaccines include (OPV 3, PCV 3 & Pentavalent 3) `);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on 
        ${date}, vaccines na (OPV 3, PCV 3 & Pentavalent 3) `);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni 
        ${date}. Ajesara (OPV 3, PCV 3 & Pentavalent 3) `);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (OPV 3, PCV 3 & Pentavalent 3)`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyere(OPV 3, PCV 3 & Pentavalent 3)`);
    }
  },

  async sixMonths(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}.
         Vaccines include  (Vitamin A 1st dose)`);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na  (Vitamin A 1st dose)`);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesara (Vitamin A 1st dose)`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyere (Vitamin A 1st dose)`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (Vitamin A 1st dose)`);
    }
  },

  async nineMonths(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}.
         Vaccines include (Measles and Yellow Fever vaccine )`);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na (Measles and Yellow Fever vaccine ) `);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesara (Measles and Yellow Fever vaccine )`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyere (Measles and Yellow Fever vaccine )`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (Measles and Yellow Fever vaccine )`);
    }
  },

  async twelveMonths(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}.
         Vaccines include  (Meningitis vaccine, Vitamin A, OPV booster )`);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na  (Meningitis vaccine, Vitamin A, OPV booster )`);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesara (Meningitis vaccine, Vitamin A, OPV booster )`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyere (Meningitis vaccine, Vitamin A, OPV booster )`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (Meningitis vaccine, Vitamin A, OPV booster )`);
    }
  },

  async eighteenMonths(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}.
         Vaccines include  (MMR, Chicken Pox Vaccine )`);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na  (MMR, Chicken Pox Vaccine )`);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesara (MMR, Chicken Pox Vaccine )`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyere (MMR, Chicken Pox Vaccine )`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (MMR, Chicken Pox Vaccine )`);
    }
  },
  async twentyFourMonths(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}.
         Vaccines include (Typhoid Vaccine)`);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na (Typhoid Vaccine)`);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesar (Typhoid Vaccine)`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyer (Typhoid Vaccine)`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da (Typhoid Vaccine)`);
    }
  },

  async thirteenYears(language, child, date) {
    let message;

    switch (language) {
      case "English":
        return (message = `Hi, your child ${child.name} is due for IMMUNIZATION on ${date}.
         Vaccines include  (HPV Vaccine )`);

      case "Pidgin":
        return (message = `Howfa, ur pikin ${child.name} don due 4 immunization on ${date},
         vaccines na  (HPV Vaccine )`);

      case "Yoruba":
        return (message = `Asiko fun abere ajesara omo yin ${child.name} yo waye ni ${date}.
         Ajesara (HPV Vaccine )`);

      case "Igbo":
        return (message = `Ndewo, nwa gị bụ ${child.name} kwesịrị igba ọgwụ mgbochi ọrịa na 
        ${date}. Ọgwụ ndị gụnyere (HPV Vaccine )`);

      case "Hausa":
        return (message = `Sannu, ${child.name} ya kamata ya tafi immunization a ranar ${date}.
        Alurar hada da  (HPV Vaccine )`);
    }
  },
  async newUser(email, password) {
    const message = `Hello! An account has been created for you at RemHealth.co. Your Login details are email: ${email}, password:
    ${password}`;
    return message;
  }
};
