import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("692ef8e00037617e7e28");

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
