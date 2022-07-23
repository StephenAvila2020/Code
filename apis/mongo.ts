import { MongoClient } from "mongodb";
import { BreachDetail } from "./dehashed";

async function connectToDatabase(): Promise<MongoClient | null> {
  const uri: string = process.env.DB_CONN_STRING;
  try {
    const client: MongoClient = new MongoClient(uri);
    return client;
  } catch (error) {
    console.error("\x1b[31m\x1b[1m", "Could not connect to database: ", "\x1b[0m", error);
    return null;
  }
}

export async function getAll(): Promise<BreachDetail[]> {
  return new Promise(async (resolve, reject) => {
    const client: MongoClient = await connectToDatabase();
    try {
      await client.connect();
      const response = await fetchData(client);
      client.close();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function insert(data: BreachDetail) {
  const client: MongoClient = await connectToDatabase();
  try {
    await client.connect();
    await insertData(client, data);
  } catch (error) {
    // TODO: Replace with Slack
    console.error("\x1b[31m\x1b[1m", "Could not insert into database: ", "\x1b[0m", error);
  } finally {
    client.close();
  }
}

async function fetchData(client: MongoClient): Promise<BreachDetail[]> {
  try {
    return await client
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION_NAME)
      .find({})
      .toArray();
  } catch (error) {
    // TODO: Replace with Slack
    console.error("\x1b[31m\x1b[1m", "Could not fetch data: ", "\x1b[0m", error);
  }
}

async function insertData(client: MongoClient, breachDetail: BreachDetail): Promise<void> {
  try {
    await client
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION_NAME).insertOne(breachDetail);
  } catch (error) {
    // TODO: Replace with Slack
    console.error("\x1b[31m\x1b[1m", error, "\x1b[0m");
  }
}
