import { MongoClient } from "mongodb";
import { BreachDetail } from "./dehashed";

async function connectToDatabase(): Promise<MongoClient | null> {
  console.log("connecting to mongo");
  const uri: string = process.env.DB_CONN_STRING;
  try {
    const client: MongoClient = new MongoClient(uri);
    return client;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getAll(results) {
  const client: MongoClient = await connectToDatabase();
  try {
    await client.connect();
    const response = await getAll(client);
    results(response);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

export async function insert(data: BreachDetail) {
    const client: MongoClient = await connectToDatabase();
    try {
      await client.connect();
      await insertData(client, data);
    } catch (error) {
      console.log(error);
    } finally {
      client.close();
    }
}

async function fetchData(client) {
  try {
    return await client
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION_NAME)
      .find({})
      .toArray();
  } catch (error) {
    console.log(error);
  } 
}

async function insertData(client, breachDetail: BreachDetail){
    try {
        await client
          .db(process.env.DB_NAME)
          .collection(process.env.COLLECTION_NAME).insertOne(breachDetail);
    } catch (error) {
        console.log(error);
    } 
}
