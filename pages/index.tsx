import AppLayout from "@lib/components/Layouts/AppLayout";
import AdminHome from "components/dashboard/AdminHome";
import UserHome from "components/dashboard/UserHome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { userInfo } from "os";

const Page = (props) => {
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
  if (session.user.role !== "admin") {
    return <UserHome />;
  }

  return (
    <>
      <AdminHome projects={props} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = await fetch(
    "https://dreamy-dragon-1e86de.netlify.app/api/projects/feed",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  return {
    props: { projects },
    revalidate: 1,
  };
};

export default Page;
