import Nav from "./nav";
import Slide from "./slide";
import Data from "../data/projects.json";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Pagination]);

export default function App() {
  const [currentProject, setCurrentProject] = useState(Data.projects[0]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch("https://gauthierbossuyt-api.herokuapp.com/projects")
        .then((resp) => resp.json())
        .then((resp) => {
          let favo = resp.filter((project) => project.favourite);
          let data = favo.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          setProjects(data);
          setCurrentProject(data[0]);
        });
    }
    fetchData();
  }, []);

  return (
    <div className="Mobile">
      <Nav />
      <div className="content">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          onSlideChange={(e) => {
            setCurrentProject(projects[e.realIndex]);
          }}
          loop
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project._id}>
              <Slide id={index} project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="info">
          <h1>{currentProject.name}</h1>
          <div className="collaborators">
            {currentProject.collaborators.map((person) => (
              <p
                key={person._id}
                onClick={() => {
                  window.open(person.url, "_blank");
                }}
              >
                {person.name}
              </p>
            ))}
          </div>
          <div className="description">
            <p>{currentProject.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
