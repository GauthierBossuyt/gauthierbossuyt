import Nav from "./nav";
import Banner from "../imgs/banner.png";
import Quote from "../imgs/DesignNCode.svg";
import Data from "../data/skills.json";
import projects from "../data/projects.json";

export default function About() {
    return (
        <div>
            <Nav />

            <div className="about_content">
                <img src={Banner} alt="profile" />
                <div className="about_info">
                    <img src={Quote} alt="inspiring quote"></img>
                    <p className="about_me">
                        Work Sans is a typeface family based loosely on early
                        Grotesques, such as those by Stephenson Blake, Miller &
                        Richard and Bauerschen Giesserei. The Regular weight and
                        others in the middle of the family are optimised for
                        on-screen text usage at medium-sizes (14px-48px) and can
                        also be used in print design. The fonts closer to the
                        extreme weights are designed more for display use both
                        on the web and in print. Overall, features are
                        simplified and optimised for screen resolutions; for
                        example, diacritic marks are larger than how they would
                        be in print.
                    </p>

                    {Data.skills.map((skill) => (
                        <div className="about_skill">
                            <h1>{skill.title}</h1>
                            <p>
                                Work Sans is a typeface family based loosely on
                                early Grotesques, such as those by Stephenson
                                Blake, Miller & Richard and Bauerschen
                                Giesserei. The Regular
                            </p>
                        </div>
                    ))}
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
                        {projects.projects.map((project) => (
                            <div className="project">
                                <p>{project.year}</p>
                                <p>{project.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
