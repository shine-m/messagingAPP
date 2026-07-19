import { useState, useEffect, useCallback, useRef } from 'react';
import {
  client,
  databases,
  DATABASE_ID,
  MESSAGES_COLLECTION_ID,
  PAGE_SIZE,
  Query,
} from '../appwriteConfig';

/**
 * Encapsulates the "windowed pagination with arrows" scheme:
 *  - Always shows exactly PAGE_SIZE (10) messages.
 *  - ↑ loadOlder(): slides the window back in time.
 *  - ↓ loadNewer(): slides the window forward in time.
 *  - New realtime messages only get appended live if the user is
 *    currently viewing the newest window (atLatest === true).
 *    Otherwise a "new messages" flag is set so the UI can show a badge.
 */
export function useChatMessages(chatId) {
  const [messages, setMessages] = useState([]); // current window, oldest → newest
  const [loading, setLoading] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [atLatest, setAtLatest] = useState(true);
  const [newMessageBadge, setNewMessageBadge] = useState(false);

  // keep latest values available inside the realtime callback without
  // re-subscribing on every render
  const atLatestRef = useRef(atLatest);
  atLatestRef.current = atLatest;

  const fetchLatest = useCallback(async () => {
    if (!chatId) return;
    setLoading(true);
    try {
      const res = await databases.listDocuments(DATABASE_ID, MESSAGES_COLLECTION_ID, [
        Query.equal('chatId', chatId),
        Query.orderDesc('$createdAt'),
        Query.limit(PAGE_SIZE),
      ]);
      const batch = res.documents.reverse(); // oldest → newest for display
      setMessages(batch);
      setAtLatest(true);
      setHasMoreOlder(res.documents.length === PAGE_SIZE); // naive guess, corrected on loadOlder
      setNewMessageBadge(false);
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  const loadOlder = useCallback(async () => {
    if (!chatId || messages.length === 0) return;
    setLoading(true);
    try {
      const oldestId = messages[0].$id;
      const res = await databases.listDocuments(DATABASE_ID, MESSAGES_COLLECTION_ID, [
        Query.equal('chatId', chatId),
        Query.orderDesc('$createdAt'),
        Query.cursorAfter(oldestId),
        Query.limit(PAGE_SIZE),
      ]);
      if (res.documents.length === 0) {
        setHasMoreOlder(false);
        return;
      }
      const batch = res.documents.reverse();
      setMessages(batch);
      setAtLatest(false);
      setHasMoreOlder(res.documents.length === PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, [chatId, messages]);

  const loadNewer = useCallback(async () => {
    if (!chatId || messages.length === 0) return;
    setLoading(true);
    try {
      const newestId = messages[messages.length - 1].$id;
      const res = await databases.listDocuments(DATABASE_ID, MESSAGES_COLLECTION_ID, [
        Query.equal('chatId', chatId),
        Query.orderAsc('$createdAt'),
        Query.cursorAfter(newestId),
        Query.limit(PAGE_SIZE),
      ]);
      if (res.documents.length === 0) {
        setAtLatest(true);
        return;
      }
      const batch = res.documents; // already ascending
      setMessages(batch);
      setHasMoreOlder(true);
      const reachedEnd = batch.length < PAGE_SIZE;
      setAtLatest(reachedEnd);
      if (reachedEnd) setNewMessageBadge(false);
    } finally {
      setLoading(false);
    }
  }, [chatId, messages]);

  // initial load + reload when switching chats
  useEffect(() => {
    fetchLatest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  // realtime subscription
  useEffect(() => {
    if (!chatId) return;
    const channel = `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`;

    const unsubscribe = client.subscribe(channel, (response) => {
      const doc = response.payload;
      if (doc.chatId !== chatId) return;
      const isCreate = response.events.some((e) => e.endsWith('.create'));
      if (!isCreate) return;

      if (atLatestRef.current) {
        // user is viewing the live end — append directly, keep window at PAGE_SIZE
        setMessages((prev) => {
          const next = [...prev, doc];
          return next.length > PAGE_SIZE ? next.slice(next.length - PAGE_SIZE) : next;
        });
      } else {
        // user is scrolled back in history — don't disturb their view
        setNewMessageBadge(true);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const jumpToLatest = useCallback(() => {
    fetchLatest();
  }, [fetchLatest]);

  return {
    messages,
    loading,
    hasMoreOlder,
    atLatest,
    newMessageBadge,
    loadOlder,
    loadNewer,
    jumpToLatest,
    refresh: fetchLatest,
  };
}
