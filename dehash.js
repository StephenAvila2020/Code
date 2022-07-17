const axios = require('axios');


const emails = {
  method: 'GET',
  url: 'https://api.dehashed.com/search?query=email:',
  headers: {
    'Accept': 'application/json'
  },
  auth: {
    username: '',
    password: ''
  }
};

axios.request(emails).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

