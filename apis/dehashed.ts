import axios, { AxiosResponse } from "axios";

export async function getCompromised(callback: ResultsCallback) {
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

    const response: AxiosResponse<DehashedResponse> = await axios.get(
      "https://api.dehashed.com/search?query=domain:" + process.env.DOMAIN,
      requestHeaders
    );

    callback(response.data);
  } catch (error) {
    // TODO: Slack API: error
    return [];
  }
}

export interface BreachDetail {
  _id?: any;
  email?: string;
  username?: string;
  password?: string;
  hashed_password?: string;
  name?: string;
  address?: string;
  phone?: string;
  database_name?: string;
}

export interface DehashedResponse {
  entries: BreachDetail[];
  balance: number;
}

interface ResultsCallback {
  (results: DehashedResponse): void;
}
