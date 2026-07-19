import { Client, Databases, Storage, Account, ID, Query } from 'appwrite';

// ── Fill these in via a .env file (see README) ──────────────────────────────
// Vite exposes any VITE_-prefixed variable via import.meta.env
export const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
export const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID';
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID';
export const MESSAGES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID || 'messages';
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'chat_images';

export const PAGE_SIZE = 10; // messages per "page" — change here to tune everywhere

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { client, ID, Query };
