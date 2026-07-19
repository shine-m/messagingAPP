import React from 'react';

export default function NavArrows({
  onOlder,
  onNewer,
  onJumpToLatest,
  hasMoreOlder,
  atLatest,
  newMessageBadge,
  loading,
}) {
  return (
    <div className="nav-arrows">
      <button
        className="arrow-btn"
        onClick={onOlder}
        disabled={loading || !hasMoreOlder}
        title="Load older messages"
      >
        ↑ Older
      </button>

      <button
        className="arrow-btn"
        onClick={onNewer}
        disabled={loading || atLatest}
        title="Load newer messages"
      >
        ↓ Newer
      </button>

      {newMessageBadge && (
        <button className="badge-btn" onClick={onJumpToLatest}>
          New messages ↓
        </button>
      )}
    </div>
  );
}
