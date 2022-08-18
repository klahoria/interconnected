import axios from "axios";

export const errorLogger = (data, errInfo) => {
  let api_data = { data, errInfo };
  axios
    .post("http://192.168.8.89:4000/" + "error/logger", api_data)
    .then((resp) => {});
};
