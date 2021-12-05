import React from "react";
import Banner from "../../imgs/banner.png";
import Quote from "../../imgs/DesignNCode.svg";
import Data from "../../data/skills.json";
import project from "../../data/projects.json";

export default class Function extends React.Component {
  constructor() {
    super();
    this.state = { data: Data, projects: project };
  }

  render() {
    return (
      <div>
        <div className="banner">
          <img src={Banner} alt="me, myself and I"></img>
        </div>
        <div className="about_content">
          <img src={Quote} alt="inspiring quote"></img>
          <p>
            Work Sans is a typeface family based loosely on early Grotesques,
            such as those by Stephenson Blake, Miller & Richard and Bauerschen
            Giesserei. The Regular weight and others in the middle of the family
            are optimised for on-screen text usage at medium-sizes (14px-48px)
            and can also be used in print design. The fonts closer to the
            extreme weights are designed more for display use both on the web
            and in print. Overall, features are simplified and optimised for
            screen resolutions; for example, diacritic marks are larger than how
            they would be in print. A version optimised for desktop applications
            is available from the Work Sans github project page. Work Sans is a
            typeface family based loosely on early Grotesques, such as those by
            Stephenson Blake, Miller & Richard and Bauerschen Giesserei. The
            Regular weight and others in the middle of the family are optimised
            for on-screen text usage at medium-sizes (14px-48px) and can also be
            used in print design. The fonts closer to the extreme weights are
            designed more for display use both on the web and in print. Overall,
            features are simplified and optimised for screen resolutions; for
            example, diacritic marks are larger than how they would be in print.
            A version optimised for desktop applications is available from the
            Work Sans github project page.
          </p>
          <div className="skillz">
            {this.state.data.skills.map((skill) => (
              <div>
                <h1>{skill.title}</h1>
                <p>
                  Work Sans is a typeface family based loosely on early
                  Grotesques, such as those by Stephenson Blake, Miller &
                  Richard and Bauerschen Giesserei. The Regular
                </p>
              </div>
            ))}
          </div>
          <div className="collaborated">
            <h1>Worked with</h1>
            <p>Axel Viaene</p>
            <p>Amelie Detrez</p>
            <p>Mitch van Hove</p>
            <p>Tom Wouters</p>
            <p>Jochem Crab</p>
          </div>
          <div className="projects">
            <h1>Projects</h1>
            <div className="project">
              <p id="labels">Name</p>
              <p id="labels">Organization</p>
              <p id="labels">Year</p>
            </div>
            {this.state.projects.projects.map((project) => (
              <div className="project">
                <p>{project.name}</p>
                <p>{project.client}</p>
                <p>{project.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
