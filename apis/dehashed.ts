import axios, { Axios, AxiosError, AxiosResponse } from "axios";

interface breachDetail {
  id: number;
  email?: string;
  username?: string;
  password?: string;
}

export async function getCompromisedEmail(): Promise<breachDetail[] | []> {
  try {
    const requestHeaders = {
      headers: {
        Accept: "application/json",
      },
      auth: {
        username: process.env.DEHASHED_USER,
        password: process.env.DEHASHED_KEY,
      },
    };
    const response: AxiosResponse<breachDetail[] | [] | null> = await axios.get(
      "https://api.dehashed.com/search?query=domain:" + process.env.DOMAIN,
      requestHeaders
    );
    console.log(response.data, "this is the response");
    return response.data;
  } catch (error) {
    console.log(error, "This is an error");
    return [];
  }
}
// Authorization:
//     `Basic ` +
//     Buffer.from(
//       process.env.DEHASHED_USER + ":" + process.env.DEHASHED_KEY
//     ),
/* 
{"id": 5603803856, "email": "test@test", "username": "", "password": "test",}
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
