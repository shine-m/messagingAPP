// import { getAllKeyValues } from "../backend/appwriteFunctions";
// import { useState, useEffect } from "react";
// export default function Chat({ setSelectedUser }) {
//   const [items, setItems] = useState([]);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await getAllKeyValues();

//       if (result.success) {
//         setItems(result.documents);
//         setCount(result.total);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleItemClick = (otheruser) => {
//     setSelectedUser(otheruser);
//   };
//   return (
//     <div>
//       <div>
//         <div
//           style={{
//             // maxWidth: "100%",
//             margin: "0 auto",
//             width: "25vw",
//             backgroundColor: "#61bdcb",
//             // backgroundSize: "cover",
//           }}
//         >
//           <h2
//             style={{
//               display: "flex",
//               fontFamily: "Adobe Caslon Pro",
//               paddingTop: "20px",

//               justifyContent: "center",
//             }}
//           >
//             Users
//           </h2>
//         </div>

//         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//           {items.map((item) => (
//             <li
//               key={item.$id}
//               onClick={() => handleItemClick(item)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "14px",
//                 padding: "14px 18px",
//                 marginBottom: "12px",
//                 marginLeft: "12px",
//                 background:
//                   "linear-gradient(135deg, rgb(195, 222, 239), rgb(238, 240, 129))",
//                 color: "#141313",
//                 borderRadius: "14px",
//                 cursor: "pointer",
//                 width: "80%",
//                 boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
//                 transition: "transform 0.15s ease, box-shadow 0.15s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow =
//                   "0 10px 28px rgba(0,0,0,0.25)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
//               }}
//               onMouseDown={(e) => {
//                 e.currentTarget.style.transform = "scale(0.97)";
//               }}
//               onMouseUp={(e) => {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//               }}
//             >
//               {/* Key Circle */}
//               <div
//                 style={{
//                   minWidth: "42px",
//                   height: "42px",
//                   borderRadius: "50%",
//                   backgroundColor: "rgba(255,255,255,0.2)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: 700,
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 {/* {item.key} */}

//                 <img
//                   src={item.profilePicUrl}
//                   // src="logos/logo.png"
//                   alt="Profile"
//                   style={{
//                     // width: "100%",
//                     height: "100%",
//                     aspectRatio: 1 / 1,
//                     borderRadius: "50%", // makes image circular
//                     objectFit: "cover",
//                     cursor: "pointer",
//                     boxShadow: "0 0 15px rgba(0, 0, 0, 1)",
//                   }}
//                   // onClick={handleClick}
//                 />
//               </div>

//               {/* Value Rectangle */}
//               <div
//                 style={{
//                   flex: 1,
//                   padding: "10px 14px",
//                   borderRadius: "10px",
//                   backgroundColor: "rgba(255,255,255,0.15)",
//                   fontSize: "0.95rem",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {item.name}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
// ***************************************************************************

// import { getAllKeyValues } from "../backend/appwriteFunctions";
// import { useState, useEffect } from "react";
// import ImageCard from "./profile";

// export default function Chat({ setSelectedUser, currentUid }) {
//   const [items, setItems] = useState([]);
//   const [count, setCount] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await getAllKeyValues();

//       if (result.success) {
//         setItems(result.documents);
//         setCount(result.total);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleItemClick = (otheruser) => {
//     setSelectedUser(otheruser);
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         right: 0,
//         top: 0,
//         height: "100vh",
//         width: "25vw",
//         transform: visible ? "translateX(0)" : "translateX(100%)",
//         transition: "transform 0.3s ease",
//         backgroundColor: "white",
//         zIndex: 100,
//         overflowY: "auto",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#61bdcb",
//         }}
//       >
//         <div>
//           <ImageCard uid={currentUid} />
//         </div>
//         <h2
//           style={{
//             display: "flex",
//             fontFamily: "Adobe Caslon Pro",
//             paddingTop: "20px",
//             justifyContent: "center",
//           }}
//         >
//           Users
//         </h2>
//       </div>

