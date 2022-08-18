import axios from "axios";
import { login } from "../../Reducers/Auth/Auth";

export const login_action = (data) => {
  return (dispatch) => {
    axios.post("http://localhost:4000/users/login", data).then((resp) => {
      let data_resp = resp.data;
      data_resp["userProfileInfo"] = data_resp.data;
      delete data_resp.data;
      dispatch(login({ ...data, ...resp.data }));
    });
  };
};
