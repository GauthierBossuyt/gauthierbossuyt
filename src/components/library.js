import { useEffect, useState, useRef } from "react";

import Project from "./project";

export default function Library(props) {
    const [status, setStatus] = useState(
        new Array(props.data.length).fill(false)
    );
    const library = useRef(null);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    let clicked = (event) => {
        let newList = new Array(props.data.length).fill(false);
        if (!status[event.target.id - 1]) {
            newList[event.target.id - 1] = true;
        }

        setStatus(newList);
        props.onResize(
            props.data.length,
            newList.includes(true),
            library,
            props.surface
        );
    };

    return (
        <div className="library" id="library" ref={library}>
            {props.data.map((project, index) => (
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
