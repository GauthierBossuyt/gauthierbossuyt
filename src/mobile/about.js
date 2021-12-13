import React, { useState, useEffect } from "react";
import Nav from "./nav";
import Banner from "../imgs/banner.png";
import Quote from "../imgs/DesignNCode.svg";

export default function About() {
  const [data, setData] = useState({});
  const [about, setAbout] = useState("");
  const [projects, setProjects] = useState([]);
  const [collabs, setCollabs] = useState([]);

  useEffect(() => {
    async function getContent() {
      fetch("https://gauthierbossuyt-api.herokuapp.com/content")
        .then((resp) => resp.json())
        .then((resp) => {
          setAbout(resp[0]);
          setData(createArrayOfSkills(resp[1]));
        });
    }

    async function getProjects() {
      fetch("https://gauthierbossuyt-api.herokuapp.com/projects")
        .then((resp) => resp.json())
        .then((resp) => {
          setProjects(
            resp.sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
          );
        });
    }

    async function getCollabs() {
      fetch("https://gauthierbossuyt-api.herokuapp.com/collaborators")
        .then((resp) => resp.json())
        .then((resp) => {
          setCollabs(
            resp.sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
          );
        });
    }

    getContent();
    getProjects();
    getCollabs();
  }, []);

  const createArrayOfSkills = (data) => {
    let array = [];
    for (const skill in data) {
      if (data[skill].name) {
        array.push(data[skill]);
      }
    }
    return array;
  };

  return (
    <div>
      <Nav />

      <div className="about_content">
        <img src={Banner} alt="profile" />
        <div className="about_info">
          <img src={Quote} alt="inspiring quote"></img>
          <p className="about_me">{about.description}</p>

          {data[0]
            ? data.map((skill) => (
                <div key={skill.name} className="about_skill">
                  <h1>{skill.name}</h1>
                  <p>{skill.text}</p>
                </div>
              ))
            : ""}
          <div className="collaborated">
            <h1>Worked with</h1>
            {collabs.map((person) => (
              <p
                key={person._id}
                className="person"
                onClick={() => {
                  window.open(person.url, "_blank");
                }}
              >
                {person.name}
              </p>
            ))}
          </div>
          <div className="projects">
            <h1>Projects</h1>
            {projects.map((project) => (
              <div key={project._id} className="project">
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
