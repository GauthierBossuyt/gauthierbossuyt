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
                        setCurrentProject(Data.projects[e.realIndex]);
                    }}
                    loop={true}
                >
                    {Data.projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <Slide id={index} project={project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div class="info">
                    <h1>{currentProject.name}</h1>
                    <p>{convertDataToString(currentProject.collaborators)}</p>
                    <button
                        onClick={() => {
                            window.open("https://google.com", "target_");
                        }}
                    >
                        Go to project
                    </button>
                </div>
            </div>
        </div>
    );
}
