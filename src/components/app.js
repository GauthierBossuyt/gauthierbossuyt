import { useEffect, useRef, useState } from "react";
import Welcome from "./welcome";
import Navigation from "./navigation";
import Library from "./library";
import json from "../data/projects.json";

let smallWidth = 157;
let bigWidth = 760;

export default function App() {
    const A = useRef(null);
    const [data, setData] = useState([]);
    const B = useRef(null);
    const [A_status, setAStatus] = useState([null]);
    const [B_status, setBStatus] = useState([null]);
    const [current, setCurrent] = useState(A);
    const [target, setTarget] = useState(B);
    const [change, setChange] = useState(true);
    const [direction, setDirection] = useState("left");
    const [order, setOrder] = useState({ 0: B, 1: A });
    const [pos, setpos] = useState({
        A: { start: 0, end: 0 },
        B: { start: 0, end: 0 },
    });
    const [windowPos, setWindowPos] = useState({
        x: window.scrollX,
        y: window.scrollX + window.innerWidth,
        z: window.scrollX + window.innerWidth / 2,
    });

    document.body.onmousedown = (e) => {
        if (e.button === 1) return false;
    };

    document.body.onscroll = (e) => {
        changePosWindow();
        setTargetAndCurrent();
        onWindowScroll();
        moveContainer();
    };

    useEffect(() => {
        async function fetchData() {
            fetch("https://jsonplaceholder.typicode.com/todos/1")
                .then((resp) => resp.json())
                .then((resp) => console.log(resp))
                .then(setData(json.projects))
                .then(() => {
                    setpos({
                        A: { start: 0, end: A.current.clientWidth },
                        B: { start: B.current.clientWidth, end: 0 },
                    });
                    setAStatus(new Array(data.length).fill(false));
                    setBStatus(new Array(data.length).fill(false));
                });
        }
        fetchData();
    }, []);

    let changePosWindow = () => {
        setWindowPos({
            x: window.scrollX,
            y: window.scrollX + window.innerWidth,
            z: window.scrollX + window.innerWidth / 2,
        });
    };

    let setTargetAndCurrent = () => {
        if (pos.A.start < windowPos.x && pos.A.end > windowPos.y) {
            setCurrent(A);
            setTarget(B);
            setChange(true);
        } else if (pos.B.start < windowPos.x && pos.B.end > windowPos.y) {
            setCurrent(B);
            setTarget(A);
            setChange(true);
        } else {
            setChange(false);
        }
    };

    let onWindowScroll = () => {
        let middle;
        if (current === B) {
            middle = pos.B.start + B.current.clientWidth / 2;
        } else if (current === A) {
            middle = pos.A.start + A.current.clientWidth / 2;
        }

        if (middle > windowPos.z) {
            setDirection("left");
        } else if (middle < windowPos.z) {
            setDirection("right");
        }
    };

    let moveContainer = () => {
        if (target === B && change) {
            if (direction === "left") {
                B.current.style.left = `${
                    pos.A.start - B.current.clientWidth
                }px`;
                setpos({
                    ...pos,
                    B: {
                        start: pos.A.start - B.current.clientWidth,
                        end: pos.A.start,
                    },
                });
                setOrder({ 0: B, 1: A });
            } else if (direction === "right") {
                B.current.style.left = `${pos.A.end}px`;
                setpos({
                    ...pos,
                    B: {
                        start: pos.A.end,
                        end: pos.A.end + B.current.clientWidth,
                    },
                });
                setOrder({ 0: A, 1: B });
            }
            setBStatus(new Array(data.length).fill(false));
        } else if (target === A && change) {
            if (direction === "left") {
                A.current.style.left = `${
                    pos.B.start - A.current.clientWidth
                }px`;
                setpos({
                    ...pos,
                    A: {
                        start: pos.B.start - A.current.clientWidth,
                        end: pos.B.start,
                    },
                });
                setOrder({ 0: A, 1: B });
            } else if (direction === "right") {
                A.current.style.left = `${pos.B.end}px`;
                setpos({
                    ...pos,
                    A: {
                        start: pos.B.end,
                        end: pos.B.end + B.current.clientWidth,
                    },
                });
                setOrder({ 0: B, 1: A });
            }
            setAStatus(new Array(data.length).fill(false));
        }
    };

    let changeWidth = (Q, isOneOpen, library, surface) => {
        console.log(isOneOpen);
        let widthContainer = smallWidth * Q;
        if (isOneOpen) {
            widthContainer += bigWidth - smallWidth;
        }

        surface.current.style.width = `calc(100vw + ${widthContainer}px)`;
        library.current.style.width = `${widthContainer}px`;
        if (isOneOpen) {
            // if (target === B) {
            //     pos.B.start = pos.B.start + bigWidth - smallWidth;
            //     pos.B.end = pos.B.end + bigWidth - smallWidth;
            //     B.current.style.left = `${pos.B.start}px`;
            // } else if (target === A) {
            //     pos.A.start = pos.A.start + bigWidth - smallWidth;
            //     pos.A.end = pos.A.end + bigWidth - smallWidth;
            //     A.current.style.left = `${pos.A.start}px`;
            // }
            window.scrollBy({
                left: bigWidth - smallWidth,
                behavior: "smooth",
            });
        } else {
            // if (target === B) {
            //     pos.B.start = pos.B.start - bigWidth + smallWidth;
            //     pos.B.end = pos.B.end - bigWidth + smallWidth;
            //     B.current.style.left = `${pos.B.start}px`;
            // } else if (target === A) {
            //     pos.A.start = pos.A.start - bigWidth + smallWidth;
            //     if (pos.A.start < 0) {
            //         pos.A.start = 0;
            //     }
            //     pos.A.end = pos.A.end - bigWidth + smallWidth;
            //     A.current.style.left = `${pos.A.start}px`;
            //}
            window.scrollBy({
                left: -bigWidth + smallWidth,
                behavior: "smooth",
            });
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
            <div
                id="A"
                className="surface"
                ref={A}
                onWheelCapture={changeDirection}
            >
                <div className="content">
                    <Navigation />
                    <Welcome />
                </div>
                <Library
                    onResize={changeWidth}
                    surface={A}
                    data={data}
                    status={A_status}
                />
            </div>
            <div
                id="B"
                className="surface"
                ref={B}
                onWheelCapture={changeDirection}
            >
                <div className="content">
                    <Navigation />
                    <Welcome />
                </div>
                <Library
                    onResize={changeWidth}
                    surface={B}
                    data={data}
                    status={B_status}
                />
            </div>
            {window.innerWidth < 1000 ? (
                <h1>
                    Oh, Something went wrong <br /> Try refreshing the page
                </h1>
            ) : (
                ""
            )}
        </div>
    );
}
