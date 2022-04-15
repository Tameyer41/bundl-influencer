import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";

export async function getStaticProps({ params }) {
  // fetch single post detail
  const response = await fetch(
    `https://dreamy-dragon-1e86de.netlify.app/api/projects/${params.id}`
  );
  const project = await response.json();
  return {
    props: project,
    revalidate: 60,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await fetch(
    "https://dreamy-dragon-1e86de.netlify.app/api/projects/feed",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const ids = projects.map((project) => project.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

const Project = (props) => {
  const { data: session, status } = useSession();
  console.log(props);
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h2>{props.project.name}</h2>
      <p>{props.project.description}</p>
      <p>
        {props.project.users.map((user) => (
          <p>user.name</p>
        ))}
      </p>
    </div>
  );
};

export default Project;
