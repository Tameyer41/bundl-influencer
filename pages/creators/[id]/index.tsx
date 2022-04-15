import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";

export async function getServerSideProps({ params }) {
  // fetch single post detail
  const response = await fetch(
    `https://dreamy-dragon-1e86de.netlify.app/api/users/${params.id}`
  );
  const user = await response.json();
  return {
    props: user,
    revalidate: 5,
  };
}

const User = (props) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  let name = props.name;

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h2>{name}</h2>
      <p>{props.email}</p>
    </div>
  );
};

export default User;
