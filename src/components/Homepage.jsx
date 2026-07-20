import { Button, Card, CardImg } from "reactstrap";
import { useEffect, useState } from "react";
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

  // console.log("uid", passedUid, "other uid", selectedUser);
  return (
    <div
      className="container"
      style={{ maxHeight: "100vh", maxWidth: "100vw" }}
    >
      <div className="row">
        <div className="col-12 col-sm-9 me-auto">
          <div className="row min-vh-100">
            <div
              style={{
                width: "80vw",
                //   height: "600px",
                height: "100vh",
                overflow: "auto", // optional: crop if image is bigger
                display: "flex",
                margin: "auto",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image count={count} />
              {/* comment this line to hide erotic images */}
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
        <div className="col-12 col-sm-3 mt-2">
          <div>{/* <ImageCard uid={currentUid} />{" "} */}</div>
          <div
          // style={{
          //   background: "#ede32b58",
          //   width: "25vw",
          //   //   height: "600px",
          //   height: "80vh",
          //   overflow: "auto", // optional: crop if image is bigger
          //   display: "flex",
          //   marginTop: "3vh", // was 10 before adding profile menu
          //   // alignItems: "center",
          //   justifyContent: "center",
          //   border: "2px groove",
          //   borderRadius: "6px",
          //   boxShadow:
          //     " 1vw 2vh 18px 4px rgba(0, 0, 255, 0.3), inset -1vw -4vh 18px 4px rgba(38, 138, 188, 0.3)",
          // }}
          >
            {/* <h1>Connections</h1> */}
            <Chat setSelectedUser={setSelectedUser} currentUid={currentUid} />
          </div>
        </div>
      </div>
    </div>
  );
}
