import React from "react";
import { storage, BUCKET_ID } from "../appwriteConfig";

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message, isOwn }) {
  const { type, text, imageFileId, senderName, $createdAt } = message;

  let imageUrl = null;
  let downloadUrl = null;
  if ((type === "image" || type === "mixed") && imageFileId) {
    // Resized preview — cheaper to load than the original for chat bubbles
    // imageUrl = storage.getFilePreview(BUCKET_ID, imageFileId, 480); free plan does not support this functionality
    imageUrl = storage.getFileView(BUCKET_ID, imageFileId);
    downloadUrl = storage.getFileDownload(BUCKET_ID, imageFileId);
    console.log(imageUrl);
  }

  return (
    <div
      className={`bubble-row ${
        isOwn ? "own" : imageUrl ? "other.image" : "other"
      }`}
    >
      <div className="bubble">
        {!isOwn && senderName && (
          <div className="bubble-sender">{senderName}</div>
        )}
        {imageUrl && (
          <div
            style={{
              position: "relative",
            }}
          >
            {/* Download button */}
            <a
              href={downloadUrl}
              download
              style={downloadIconStyle}
              title="Download image"
            >
              ⬇
            </a>

            {/* Image */}
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              <img src={imageUrl} alt="Attachment" style={messageImageStyle} />
            </a>
          </div>
        )}
        {text && <div className="bubble-text">{text}</div>}
        <div className="bubble-time">{formatTime($createdAt)}</div>
      </div>
    </div>
  );
}
const messageImageStyle = {
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "contain",
  borderRadius: "2px",
  boxShadow: "0 0 15px rgba(0, 0, 0, 1)",
};

const downloadIconStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 2,
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "rgba(0,0,0,0.65)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  color: "#fff",
  fontSize: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,.25)",
  transition: "transform .2s ease, background .2s ease",
};
