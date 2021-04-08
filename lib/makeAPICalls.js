const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const dt = require('./convertToPlus.js');

module.exports = {
  makeAPICalls: function (userInput) {

    const googleAPIKey = process.env.GOOGLE_API_KEY;
    const omdbAPIKey = process.env.OMDB_API_KEY;
    const rainforestAPIkey = process.env.RAINFOREST_API_KEY;

    const userInputPlus = dt.convertSpacesToPlus(userInput); // user input with spaces converted to +'s
    const userInputSerialized = encodeURI(userInput);
    let inputType = undefined;

    const params = {
      api_key: rainforestAPIkey,
      type: "search",
      amazon_domain: "amazon.ca",
      search_term: userInput
    };

    return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827,-123.1207&radius=2500&keyword=${userInputSerialized}&type=cafe&key=${googleAPIKey}`)
      .then(response => {
        if (response.data.status !== "ZERO_RESULTS") {
          inputType = "eat";
        } else {
          console.log("Not a cafe");
          return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827,-123.1207&radius=2500&keyword=${userInputSerialized}&type=restaurant&key=${googleAPIKey}`);
        }
      })
      .then(response => {
        if (response.data.status !== "ZERO_RESULTS") {
          inputType = "eat";
        } else {
          console.log("Not a restaurant");
          return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${userInputSerialized}&printType=books&key=${googleAPIKey}`);
        }
      })
      .then(response => {
        if (response.data.totalItems !== 0) {
          inputType = "read";
        } else {
          console.log("Not a book");
          return axios.get(`http://www.omdbapi.com/?t=${userInputPlus}&apikey=${omdbAPIKey}`);
        }
      })
      .then(response => {
        if (response.data.Response !== 'False') {
          inputType = "watch";
        } else {
          console.log("Not a movie or TV series");
          return 0;
          // return axios.get('https://api.rainforestapi.com/request', {params});
        }
      })
      .then(response => {
        inputType = "unsorted";
        return inputType;
      })
      .catch(err => {
        console.log("Calls completed");
        return inputType;
      });
  }
};