//       <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//         {items.map((item) => (
//           <li
//             key={item.$id}
//             onClick={() => handleItemClick(item)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "14px",
//               padding: "14px 18px",
//               marginBottom: "12px",
//               marginLeft: "12px",
//               background:
//                 "linear-gradient(135deg, rgb(195, 222, 239), rgb(238, 240, 129))",
//               color: "#141313",
//               borderRadius: "14px",
//               cursor: "pointer",
//               width: "80%",
//               boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
//               transition: "transform 0.15s ease, box-shadow 0.15s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "translateY(-2px)";
//               e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.25)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "translateY(0)";
//               e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
//             }}
//             onMouseDown={(e) => {
//               e.currentTarget.style.transform = "scale(0.97)";
//             }}
//             onMouseUp={(e) => {
//               e.currentTarget.style.transform = "translateY(-2px)";
//             }}
//           >
//             <div
//               style={{
//                 minWidth: "42px",
//                 height: "42px",
//                 borderRadius: "50%",
//                 backgroundColor: "rgba(255,255,255,0.2)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 700,
//                 fontSize: "0.9rem",
//               }}
//             >
//               <img
//                 src={item.profilePicUrl}
//                 alt="Profile"
//                 style={{
//                   height: "100%",
//                   aspectRatio: 1 / 1,
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   cursor: "pointer",
//                   boxShadow: "0 0 15px rgba(0, 0, 0, 1)",
//                 }}
//               />
//             </div>

//             <div
//               style={{
//                 flex: 1,
//                 padding: "10px 14px",
//                 borderRadius: "10px",
//                 backgroundColor: "rgba(255,255,255,0.15)",
//                 fontSize: "0.95rem",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {item.name}
//             </div>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={() => setVisible(!visible)}
//         style={{
//           position: "fixed",
//           left: "-35px",
//           top: "50%",
//           zIndex: 101,
//           cursor: "pointer",
//         }}
//       >
//         {visible ? ">" : "<"}
//       </button>
//     </div>
//   );
// }

/************************* **************************************************************************/

import { getAllKeyValues } from "../backend/appwriteFunctions";
import { useState, useEffect } from "react";
import ImageCard from "./profile";

export default function Chat({ setSelectedUser, currentUid, hideDrawer }) {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllKeyValues();

      if (result.success) {
        setItems(result.documents);
        setCount(result.total);
      }
    }

    fetchData();
  }, []);

  const handleItemClick = (otheruser) => {
    setSelectedUser(otheruser);
    hideDrawer();
  };
  //starting to edit
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        overflowY: "auto",
      }}
    >
      {/* Profile Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
        }}
      >
        <ImageCard uid={currentUid} />
      </div>

      {/* Users Header */}
      <div
        style={{
          width: "95vw",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#61bdcb",
          }}
        >
          <h2
            style={{
              display: "flex",
              fontFamily: "Adobe Caslon Pro",
              paddingTop: "20px",
              justifyContent: "center",
            }}
          >
            Users
          </h2>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items
            .filter((item) => item.$id !== currentUid)
            .map((item) => (
              <li
                key={item.$id}
                onClick={() => handleItemClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 18px",
                  marginBottom: "12px",
                  marginLeft: "12px",
                  background:
                    "linear-gradient(135deg, rgb(195, 222, 239), rgb(238, 240, 129))",
                  color: "#141313",
                  borderRadius: "14px",
                  cursor: "pointer",
                  width: "80%",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 28px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.97)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
              >
                <div
                  style={{
                    minWidth: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  <img
                    src={item.profilePicUrl}
                    alt="Profile"
                    style={{
                      height: "100%",
                      aspectRatio: 1 / 1,
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                      boxShadow: "0 0 15px rgba(0, 0, 0, 1)",
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    fontSize: "0.95rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
