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
            fetch("http://localhost/projects")
                .then((resp) => resp.json())
                .then((resp) => {
                    let data = resp.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                    setProjects(data);
                    setCurrentProject(data[0]);
                });
        }
        fetchData();
        console.log(projects);
    }, []);

    let convertDataToString = (data) => {
        let string = "By";
        data.forEach((element, index) => {
            if (index === 0) {
                string += " " + element;
            } else {
                string += " & " + element;
            }

            if (index === data.length - 1) {
                string += ".";
            }
        });

        return string;
    };

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
                        <SwiperSlide key={index}>
                            <Slide id={index} project={project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="info">
                    <h1>{currentProject.name}</h1>
                    <div className="collaborators">
                        {currentProject.collaborators.map((person) => (
                            <p>{person.name}</p>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            window.open(currentProject.url, "target_");
                        }}
                    >
                        Go to project
                    </button>
                </div>
            </div>
        </div>
    );
}
