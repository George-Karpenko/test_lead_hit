import axios from "axios";

export default () => {
  const baseURL = "https://track-api.leadhit.io/client/";
  const instance = axios.create({
    baseURL,
    headers: {
      "Api-Key": process.env.VUE_APP_API_KEY,
    },
  });

  return instance;
};
