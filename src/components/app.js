import React, { useRef } from "react";
import Welcome from "./welcome";
import Navigation from "./navigation";
import Library from "./library";

let smallWidth = 157;
let bigWidth = 760;

export default function App() {
  const A = useRef(null);
  const B = useRef(null);

  let changeWidth = (Q, isOneOpen, library, surface) => {
    let widthContainer = smallWidth * Q;
    if (isOneOpen) {
      widthContainer += bigWidth - smallWidth;
    }

    surface.current.style.width = `calc(100vw + ${widthContainer}px)`;
    library.current.style.width = `${widthContainer}px`;
    if (isOneOpen) {
      window.scrollBy({ left: widthContainer, behavior: "smooth" });
    } else {
      window.scrollBy({ left: -(widthContainer * 2.2), behavior: "smooth" });
    }
  };

  let test = (event) => {
    if (event.deltaY !== 0) {
      window.scrollBy({ left: event.deltaY * 2.5, behavior: "smooth" });
    }
    if (event.deltaX !== 0) {
      window.scrollBy({ left: event.deltaX * 2.5, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div id="A" className="surface" ref={A} onWheelCapture={test}>
        <div className="content">
          <Navigation />
          <Welcome />
        </div>
        <Library onResize={changeWidth} surface={A} />
      </div>
      <div id="B" className="surface" ref={B} onWheelCapture={test}>
        <div className="content">
          <Navigation />
          <Welcome />
        </div>
        <Library onResize={changeWidth} surface={B} />
      </div>
    </div>
  );
}
