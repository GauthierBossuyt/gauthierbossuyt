import instagram from "../../imgs/instagram.svg";
import linkedin from "../../imgs/linkedin.svg";
import spotify from "../../imgs/spotify.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="icons">
        <img
          src={linkedin}
          alt="linkedin icon"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/gauthier-bossuyt/",
              "_blank"
            );
          }}
        />
        <img
          src={instagram}
          alt="instagram icon"
          onClick={() => {
            window.open("https://www.instagram.com/gauthierbossuyt/", "_blank");
          }}
        />
        <img
          src={spotify}
          alt="spotify icon"
          onClick={() => {
            window.open(
              "https://open.spotify.com/user/1145441457?si=10429d368c314f8a",
              "_blank"
            );
          }}
        />
      </div>

      <h1 id="name">Gauthier Bossuyt</h1>
    </div>
  );
}
