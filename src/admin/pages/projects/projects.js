import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Project from "./project";

export default function Projects(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.projects);
    }, [props.projects]);

    return (
        <div className="admin-projects">
            <h1 id='title'>Projects</h1>
            {data.length > 0 ? (
                props.projects.map((project) => (
                    <Project key={project._id} project={project} />
                ))
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}
