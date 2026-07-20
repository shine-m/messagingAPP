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
// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

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

  return (
    <div
      className="container"
      style={{
        maxHeight: "100vh",
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
          right: chatOpen ? 0 : "-270px",
          width: "300px",
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
            left: "-30px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "30px",
            height: "90px",
            background: "#ddd",
            borderRadius: "12px 0 0 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            userSelect: "none",
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

// export default function Home() {
//   const { passedUid } = useParams();
//   const [currentUid, setCurrentUid] = usePersistentState(
//     "currentuid",
//     passedUid
//   );
//   useEffect(() => {
//     if (passedUid) setCurrentUid(passedUid);
//   }, [passedUid]);

//   const count = useSelector((state) => state.counter.count);
//   const dispatch = useDispatch();

//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <div
//       className="container"
//       style={{ maxHeight: "100vh", maxWidth: "100vw" }}
//     >
//       <div className="row">
//         <div className="col-12 col-sm-9 me-auto">
//           <div className="row min-vh-100">
//             <div
//               style={{
//                 width: "80vw",
//                 //   height: "600px",
//                 height: "100vh",
//                 overflow: "auto", // optional: crop if image is bigger
//                 display: "flex",
//                 margin: "auto",
//                 // alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Image count={count} />
//               {selectedUser && (
//                 <ChatWindow
//                   chatId={
//                     passedUid > selectedUser.uid
//                       ? passedUid + selectedUser.uid
//                       : selectedUser.uid + passedUid
//                   }
//                   currentUserId={passedUid}
//                   currentUserName={passedUid}
//                   selectedUser={selectedUser}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="col-12 col-sm-3 mt-2">
//           <div>
//             <Chat setSelectedUser={setSelectedUser} currentUid={currentUid} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
