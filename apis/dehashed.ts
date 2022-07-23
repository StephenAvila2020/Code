import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { getAll, insert } from "../apis/mongo";

export interface BreachDetail {
  _id?: any;
  email?: string;
  username?: string;
  password?: string;
  hashed_password?: string;
  name?: string;
  address?: string;
  phone?:string;
  database_name?: string;
}

export async function getCompromised(results) {
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

    const response = await axios.get(
      "https://api.dehashed.com/search?query=domain:" + process.env.DOMAIN,
      requestHeaders
    );

    results(response.data);
  } catch (error) {
    console.log(error, "This is an error");
    return [];
  }
}
