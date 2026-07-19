import { Button, Label, Alert } from "reactstrap";
import {
  updateProfilePicUrl,
  retriveValueByKey,
  updateParticularField,
} from "../backend/appwriteFunctions";
import { storage } from "../backend/appwrite";
import { ID } from "appwrite";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { styles as baseStyles } from "./profile";

const BUCKET_ID = "6956a69a001c706e6ecd";

export default function ProfileDetails(params) {
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState({ name: false, dpUrl: false });

  const { uid } = useParams();
  const [file, setFile] = useState(null);

  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const [editedName, setEditedName] = useState("");
  const [nameIsEditing, setNameIsEditing] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const loadprofileinfo = async () => {
      const url = await retriveValueByKey(uid, "profilePicUrl");
      const userName = await retriveValueByKey(uid, "name");
      setImageUrl(url);
      setUserName(userName);
    };
    loadprofileinfo();
    // }, [imageUrl, userName]);
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    setUploading(true);
    setDone({ ...done, dpUrl: false });

    const res = await uploadImage(uid, file, setUploadPercent);

    setUploading(false);

    if (res.success) {
      setDone({ ...done, dpUrl: true });
    }
  };

  const uploadImage = async (uid, file, onProgress) => {
    try {
      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file,
        [],
        (progress) => {
          if (progress.total) {
            const percent = Math.round(
              (progress.loaded / progress.total) * 100
            );
            onProgress?.(percent);
          }
        }
        // permissions: ['read("any")', 'update("user:' + uid + '")'], // optional
      );

      const imageUrl = storage.getFileView(BUCKET_ID, uploadedFile.$id);
      setImageUrl(imageUrl);

      await updateProfilePicUrl(uid, imageUrl);

      console.log("Image uploaded & URL saved:", imageUrl);

      return { success: true, imageUrl };
    } catch (error) {
      console.error("Upload failed:", error);
      return { success: false, error };
    }
  };

  const nameUpdate = async () => {
    if (editedName.trim()) {
      const res = await updateParticularField(uid, { name: editedName });
      if (res.saved) {
        setUserName(editedName);
        setDone({ ...done, name: true });
      } else {
      }
    } else {
      alert("name cannot be empty");
      return;
    }
  };
  const styles = {
    ...baseStyles,
    image: {
      ...baseStyles.image,
      borderRadius: "2%",
      height: "250px",
      width: "auto",
    },
    placeholderText: {
      ...baseStyles.placeholderText,
      ...baseStyles.image,
    },
  };
  const navigate = useNavigate();
  return (
    <div className="container p-3 rounded shadow-sm bg-light border">
      <Label className="fw-semibold text-secondary mb-2">Profile Picture</Label>
      <div className="d-flex flex-column gap-2">
        <div className="m-auto">
          {" "}
          {imageUrl && (
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={imageUrl}
                // src="logos/logo.png"
                alt="Profile"
                style={styles.image}
                // onClick={handleClick}
              />
            </a>
          )}
          {!imageUrl && (
            <span style={styles.placeholderText}>
              {userName?.[0]?.toUpperCase() || "?"}
            </span>
          )}
        </div>

        <div className="col-12 col-md-8">
          {!uploading && (
            <div className="d-flex gap-2 align-items-center">
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-lg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setDone({ ...done, dpUrl: false });
                }}
              />
              <Button onClick={() => handleUpload()}>Upload</Button>
            </div>
          )}

          {uploading && (
            <div className="mt-3">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${uploadPercent}%` }}
                >
                  {uploadPercent}%
                </div>
              </div>
            </div>
          )}
        </div>

        {done.dpUrl && <Alert color="success">Upload completed ✅</Alert>}
      </div>

      {/* name edit */}
      <div>
        <div className="col-12 col-md-8 d-flex gap-2 align-items-center mt-3">
          <Label className="fw-semibold text-secondary mb-0">Name</Label>

          <input
            type="text"
            className="form-control"
            value={nameIsEditing ? editedName : userName}
            disabled={!nameIsEditing}
            onChange={(e) => setEditedName(e.target.value)}
          />

          <Button
            color={nameIsEditing ? "success" : "primary"}
            onClick={() => {
              setNameIsEditing(!nameIsEditing);
              setDone({ ...done, name: false });
              if (nameIsEditing) nameUpdate();
            }}
          >
            {nameIsEditing ? "Save" : "Edit"}
          </Button>
        </div>

        {done.name && <Alert color="success">Name Updated ✅</Alert>}
      </div>
      <div className="col-12 col-md-8 d-flex justify-content-center py-2">
        <Button
          className="bg-primary"
          onClick={() => {
            navigate(`/home/${uid}`);
          }}
        >
          Return to Main Page
        </Button>
      </div>
    </div>
  );
}
