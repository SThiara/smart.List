const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const { convertSpacesToPlus } = require('./convertToPlus.js');

module.exports = {
  makeAPICalls: function(userInput) {

    const googleAPIKey = process.env.GOOGLE_API_KEY;
    const omdbAPIKey = process.env.OMDB_API_KEY;
    const rainforestAPIkey = process.env.RAINFOREST_API_KEY;

    const userInputLowerCase = userInput.replace(/ /g, "").toLowerCase();
    const userInputPlus = convertSpacesToPlus(userInput);
    const userInputSerialized = encodeURI(userInput);
    let inputType = '';
    let skip = false;

    const params = {
      api_key: rainforestAPIkey,
      type: "search",
      amazon_domain: "amazon.ca",
      search_term: userInput,
      page: "1"
    };

    return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827,-123.1207&radius=2500&keyword=${userInputSerialized}&type=cafe&key=${googleAPIKey}`)
      .then(res => {
        if (res.data.status !== "ZERO_RESULTS" && ((res.data.results[0].name.replace(/ /g, "").toLowerCase() === userInputLowerCase) || (res.data.results[0].name.replace(/ /g, "").toLowerCase().startsWith(userInputLowerCase)))) { // (res.data.status !== "ZERO_RESULTS") {
          inputType = "eat";
          skip = true;
        }

        console.log("Not a cafe");
        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827,-123.1207&radius=2500&keyword=${userInputSerialized}&type=restaurant&key=${googleAPIKey}`);
      })
      .then(res => {
        if (skip) {
          return;
        }
        if (res.data.status !== "ZERO_RESULTS" && ((res.data.results[0].name.replace(/ /g, "").toLowerCase() === userInputLowerCase) || (res.data.results[0].name.replace(/ /g, "").toLowerCase().startsWith(userInputLowerCase)))) { // (res.data.status !== "ZERO_RESULTS") {
          inputType = "eat";
          skip = true;
        }

        console.log("Not a restaurant");
        return axios.get(`http://www.omdbapi.com/?t=${userInputPlus}&apikey=${omdbAPIKey}`);

      })
      .then(res => {
        if (skip) {
          return;
        }

        if (res.data.Response !== "False" && ((res.data.Title.replace(/ /g, "").toLowerCase() === userInputLowerCase) || (res.data.Title.replace(/ /g, "").toLowerCase().startsWith(userInputLowerCase)))) { // (res.data.response !== 'False') {
          inputType = "watch";
          skip = true;
        }

        console.log("Not a movie or TV series");
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${userInputSerialized}&printType=books&key=${googleAPIKey}`);
      })
      .then(res => {
        if (skip) {
          return;
        }
        if (res.data.totalItems !== 0 && ((res.data.items[0].volumeInfo.title.replace(/ /g, "").toLowerCase() === userInputLowerCase)) || (res.data.items[0].volumeInfo.title.replace(/ /g, "").toLowerCase().startsWith(userInputLowerCase))) { // (res.data.totalItems !== 0) {          inputType = "read";
          skip = true;
          return;
        }

        console.log("Not a book");

        return axios.get('https://api.rainforestapi.com/request', {params});
      })
      .then(res => {
        if (inputType) {
          return inputType;
        }

        if (res.data.search_results[0].title.toLowerCase().includes(userInputLowerCase)) {
          inputType = "buy";
        }
        return 'uncategorize';
      })
      .catch(err => {
        console.log('catch:', err.response.data, err.response.status);
        return 'uncategorize';
      });
  }
};
