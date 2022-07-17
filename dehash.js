const axios = require('axios');

const response = await axios.get('https://api.dehashed.com/search?query=email:', {
  headers: {
    'Accept': 'application/json'
  },
  auth: {
    username: 'admin@dehashed.com',
    password: 'dummy_key'
  }
});

axios.request(emails).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

