import axios from "axios";

const baseURL = "https://dummyjson.com/";

export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + type)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};
