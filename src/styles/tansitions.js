function styleCardImage(hover) {
  return {
    maxHeight: "100%",
    width: "auto",
    border: hover ? "3px solid black" : "3px solid transparent",
    transition: "transform 1s ease, border 0.1s ease ,filter 1s ease",
    // transform: hover ? "scaleX(-1) rotateY(180deg)" : "rotateY(0deg)",
    // filter: hover ? "" : "",
    filter: hover
      ? "grayscale(0%) hue-rotate(0deg) "
      : "grayscale(50%) hue-rotate(270deg) blur(10px)",
    transformStyle: "preserve-3d",
    borderRadius: "2%",
  };
}

const navitemStyle = {
  backgroundColor: "#90ace0ff",
  borderRadius: "10px",
  padding: "0 6px ",
  width: "90%",
  border: "2px solid #ec40d2ff",
};

export { styleCardImage, navitemStyle };
