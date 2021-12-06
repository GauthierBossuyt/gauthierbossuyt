import { useEffect, useState, useRef } from "react";
import json from "../data/projects.json";
import Project from "./project";

export default function Library(props) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);
    const library = useRef(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((resp) => resp.json())
            .then(setData(json.projects))
            .then(() => {
                setStatus(new Array(json.projects.length).fill(false));
            });
    }, []);

    let clicked = (event) => {
        console.log(event.nativeEvent.path);
        let newList = new Array(json.projects.length).fill(false);
        if (!status[event.target.id - 1]) {
            newList[event.target.id - 1] = true;
        }

        setStatus(newList);
        props.onResize(
            json.projects.length,
            newList.includes(true),
            library,
            props.surface
        );
    };

    return (
        <div className="library" id="library" ref={library}>
            {data.map((project, index) => (
                <Project
                    data={project}
                    key={index}
                    onClick={clicked}
                    status={status[index]}
                />
            ))}
        </div>
    );
}
