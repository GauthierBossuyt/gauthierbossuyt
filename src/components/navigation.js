function Navigation(props) {
  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="about">About</a>
        </li>
        <li>
          <a
            href="contact"
            onClick={(e) => {
              window.location = "mailto:gauthierbossuyt@hotmail.com";
              e.preventDefault();
            }}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
