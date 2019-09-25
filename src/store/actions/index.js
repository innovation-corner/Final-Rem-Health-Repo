export const SET_USER = "SET_USER";
export const SET_ACCESS = "SET_ACCESS";

export const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const setAccess = access => {
  return {
    type: SET_ACCESS,
    access
  };
};
