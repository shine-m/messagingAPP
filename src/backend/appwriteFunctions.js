// src/appwriteFunctions.js
import { databases } from "./appwrite";
import { AppwriteException } from "appwrite";

const DATABASE_ID = "692ef92e0034e2579cbd";
const COLLECTION_ID = "keyvaluetable";

// Save (Create/Update) a key–value pair
export async function saveKeyValue(uid, password, name) {
  console.log(uid, password, name);
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      uid, // using uid as document ID
      { uid: uid, password: password, name: name }
    );

    console.log("Saved successfully:", response);
    return {
      saved: true,
      response: response,
    };
  } catch (error) {
    console.error("Error saving data:", error);
    return { saved: false, response: error };
  }
}
export async function updateProfilePicUrl(uid, url) {
  try {
    if (!url) {
      throw new Error("URL is undeeeeeeeeeeeeeeefined");
    }
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      uid, // using uid as document ID
      { profilePicUrl: url }
    );

    console.log("updated successfully:", response);
    return {
      saved: true,
      response: response,
    };
  } catch (error) {
    console.error("Error saving url:", error);
    return { saved: false, response: error };
  }
}
export async function updateParticularField(uid, update) {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      uid, // using uid as document ID
      update
    );

    console.log("updated successfully:", response);
    return {
      saved: true,
      response: response,
    };
  } catch (error) {
    console.error("Error occured:", error);
    return { saved: false, response: error };
  }
}

// Get value by uid
export async function getValueByKey(uid) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      uid
    );

    console.log("Retrieved:", response);
    return response.password;
  } catch (error) {
    if (error instanceof AppwriteException || error.code === 404) {
      console.warn(`uid ${uid} does not exist`);
      return null;
    }
    console.error("Error retrieving data:", error);
    return null;
  }
}
export async function retriveValueByKey(uid, colname) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      uid
    );

    // console.log("Retrieved:", response);
    return response[colname];
  } catch (error) {
    if (error instanceof AppwriteException || error.code === 404) {
      console.warn(`uid ${uid} does not exist`);
      return null;
    }
    console.error("Error retrieving data:", error);
    return null;
  }
}

export async function getAllKeyValues() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    return {
      success: true,
      total: response.total,
      documents: response.documents,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
