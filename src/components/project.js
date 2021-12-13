import { useEffect } from "react/cjs/react.development";

export default function Project(props) {
    let project = props.data;

    useEffect(() => {
        console.log(props.status);
    }, [props.status]);

    let convertDataToString = (data) => {
        let string = "";
        data.forEach((element, index) => {
            if (index === 0) {
                string += " " + element.name;
            } else {
                string += " & " + element.name;
            }

            if (index === data.length - 1) {
                string += ".";
            }
        });

        return string;
    };

    return (
        <div className={props.status ? "project_bg" : "project_sm"}>
            <h1 className="name" id={props.index} onClick={props.onClick}>
                {project.name}
            </h1>
            <h1 className="year" id={props.index} onClick={props.onClick}>
                {project.year}
            </h1>
            <div className={props.status ? "shown info" : "hidden info"}>
                <h2>{project.client}</h2>
                <p>{project.description}</p>
                <div
                    id="collaborators"
                    className={
                        project.collaborators.length > 0 ? "shown" : "hidden"
                    }
                >
                    <p>In collaboration with</p>
                    {project.collaborators.map((person) => (
                        <p className="person"
                            onClick={() => {
                                window.open(person.url, "_target");
                            }}
                        >
                            {person.name}
                        </p>
                    ))}
                </div>
                <button
                    className={project.url.length > 0 ? "shown" : "hidden"}
                    onClick={() => {
                        window.open(project.url, "target_");
                    }}
                >
                    Go to site
                </button>
            </div>
            <img
                src={project.image}
                alt={project.name}
                onClick={props.onClick}
                id={props.index}
            />
        </div>
    );
}
