import axios from "axios";
import {
  storePrevFlags,
  storePrevLangs,
  storeWithDate,
} from "../../assets/js/helpers";

// const API_URL = "http://localhost:7001/main/";
const API_URL = "https://trapi.herrguller.cc/main/";

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
const getRandomLanguage = async (reqData) => {
  var config = {
    method: "get",
    url:
      API_URL +
      "get/language?round=" +
      reqData.round +
      "&difficulty=" +
      reqData.difficulty +
      "&prevLang=" +
      reqData.prevLang,
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("lang", JSON.stringify(response.data), 1);
      storePrevLangs(response.data);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const mainService = {
  getRandomFlag,
  getRandomLanguage,
};

export default mainService;
