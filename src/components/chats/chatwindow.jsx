import { useEffect, useState } from "react";

export default function ChatWindow({ otherUser, currentUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, [otherUser]);

  const loadMessages = async () => {
    // Example dynamic structure
    const oldChats = [
      {
        id: 1,
        text: "Hello",
        senderId: otherUser.uid,
      },
      {
        id: 2,
        text: "Hi! How are you?",
        senderId: currentUser.uid,
      },
      {
        id: 3,
        text: "I'm fine. What about you?",
        senderId: otherUser.uid,
      },
      {
        id: 4,
        text: "Doing great!",
        senderId: currentUser.uid,
      },
    ];

    setMessages(oldChats);
  };

  if (otherUser)
    return (
      <div style={styles.chatWindow}>
        <h4>
          {otherUser.uid === currentUser.uid ? "Just You" : otherUser.name}
        </h4>

        <div style={styles.messagesContainer}>
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.uid;

            return (
              <div
                key={msg.id}
                style={{
                  ...styles.messageRow,
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    backgroundColor: isMe ? "#0084ff" : "#e4e6eb",
                    color: isMe ? "white" : "black",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

const styles = {
  chatWindow: {
    width: "100%",
    height: "500px",
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
  },

  messagesContainer: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  messageRow: {
    display: "flex",
  },

  messageBubble: {
    padding: "10px 14px",
    borderRadius: "18px",
    maxWidth: "60%",
    wordWrap: "break-word",
  },
};
