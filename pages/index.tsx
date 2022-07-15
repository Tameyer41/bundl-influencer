import AppLayout from "@lib/components/Layouts/AppLayout";
import AdminHome from "components/dashboard/AdminHome";
import UserHome from "components/dashboard/UserHome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { userInfo } from "os";

const IndexPage = (props) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  if (status === "loading") {
    return <div className=""></div>;
  }

  if (!session.onboarded) {
    router.push("/setup", "/setup", {});
  }
  if (session.role !== "admin") {
    return <UserHome />;
  }

  return (
    <>
      <AdminHome projects={null} />
    </>
  );
};

export default IndexPage;
IndexPage.auth = true;
