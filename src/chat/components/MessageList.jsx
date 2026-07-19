import React from "react";
import MessageBubble from "./MessageBubble";
import { useRef, useEffect } from "react";

export default function MessageList({ messages, currentUserId, loading }) {
  if (loading && messages.length === 0) {
    return <div className="message-list-empty">Loading messages…</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="message-list-empty">No messages yet. Say hello!</div>
    );
  }

  // controls the auto scroll

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  //
  return (
    <div className="message-list">
      {messages.map((m) => (
        <MessageBubble
          key={m.$id}
          message={m}
          isOwn={m.senderId === currentUserId}
        />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
