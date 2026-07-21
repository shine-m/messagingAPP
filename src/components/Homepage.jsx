import { Button, Card, CardImg } from "reactstrap";
import { useEffect, useState, useRef } from "react";
import { styleCardImage } from "../styles/tansitions";
import { inc, dec, inpvalue } from "../redux/counterslice";
import { useSelector, useDispatch } from "react-redux";

import Chat from "./chat";
import ImageCard from "./profile";
import { useParams } from "react-router-dom";
// import ChatWindow from "./chats/chatwindow";
import ChatWindow from "../chat/components/ChatWindow";

function Image({ count }) {
  const [hover, setHover] = useState(false);
  return <></>;
  // const imagedict = useSelector((state) => state.imageDir.imageDict);
  // if (count in imagedict)
  return (
    <>
      <CardImg
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        src={
          count === "" // here if i dont use type equality then it does not permit 0 as count value as ""==0
            ? `/images/14.png`
            : `/images/${count}.png`
        }
        style={styleCardImage(hover)}
      ></CardImg>
    </>
  );
}

function usePersistentState(key, initialState) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);

    if (saved === null || saved === "undefined") {
      return initialState;
    }

    return saved;
  });

  useEffect(() => {
    if (state !== undefined) {
      localStorage.setItem(key, state);
    }
  }, [key, state]);

  return [state, setState];
}

export default function Home() {
  const { passedUid } = useParams();

  const [currentUid, setCurrentUid] = usePersistentState(
    "currentuid",
    passedUid
  );

  useEffect(() => {
    if (passedUid) setCurrentUid(passedUid);
  }, [passedUid]);

  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  // Drawer state
  const [chatOpen, setChatOpen] = useState(true);

  // Swipe support
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      setChatOpen(true); // swipe left
    } else if (diff < -50) {
      setChatOpen(false); // swipe right
    }
  };

  const DRAWER_WIDTH = "60vw";
  const HOOK_WIDTH = "5vw";

  return (
    <div
      className="container"
      style={{
        maxHeight: "90vh",
        maxWidth: "100vw",
      }}
    >
      <div className="row">
        <div className="col-12">
          <div className="row min-vh-100">
            <div
              style={{
                width: "80vw",
                height: "100vh",
                overflow: "auto",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              {/* <Image count={count} /> */}

              {selectedUser && (
                <ChatWindow
                  chatId={
                    passedUid > selectedUser.uid
                      ? passedUid + selectedUser.uid
                      : selectedUser.uid + passedUid
                  }
                  currentUserId={passedUid}
                  currentUserName={passedUid}
                  selectedUser={selectedUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Drawer */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "fixed",
          top: 0,
          // right: chatOpen ? 0 : "-270px",
          // width: "300px",
          right: chatOpen ? "0" : `calc(-${DRAWER_WIDTH} + ${HOOK_WIDTH})`,

          width: DRAWER_WIDTH,
          height: "100vh",
          background: "#fff",
          transition: "right 0.3s ease",
          zIndex: 1000,
          boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* Drawer Hook */}

        <div
          onClick={() => setChatOpen((prev) => !prev)}
          style={{
            position: "absolute",
            left: "-12px",
            top: "50%",
            transform: "translateY(-50%)",

            width: "12px",
            height: "120px",

            background: "linear-gradient(to bottom, #74ebd5, #9face6)",

            borderRadius: "20px 0 0 20px",

            cursor: "pointer",

            boxShadow: "0 0 10px rgba(0,0,0,0.25)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            transition: "all 0.25s ease",

            background: "aqua",
            width: "3vw",
            height: "100vh",
            left: "0px",
            zIndex: 1000,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = "18px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = "12px";
          }}
        >
          {chatOpen ? ">" : "<"}
        </div>

        <Chat
          setSelectedUser={setSelectedUser}
          currentUid={currentUid}
          hideDrawer={() => setChatOpen(false)}
        />
      </div>
    </div>
  );
}
