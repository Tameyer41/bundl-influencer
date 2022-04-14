import React from "react";
import { prisma } from "@lib/prisma";
import { useSession } from "next-auth/react";
import Router from "next/router";
import users from "@api/users";

async function destroy(): Promise<void> {
  const { id } = Router.query;
  await fetch(`https://bundl-web-app.vercel.app/api/projects/${id}`, {
    method: "DELETE",
  });
  await Router.push("/projects");
}

const Project: React.FC<ProjectProps> = (props) => {
  let name = props.project.name;

  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>{props.project.description}</p>
        <div>
          {props.projectUsers.map((projectUser) => (
            <div>
              <p>{projectUser.user.email}</p>
              <p>{projectUser.role}</p>
            </div>
          ))}
        </div>
        <button onClick={() => destroy(props.id)}>Delete</button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://bundl-web-app.vercel.app/api/projects/${context.params.id}`
  );
  const data = await res.json();
  return { props: { ...data } };
};

export default Project;
