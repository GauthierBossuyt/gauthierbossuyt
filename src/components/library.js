import { useEffect, useState, useRef } from "react";

import Project from "./project";

export default function Library(props) {
  const [status, setStatus] = useState(
    new Array(props.data.length).fill(false)
  );
  const library = useRef(null);
  const [test, setTest] = useState(true);

  useEffect(() => {
    setStatus(props.status);
    library.current.style.width = `${props.width}px`;
  }, [props.status, props.width]);

  let clicked = (event) => {
    let id = event.target.id;
    let current = status.indexOf(true);

    if (id !== current) {
      let array = status;
      array[current] = false;
      array[id] = true;
      setStatus(array);
      setTest(!test);
    }
  };

  return (
    <div className={test ? "library" : "library"} id="library" ref={library}>
      {props.data.map((project, index) => (
        <Project
          data={project}
          index={index}
          key={project._id}
          onClick={clicked}
          status={status[index]}
        />
      ))}
    </div>
  );
}
