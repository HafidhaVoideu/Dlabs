import React, { useEffect, useState } from "react";

import { useGlobalContextUser } from "../../../../context/context";

const Synergy = ({ syn }) => {
  const { _project_id, price, image, project_name } = syn;
  const [synProject, setSynProject] = useState({
    image: null,
    project_name: null,
  });

  const { projects } = useGlobalContextUser();

  useEffect(() => {
    const findSynProject = projects.find((p) => p.project_id === _project_id);
    setSynProject({
      image:
        image ||
        findSynProject?.image ||
        "https://images.pexels.com/photos/14354118/pexels-photo-14354118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      project_name: project_name || findSynProject?.project_name,
    });
  }, []);

  return (
    <article className="synergy">
      <img
        src={synProject.image}
        alt={synProject.project_name}
        className="synergy__img"
      />
      <div className="synergy__info">
        <h1 className="synergy__name">
          Synergize with {synProject.project_name}
        </h1>
        <p className="synergy__price">{price} Idrkn </p>
      </div>
    </article>
  );
};

export default Synergy;
