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
    return (
      <div className="w-full h-screen grid place-items-center">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="text-gray-400 opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={3}
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
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

export default Page;
