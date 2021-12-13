import { useEffect, useState } from "react";
import Delete from "../../../imgs/delete.svg";
import Edit from "../../../imgs/edit.svg";
import Favourite from "../../../imgs/favourite.svg";
import Unfavourite from "../../../imgs/unfavourite.svg";
import Arrow from "../../../imgs/arrow.svg";

export default function Project(props) {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setData(props.project);
  }, [props.project]);

  const showCollaborators = (list) => {
    let text = "By ";
    list.forEach((collaborator, index) => {
      if (index === 0) {
        text += collaborator.name;
      } else {
        text += " & " + collaborator.name;
      }
    });
    text += ".";
    return text;
  };

  return (
    <div className="admin-project" id={toggle ? "on" : "off"}>
      {data.name ? (
        <div>
          <div className="admin-sm-project">
            <img
              id="arrow"
              src={Arrow}
              alt="arrow-toggle"
              className={toggle ? "open" : "close"}
              onClick={(e) => {
                setToggle(!toggle);
              }}
            />
            <h1
              onClick={(e) => {
                setToggle(!toggle);
              }}
            >
              {data.name}
            </h1>
            <div>
              <img
                id="favourite"
                src={data.favourite ? Favourite : Unfavourite}
                alt={data.name + "favourite"}
                onClick={() =>
                  props.favourite(data._id, {
                    ...data,
                    favourite: !data.favourite,
                  })
                }
              />
              <img
                id="edit"
                src={Edit}
                alt={data.name + "edit"}
                onClick={() => props.edit(data._id, data)}
              />
              <img
                id="delete"
                src={Delete}
                alt={data.name + "delete"}
                onClick={() => props.delete(data._id, data)}
              />
            </div>
          </div>
          {toggle && (
            <div className="admin-bg-project">
              <h1 className="admin-project-collabs">
                {showCollaborators(data.collaborators)}
              </h1>
              <p>{data.description}</p>
              <div className="extra-info-admin">
                <h2>{data.client}</h2>
                <h2>{data.year}</h2>
              </div>
              <p>{data.url}</p>
            </div>
          )}
          <img id="admin-project-bg" src={data.image} alt={data.name} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
