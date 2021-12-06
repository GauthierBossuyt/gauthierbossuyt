export default function Project(props) {
    let project = props.data;

    let convertDataToString = (data) => {
        let string = "";
        data.forEach((element, index) => {
            if (index === 0) {
                string += " " + element;
            } else {
                string += " & " + element;
            }

            if (index === data.length - 1) {
                string += ".";
            }
        });

        return string;
    };

    return (
        <div className={props.status ? "project_bg" : "project_sm"}>
            <h1 className="name" id={project.id} onClick={props.onClick}>
                {project.name}
            </h1>
            <h1 className="year" id={project.id} onClick={props.onClick}>
                {project.year}
            </h1>
            <div className={props.status ? "shown info" : "hidden info"}>
                <h2>{project.client}</h2>
                <p>{project.description}</p>
                <p
                    className={
                        project.collaborators.length > 0 ? "shown" : "hidden"
                    }
                >
                    In collaboration with
                    {convertDataToString(project.collaborators)}
                </p>
                <button
                    className={project.url.length > 0 ? "shown" : "hidden"}
                    onClick={() => {
                        window.open("https://google.com", "target_");
                    }}
                >
                    Go to site
                </button>
            </div>
            <img
                src={project.image}
                alt={project.name}
                onClick={props.onClick}
                id={project.id}
            />
        </div>
    );
}
