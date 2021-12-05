import instagram from "../../imgs/instagram.svg";
import linkedin from "../../imgs/linkedin.svg";
import spotify from "../../imgs/spotify.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="icons">
        <img src={linkedin} />
        <img src={instagram} />
        <img src={spotify} />
      </div>

      <h1 id="name">Gauthier Bossuyt</h1>
    </div>
  );
}
