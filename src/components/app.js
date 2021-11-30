import React, { useRef } from "react";
import Welcome from "./welcome";
import Navigation from "./navigation";
import Library from "./library";

let smallWidth = 157;
let bigWidth = 760;

export default function App() {
  const surface = useRef(null);

  let changeWidth = (Q, isOneOpen, library) => {
    let widthContainer = smallWidth * Q;
    if (isOneOpen) {
      widthContainer += bigWidth - smallWidth;
    }
    surface.current.style.width = `calc(100vw + ${widthContainer}px)`;
    library.current.style.width = `${widthContainer}px`;
    window.scrollBy({ left: widthContainer, behavior: "smooth" });
  };

  let test = (event) => {
    if (event.deltaY !== 0) {
      window.scrollBy({ left: event.deltaY * 1.5, behavior: "smooth" });
    }
    if (event.deltaX !== 0) {
      window.scrollBy({ left: event.deltaX * 1.5, behavior: "smooth" });
    }
  };

  return (
    <div className="surface" ref={surface} onWheelCapture={test}>
      <div className="content">
        <Navigation />
        <Welcome />
      </div>
      <Library onResize={changeWidth} />
    </div>
  );
}
