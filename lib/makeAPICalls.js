const axios = require('axios');
const convertSpacesToPlus = require('./convertToPlus');

module.exports = {
  makeAPICalls: (userInput, userInputSerialized) => {

    const googleAPIKey = process.env.GOOGLE_API_KEY;
    const omdbAPIKey = process.env.OMDB_API_KEY;
    const rainforestAPIkey = process.env.RAINFOREST_API_KEY;

    const userInputPlus = convertSpacesToPlus(userInput); // user input with spaces converted to +'s
    // const userInputSerialized = $(userInput).serialize();
    let inputType = undefined;

    const params = {
      api_key: rainforestAPIkey,
      type: "search",
      amazon_domain: "amazon.ca",
      search_term: userInput
    };

    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827,-123.1207&radius=2500&keyword=${userInputSerialized}&key=${googleAPIKey}`)
      .then(response => {
        if (response.data.status !== "ZERO_RESULTS") {
          inputType = "eat";
        } else {
          console.log("Not a restaurant or cafe");
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
        inputType = "buy";
      })
      .catch(err => {
        console.log("Calls completed");
      });
    return inputType;
  }
};


  

// set up the request parameters
/*  const params = {
  api_key: "0C414DFEE8384ED3BFB93EA0BE4795DA",
  type: "search",
  amazon_domain: "amazon.ca",
  search_term: "memory cards"
}

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', {params})
  .then(response => {

    // print the JSON response from Rainforest API
    console.log(JSON.stringify(response.data, 0, 2));

  }).catch(error => {
    // catch and print the error
    console.log('error');
  })  */


//movies api
// searching by title, indicated by ?t=
/* axios.get('http://www.omdbapi.com/?t=avatar&apikey=9a375291')
  .then(response => {
    console.log(response.data);

  }).catch(error => {
    // catch and print the error
    console.log(error);
  }) */

// tv show api
// limit responses to ensure accuracy?
// this one doesn't return errors, only empty arrays
/* axios.get('http://api.tvmaze.com/search/shows?q=Justice+League')
  .then(response => {
    console.log(response.data);

  }).catch(error => {
    // catch and print the error
    console.log('error');
  }) */

// amazon api
// set up the request parameters

/* const params = {
  api_key: "0C414DFEE8384ED3BFB93EA0BE4795DA",
  type: "search",
  amazon_domain: "amazon.com",
  search_term: "memory cards",
  sort_by: "price_high_to_low"
}

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', { params })
  .then(response => {

    // print the JSON response from Rainforest API
    console.log(JSON.stringify(response.data, 0, 2));

  }).catch(error => {
    // catch and print the error
    console.log(error);
  }); */

// yelp api
/* const params = {
  headers: {
    Authorization: `Bearer 3Lk_Ca5H_8p0pgyB79aPatYsdP8QJJC4SKj1fQFmw8fEOMmiLK42L_NIJnSW2RFNEn8xhgeFlg4H-LbolAZ1Ug8837CpvOIxkIv2RlBuqEioNsJjUH43O8vEr1ZpYHYx`
},
  params: {
    location: 'Vancouver',
    // categories: 'breakfast_brunch',
    term: 'White Spot'
}};

axios.get('https://api.yelp.com/v3/businesses/search', params)
.then((res) => {
console.log(res.data)
})
.catch((err) => {
console.log('error')
}) */

// google books api, only returning the top result
/*
axios.get('https://www.googleapis.com/books/v1/volumes?q=intitle:the%20obesity%20code&printType=books&key=AIzaSyAGnNEYseMXlt5tA40pOTZEdnlUTfwpcDs')
  .then(response => {
    console.log(response.data);

  }).catch(error => {
    // catch and print the error
    console.log('error');
  })
 */

// google maps api, only returning the top result

/*  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827,-123.1207&radius=1500&keyword=starbucks&key=AIzaSyAGnNEYseMXlt5tA40pOTZEdnlUTfwpcDs')
  .then(response => {
    console.log(response.data);

  }).catch(error => {
    // catch and print the error
    console.log('error');
  })    */
 

  
