import React, { useState, useRef } from 'react';
import { databases, storage, DATABASE_ID, MESSAGES_COLLECTION_ID, BUCKET_ID, ID } from '../appwriteConfig';

export default function MessageInput({ chatId, senderId, senderName, onSent }) {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef(null);

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;
    setSending(true);

    try {
      let imageFileId = null;
      if (imageFile) {
        const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), imageFile);
        imageFileId = uploaded.$id;
      }

      const type = imageFile && text.trim() ? 'mixed' : imageFile ? 'image' : 'text';

      await databases.createDocument(DATABASE_ID, MESSAGES_COLLECTION_ID, ID.unique(), {
        chatId,
        senderId,
        senderName,
        type,
        text: text.trim() || null,
        imageFileId,
      });

      setText('');
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onSent?.();
    } catch (err) {
      console.error('Failed to send message', err);
      alert('Failed to send message. See console for details.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="message-input" onSubmit={handleSend}>
      {imageFile && (
        <div className="attachment-preview">
          <img src={URL.createObjectURL(imageFile)} alt="preview" />
          <button type="button" onClick={() => setImageFile(null)}>✕</button>
        </div>
      )}
      <div className="message-input-row">
        <label className="attach-btn" title="Attach image">
          📎
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
        />
        <button type="submit" disabled={sending || (!text.trim() && !imageFile)}>
          {sending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  );
}
