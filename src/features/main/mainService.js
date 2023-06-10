import axios from "axios";
import { storePrevFlags, storeWithDate } from "../../assets/js/helpers";

// const API_URL = "http://localhost:7001/main/";
const API_URL = "https://trapi.herrguller.cc/main/";

const getCountries = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/countries",
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("countries", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const getRandomFlag = async (reqData) => {
  var config = {
    method: "get",
    url:
      API_URL +
      "get/flag?round=" +
      reqData.round +
      "&difficulty=" +
      reqData.difficulty +
      "&prevFlag=" +
      reqData.prevFlag,
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("flagger", JSON.stringify(response.data), 1);
      storePrevFlags(response.data);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const mainService = {
  getCountries,
  getRandomFlag,
};

export default mainService;
