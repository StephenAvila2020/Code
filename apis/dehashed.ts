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
