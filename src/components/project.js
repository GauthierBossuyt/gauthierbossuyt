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
    <div
      className={props.status ? "project_bg" : "project_sm"}
      onClick={props.onClick}
    >
      <h1 id="name">{project.name}</h1>
      <h1 id="year">{project.year}</h1>
      <div className={props.status ? "shown info" : "hidden info"}>
        <h2>{project.client}</h2>
        <p>{project.description}</p>
        <p className={project.collaborators.length > 0 ? "shown" : "hidden"}>
          In collaboration with {convertDataToString(project.collaborators)}
        </p>
        <button
          className={project.url.length > 0 ? "shown" : "hidden"}
          onClick={() => {
            window.location.href = "https://google.com";
          }}
        >
          Go to site
        </button>
      </div>
      <img src={project.image} alt={project.name} id={project.id} />
    </div>
  );
}
