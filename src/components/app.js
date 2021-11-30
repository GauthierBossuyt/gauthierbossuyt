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
    window.scrollBy({ left: event.deltaY, behavior: "smooth" });
  };

  return (
    <div className="surface" ref={surface} onWheelCapture={test}>
      <div className="test">
        <Navigation />
        <Welcome />
      </div>
      <Library onResize={changeWidth} />
    </div>
  );
}
