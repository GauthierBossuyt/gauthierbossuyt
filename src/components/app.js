import { useEffect, useRef } from "react";
import Welcome from "./welcome";
import Navigation from "./navigation";
import Library from "./library";

let smallWidth = 157;
let bigWidth = 760;

export default function App() {
  const A = useRef(null);
  const B = useRef(null);
  let pos = {
    A: { start: 0, end: 0 },
    B: { start: 0, end: 0 },
  };
  let windowPos = {
    x: window.scrollX,
    y: window.scrollX + window.innerWidth,
    z: window.scrollX + window.innerWidth / 2,
  };
  let current = A;
  let target = B;
  let change = true;
  let direction = "left";

  document.body.onmousedown = (e) => {
    if (e.button === 1) return false;
  };

  document.body.onscroll = (e) => {
    changePosWindow();
    setTargetAndCurrent();
    setDirection();
    moveContainer();
  };

  useEffect(() => {
    pos = {
      A: { start: 0, end: A.current.clientWidth },
      B: { start: 0 - B.current.width * -1, end: 0 },
    };
  });

  let changePosWindow = () => {
    windowPos = {
      x: window.scrollX,
      y: window.scrollX + window.innerWidth,
      z: window.scrollX + window.innerWidth / 2,
    };
  };

  let setTargetAndCurrent = () => {
    if (pos.A.start < windowPos.x && pos.A.end > windowPos.y) {
      current = A;
      target = B;
      change = true;
    } else if (pos.B.start < windowPos.x && pos.B.end > windowPos.y) {
      current = B;
      target = A;
      change = true;
    } else {
      change = false;
    }
  };

  let setDirection = () => {
    let middle;
    if (current === B) {
      middle = pos.B.start + B.current.clientWidth / 2;
    } else if (current === A) {
      middle = pos.A.start + A.current.clientWidth / 2;
    }

    if (middle > windowPos.z) {
      direction = "left";
    } else if (middle < windowPos.z) {
      direction = "right";
    }
  };

  let moveContainer = () => {
    if (target === B && change) {
      if (direction === "left") {
        B.current.style.left = `${pos.A.start - B.current.clientWidth}px`;
        pos = {
          ...pos,
          B: {
            start: pos.A.start - B.current.clientWidth,
            end: pos.A.start,
          },
        };
      } else if (direction === "right") {
        B.current.style.left = `${pos.A.end}px`;
        pos = {
          ...pos,
          B: {
            start: pos.A.end,
            end: pos.A.end + B.current.clientWidth,
          },
        };
      }
    } else if (target === A && change) {
      if (direction === "left") {
        A.current.style.left = `${pos.B.start - A.current.clientWidth}px`;
        pos = {
          ...pos,
          A: { start: pos.B.start - A.current.clientWidth, end: pos.B.start },
        };
      } else if (direction === "right") {
        A.current.style.left = `${pos.B.end}px`;
        pos = {
          ...pos,
          A: {
            start: pos.B.end,
            end: pos.B.end + B.current.clientWidth,
          },
        };
      }
    }
  };

  let changeWidth = (Q, isOneOpen, library, surface) => {
    let widthContainer = smallWidth * Q;
    if (isOneOpen) {
      widthContainer += bigWidth - smallWidth;
    }

    surface.current.style.width = `calc(100vw + ${widthContainer}px)`;
    library.current.style.width = `${widthContainer}px`;
    if (isOneOpen) {
      window.scrollBy({ left: bigWidth, behavior: "smooth" });
    } else {
      window.scrollBy({ left: -bigWidth, behavior: "smooth" });
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
