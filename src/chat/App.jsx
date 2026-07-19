import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { ID } from './appwriteConfig';

// Demo-only "identity" — in a real app this comes from Appwrite Account /
// your auth flow. We just generate/persist a fake user so the demo runs
// without wiring up full auth.
function getOrCreateDemoUser() {
  let id = localStorage.getItem('demo_user_id');
  let name = localStorage.getItem('demo_user_name');
  if (!id) {
    id = ID.unique();
    name = `Guest-${id.slice(0, 4)}`;
    localStorage.setItem('demo_user_id', id);
    localStorage.setItem('demo_user_name', name);
  }
  return { id, name };
}

export default function App() {
  const [user] = useState(getOrCreateDemoUser);
  const [chatId, setChatId] = useState('demo-room');
  const [chatIdInput, setChatIdInput] = useState('demo-room');

  return (
    <div className="app-shell">
      <div className="app-topbar">
        <div>
          <strong>Appwrite Chat Demo</strong>
          <span className="muted"> — signed in as {user.name}</span>
        </div>
        <form
          className="room-picker"
          onSubmit={(e) => {
            e.preventDefault();
            if (chatIdInput.trim()) setChatId(chatIdInput.trim());
          }}
        >
          <input
            value={chatIdInput}
            onChange={(e) => setChatIdInput(e.target.value)}
            placeholder="Room / chatId"
          />
          <button type="submit">Switch room</button>
        </form>
      </div>

      <ChatWindow chatId={chatId} currentUserId={user.id} currentUserName={user.name} />
    </div>
  );
}
