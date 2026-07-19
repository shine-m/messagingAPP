import { Button, Card, CardImg } from "reactstrap";
import { useState } from "react";
import { styleCardImage } from "../public/styles/tansitions";
function Image({ count }) {
  const imagedict = {
    7: "../public/images/a.png",
    10: "../public/images/b.png",
    0: "../public/images/c.png",
    5: "../public/images/e.png",
    3: "../public/images/d.png",
  };
  const [hover, setHover] = useState(false);
  if (count in imagedict)
    return (
      <>
        <div>
          <CardImg
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            src={imagedict[count]}
            style={styleCardImage(hover)}
          ></CardImg>
        </div>
      </>
    );
}
function App() {
  const [count, setcount] = useState(0);
  return (
    <div className="row min-vh-100">
      <div className="d-flex align-items-center justify-content-center  gap-3">
        <Button onClick={() => setcount((parseInt(count, 10) || 1) - 1)}>
          <h3>-</h3>
        </Button>
        <span style={{ background: "", borderRadius: "30%", padding: "10px" }}>
          {/* <h1 className="m-0">count = {count}</h1> */}
          <h1 className="m-0">
            count ={" "}
            <input
              type="number"
              style={{ width: "100px" }}
              // placeholder={count}
              value={count}
              onChange={(e) => setcount(parseInt(e.target.value, 10) || "")}
            ></input>
          </h1>
        </span>
        <Button onClick={() => setcount((parseInt(count, 10) || 0) + 1)}>
          <h3>+</h3>
        </Button>
      </div>
      <div
        style={{
          width: "600px",
          height: "600px",
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
  );
}

export default App;
