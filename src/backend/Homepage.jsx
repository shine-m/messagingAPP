import { Button, Card, CardImg } from "reactstrap";
import { useState } from "react";
import { styleCardImage } from "../styles/tansitions";
import { inc, dec, inpvalue } from "../redux/counterslice";
import { useSelector, useDispatch } from "react-redux";

import Chat from "./chat";

function Image({ count }) {
  // const imagedict = useSelector((state) => state.imageDir.imageDict);
  const [hover, setHover] = useState(false);
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
export default function Home() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-9 me-auto">
          <div className="row min-vh-100">
            <div className="d-flex align-items-center justify-content-center  gap-3">
              {/* <Button onClick={() => setcount((parseInt(count, 10) || 1) - 1)}> */}
              <Button onClick={() => dispatch(dec())}>
                <h3>-</h3>
              </Button>
              <span
                style={{ background: "", borderRadius: "30%", padding: "10px" }}
              >
                <h1 className="m-0">
                  <input
                    type="number"
                    style={{ width: "100px" }}
                    value={count}
                    onChange={(e) => {
                      dispatch(inpvalue(e.target.value));
                    }}
                  ></input>
                </h1>
              </span>
              <Button onClick={() => dispatch(inc())}>
                <h3>+</h3>
              </Button>
            </div>
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
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-3 ">
          <div
            style={{
              background: "#ede32b58",
              width: "25vw",
              //   height: "600px",
              height: "80vh",
              overflow: "auto", // optional: crop if image is bigger
              display: "flex",
              marginTop: "10vh",
              // alignItems: "center",
              justifyContent: "center",
              border: "2px groove",
              borderRadius: "6px",
              boxShadow:
                " 1vw 2vh 18px 4px rgba(0, 0, 255, 0.3), inset -1vw -4vh 18px 4px rgba(38, 138, 188, 0.3)",
            }}
          >
            {/* <h1>Connections</h1> */}
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
