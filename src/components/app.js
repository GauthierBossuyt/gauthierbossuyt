import { useState, useRef } from "react";
import Welcome from "./welcome";
import Navigation from "./navigation";
import Library from "./library";
import { act } from "react-dom/test-utils";

document.body.onmousedown = (e) => {
  if (e.button === 1) return false;
};

let smallWidth = 157;
let bigWidth = 760;

export default function App() {
  const A = useRef(null);
  const B = useRef(null);
  let active = A;
  let start = 0;
  let direction = "left";
  let buffer = 150;

  document.body.onscroll = (e) => {
    let position = { x: window.scrollX, y: window.scrollX + window.innerWidth };
    let treshold = {
      left: start + buffer,
      right: active.current.clientWidth - buffer,
    };
    let prevActive = active;
    //goes right
    if (
      treshold.left < position.x &&
      treshold.right < position.y &&
      direction !== "right"
    ) {
      direction = "right";
      swapActive();
      active.current.style.left = `${start + prevActive.current.clientWidth}px`;

      //goes left
    } else if (
      treshold.left > position.x &&
      treshold.right > position.y &&
      direction !== "left"
    ) {
      direction = "left";
      swapActive();
      console.log(direction, active, prevActive);
      prevActive.current.style.left = `${start - active.current.clientWidth}px`;
    }
  };

  let swapActive = () => {
    if (active === A) {
      active = B;
    } else if (active === B) {
      active = A;
    }
    return active;
  };

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
      window.scrollBy({ left: -widthContainer, behavior: "smooth" });
    }
  };

  let changeDirection = (event) => {
    if (event.deltaY !== 0) {
      window.scrollBy({ left: event.deltaY * 2.5, behavior: "smooth" });
    }
    if (event.deltaX !== 0) {
      window.scrollBy({ left: event.deltaX * 2.5, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div id="A" className="surface" ref={A} onWheelCapture={changeDirection}>
        <div className="content">
          <Navigation />
          <Welcome />
        </div>
        <Library onResize={changeWidth} surface={A} />
      </div>
      <div id="B" className="surface" ref={B} onWheelCapture={changeDirection}>
        <div className="content">
          <Navigation />
          <Welcome />
        </div>
        <Library onResize={changeWidth} surface={B} />
      </div>
    </div>
  );
}
