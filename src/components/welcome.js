function Welcome(props) {
  return (
    <div className="welcome">
      <div className="loading">
        <h1>Gauthier Bossuyt</h1>
        <div className="loading_bar">
          <p>The page is succesfully loaded scroll to continue</p>
          <div></div>
        </div>
        <div className="scrolldown-wrapper">
          <div className="scrolldown">
            <svg height="30" width="10">
              <circle className="scrolldown-p1" cx="5" cy="15" r="2" />
              <circle className="scrolldown-p2" cx="5" cy="15" r="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="notification">
        For the best experience use Google Chrome or Firefox
      </p>
    </div>
  );
}

export default Welcome;
