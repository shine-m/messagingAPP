const styles = {
  card: {
    width: "30vw",
    height: "30vw",
    textAlign: "center",
    padding: "1vw 2vw 2vw 1vw",
    borderRadius: "12px",
    boxShadow: "0 2px 4px 4px rgba(236, 170, 36, 0.81)",
    cursor: "pointer",
  },
  avatarWrapper: {
    width: "28vw",
    height: "28vw",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    backgroundColor: "#c2bb90",
    boxShadow: "0 0 15px rgba(0, 0, 0, 1)",
    cursor: "pointer",
  },
  placeholderText: {
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: "72px",
    fontSize: "clamp(24px, 30vw, 100px)",
    fontWeight: "700",
    lineHeight: "1",
    userSelect: "none",
  },
  image: {
    width: "27vw",
    height: "27vw",
    borderRadius: "50%", // makes image circular
    objectFit: "cover",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(0, 0, 0, 1)",
  },
  title: {
    marginTop: "2px",
    fontSize: "clamp(2px, 4vw, 72px)",
    fontWeight: "400",
    paddingInline: "2px",
    wordWrap: "break-word",
  },
};
import { useNavigate } from "react-router-dom";
import { retriveValueByKey } from "../backend/appwriteFunctions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Background from "./Background";

const ImageCard = ({ uid }) => {
  const navigate = useNavigate();
  const [imageurl, setimageurl] = useState(null);
  const [username, setUsename] = useState(null);

  const handleClick = () => {
    console.log("clicked and leaded to ", `/profiledetails/${uid}`);
    navigate(`/profiledetails/${uid}`); // change route as needed
  };

  useEffect(() => {
    if (!uid) return;
    const loadprofilepic = async () => {
      const url = await retriveValueByKey(uid, "profilePicUrl");
      const username = await retriveValueByKey(uid, "name");
      setimageurl(url);
      setUsename(username);
    };
    loadprofilepic();
  }, [uid]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={styles.card}>
        <div style={styles.avatarWrapper} onClick={handleClick}>
          {imageurl ? (
            <img src={imageurl} alt="Profile picture" style={styles.image} />
          ) : (
            // <span style={styles.placeholderText}>Profile</span>
            <span style={styles.placeholderText}>
              {username?.[0]?.toUpperCase() || "?"}
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          maxWidth: "50vw",
          marginTop: "10px",
          backgroundColor: "#6beef79e",
          width: "100%",
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(0, 0, 0, 1)",

          borderRadius: "20px",
        }}
      >
        <h4 style={{ ...styles.title, maxWidth: "48vw" }}>{username}</h4>
      </div>
    </div>
  );
};

export default ImageCard;
export { styles };
