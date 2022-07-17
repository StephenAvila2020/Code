export async function checkDomain(): Promise<Boolean> {
    let number: Number = 5;
    let string: String = "Boo!";
    return true;
}

/* 

Old code from js

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



*/