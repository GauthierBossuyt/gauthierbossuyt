import { useEffect, useRef, useState } from "react";
import Welcome from "./welcome";
import Navigation from "./navigation";
import Library from "./library";

let smallWidth = 157;
let bigWidth = 760;

export default function App() {
    const A = useRef(null);
    const B = useRef(null);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([null]);
    const [width, setWidth] = useState();
    const [current, setCurrent] = useState(A);
    const [target, setTarget] = useState(B);
    const [change, setChange] = useState(true);
    const [direction, setDirection] = useState("");
    const [prevDirection, setPrevDirection] = useState("");
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
        setCurrentAndTarget();
        SetMiddle();
        MoveContainer();
    };

    useEffect(() => {
        async function fetchData() {
            fetch("http://localhost/projects")
                .then((resp) => resp.json())
                .then((resp) => {
                    let favos = resp.filter((project) => project.favourite);
                    setData(favos);
                    let Q = favos.length - 1;
                    let total = 157 * Q + 760;
                    setWidth(total);
                    A.current.style.width = `calc(100vw + ${total}px)`;
                    B.current.style.width = `calc(100vw + ${total}px)`;
                    B.current.style.left = `calc((100vw + ${total}px) * -1)`;
                    let array = [];
                    for (let i = 0; i < favos.length; i++) {
                        if (i === 0) {
                            array.push(true);
                        } else {
                            array.push(false);
                        }
                    }
                    setStatus(array);
                })
                .then(() => {
                    setpos({
                        A: { start: 0, end: A.current.clientWidth },
                        B: { start: B.current.clientWidth, end: 0 },
                    });
                });
        }
        fetchData();
    }, []);

    const changePosWindow = () => {
        setWindowPos({
            x: window.scrollX,
            y: window.scrollX + window.innerWidth,
            z: window.scrollX + window.innerWidth / 2,
        });
    };

    const setCurrentAndTarget = () => {
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

    const SetMiddle = () => {
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

    const MoveContainer = () => {
        if (change) {
            if (direction === "right") {
                target.current.style.left = `${pos[current.current.id].end}px`;
                let data = pos;
                data[target.current.id] = {
                    start: pos[current.current.id].end,
                    end: pos[current.current.id].end + B.current.clientWidth,
                };
                setpos(data);
            } else if (direction === "left") {
                target.current.style.left = `${
                    pos[current.current.id].start - target.current.clientWidth
                }px`;
                let data = pos;
                data[target.current.id] = {
                    start:
                        pos[current.current.id].start - B.current.clientWidth,
                    end: pos[current.current.id].start,
                };
                setpos(data);
            }
        }
        setPrevDirection(direction);
    };

    const changeDirection = (event) => {
        if (event.deltaY !== 0) {
            window.scrollBy({ left: event.deltaY * 2.5, behavior: "smooth" });
        }
        if (event.deltaX !== 0) {
            window.scrollBy({ left: event.deltaX * 2.5, behavior: "smooth" });
        }
    };

    return (
        <div onWheelCapture={changeDirection}>
            <div id="A" className="surface" ref={A}>
                <div className="content">
                    <Navigation />
                    <Welcome />
                </div>
                <Library data={data} status={status} width={width} />
            </div>
            <div id="B" className="surface" ref={B}>
                <div className="content">
                    <Navigation />
                    <Welcome />
                </div>
                <Library data={data} status={status} width={width} />
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
