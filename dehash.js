const axios = require("axios");

const emails = {
  method: 'GET',
  url: 'https://api.dehashed.com/search?query=username:"test"&page=2&size=1',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + btoa('')
}
};

axios.request(emails).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

