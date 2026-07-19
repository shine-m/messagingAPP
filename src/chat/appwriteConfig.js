import { Client, Databases, Storage, Account, ID, Query } from "appwrite";

// ── Fill these in via a .env file (see README) ──────────────────────────────
// Vite exposes any VITE_-prefixed variable via import.meta.env
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "687dd53b00135980b4b5";
const APPWRITE_DATABASE_ID = "6a5802c900263571aa66";
const APPWRITE_MESSAGES_COLLECTION_ID = "msgcollection";
const APPWRITE_BUCKET_ID = "687de2c60003e83cf640";

export const ENDPOINT = APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
export const PROJECT_ID = APPWRITE_PROJECT_ID || "YOUR_PROJECT_ID";
export const DATABASE_ID = APPWRITE_DATABASE_ID || "YOUR_DATABASE_ID";
export const MESSAGES_COLLECTION_ID =
  APPWRITE_MESSAGES_COLLECTION_ID || "messages";
export const BUCKET_ID = APPWRITE_BUCKET_ID || "chat_images";

// they are used when .env is used
// export const ENDPOINT =
//   import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
// export const PROJECT_ID =
//   import.meta.env.VITE_APPWRITE_PROJECT_ID || "YOUR_PROJECT_ID";
// export const DATABASE_ID =
//   import.meta.env.VITE_APPWRITE_DATABASE_ID || "YOUR_DATABASE_ID";
// export const MESSAGES_COLLECTION_ID =
//   import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID || "messages";
// export const BUCKET_ID =
//   import.meta.env.VITE_APPWRITE_BUCKET_ID || "chat_images";

export const PAGE_SIZE = 10; // messages per "page" — change here to tune everywhere

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { client, ID, Query };
