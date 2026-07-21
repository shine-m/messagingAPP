import React from "react";
import { useChatMessages } from "../hooks/useChatMessages";
import MessageList from "./MessageList";
import NavArrows from "./NavArrows";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  chatId,
  currentUserId,
  currentUserName,
  selectedUser,
}) {
  const {
    messages,
    loading,
    hasMoreOlder,
    atLatest,
    newMessageBadge,
    loadOlder,
    loadNewer,
    jumpToLatest,
  } = useChatMessages(chatId);

  return (
    <div className="chat-window" style={{ maxHeight: "calc(100vh - 64px)" }}>
      <div className="chat-header">
        <span>{selectedUser.name}</span>
        <NavArrows
          onOlder={loadOlder}
          onNewer={loadNewer}
          onJumpToLatest={jumpToLatest}
          hasMoreOlder={hasMoreOlder}
          atLatest={atLatest}
          newMessageBadge={newMessageBadge}
          loading={loading}
        />
      </div>

      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        loading={loading}
      />

      <MessageInput
        chatId={chatId}
        senderId={currentUserId}
        senderName={currentUserName}
        onSent={jumpToLatest}
      />
    </div>
  );
}
