import Card from "components/ui/Card";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { NextPage, GetStaticProps } from "next";
import fetch from "node-fetch";

const UsersPage: NextPage<{
  users: { name: string; id: string; email: string; role: string }[];
}> = (props) => {
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

  return (
    <>
      <div className="min-h-full">
        {/* Main column */}
        <div className="flex flex-col">
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:py-6 lg:py-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-medium leading-6 text-gray-900 sm:truncate">
                  Creator Discovery
                </h1>
                <p className="text-sm font-normal text-gray-500 mt-2">
                  Learn about creators currently signed up with the agency
                </p>
              </div>
              <div className="mt-4 hidden sm:flex sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                >
                  Sort
                </button>
                <Button text="Invite users" />
              </div>
            </div>
            {/* Pinned projects */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
              <h2 className="text-gray-500 text-sm font-normal">
                {props.users.length} creators
              </h2>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-8 sm:py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 divide-x">
            {props.users.map(function (d, idx) {
              return <Card user={d} key={d.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());

  return {
    props: { users },
    revalidate: 10,
  };
};

export default UsersPage;
