import Hamburger from "hamburger-react";
import Spotify from "../imgs/spotify.svg";
import Linkedin from "../imgs/linkedin.svg";
import Instagram from "../imgs/instagram.svg";
import { useState } from "react";

export default function Nav(props) {
  const [isMenuOpen, toggleMenu] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const openMenu = (toggled) => {
    toggled ? toggleMenu(true) : toggleMenu(false);
    setFirstTime(false);
  };

  return (
    <div className="nav">
      <div className={isMenuOpen ? "menu light" : "menu dark"}>
        <Hamburger
          rounded
          hideOutline={true}
          onToggle={openMenu}
          color={isMenuOpen ? "#dddddd" : "#121212"}
        />
      </div>

      <h1>Gauthier Bossuyt</h1>

      {firstTime ? (
        ""
      ) : (
        <div className={isMenuOpen ? "bg-nav test" : "sm-nav test"}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  window.location = "mailto:gauthierbossuyt@hotmail.com";
                  e.preventDefault();
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="info">
            <h1>Gauthier Bossuyt</h1>
            <div className="socials">
              <img
                src={Spotify}
                alt="Socials"
                onClick={() => {
                  window.open(
                    "https://open.spotify.com/user/1145441457?si=10429d368c314f8a",
                    "_blank"
                  );
                }}
              />
              <img
                src={Instagram}
                alt="Socials"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/gauthierbossuyt/",
                    "_blank"
                  );
                }}
              />
              <img
                src={Linkedin}
                alt="Socials"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/gauthier-bossuyt/",
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
