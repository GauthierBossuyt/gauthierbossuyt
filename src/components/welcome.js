function Welcome(props) {
  return (
    <div className="welcome">
      <div className="loading">
        <h1>Gauthier Bossuyt</h1>
        <div className="loading_bar">
          <p>The page is succesfully loaded scroll to continue</p>
          <div></div>
        </div>
        <div class="scrolldown-wrapper">
          <div class="scrolldown">
            <svg height="30" width="10">
              <circle class="scrolldown-p1" cx="5" cy="15" r="2" />
              <circle class="scrolldown-p2" cx="5" cy="15" r="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
