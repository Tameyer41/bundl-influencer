import React from "react";
import Router from "next/router";

export type ProjectProps = {
  id: string;
  name: string;
  description: string;
};

const Project: React.FC<{ project: ProjectProps }> = ({ project }) => {
  return (
    <div
      onClick={() => Router.push("/projects/[id]", `/projects/${project.id}`)}
    >
      <h2>{project.name}</h2>
      <small>By {project.description}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Project;
