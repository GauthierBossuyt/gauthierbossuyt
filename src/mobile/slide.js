export default function Slide(props) {
  return (
    <div className="slide">
      <div className="image">
        <div className="up"></div> <div className="down"></div>
        <div
          className="img"
          onClick={() => {
            window.open(props.project.url, "_blank");
          }}
        >
          <img src={props.project.image} alt={props.project.name} />
        </div>
      </div>
    </div>
  );
}
