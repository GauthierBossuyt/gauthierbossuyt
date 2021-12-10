export default function Slide(props) {
    return (
        <div className="slide">
            <div className="image">
                <div className="up"></div> <div className="down"></div>
                <div className="img">
                    <img src={props.project.image} alt={props.project.name} />
                </div>
            </div>
        </div>
    );
}
