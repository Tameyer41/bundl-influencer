import Card from "components/ui/Card";
import Button from "components/ui/Button";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import { filter } from "lodash";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function CreatorsPage() {
  const { data, error } = useSWR("/api/users/creators", fetcher);
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");

  console.log(session);

  if (!session) {
    return <p>You are not authenticated</p>;
  }
  if (session.role !== "admin") {
    return <p>You are not authenticated</p>;
  }

  if (error) return <div>Failed to load</div>;
  if (!data)
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

  const filteredUsers =
    query === ""
      ? data
      : data.filter((data) => {
          return data.name
            ? data.name.toLowerCase().includes(query.toLowerCase())
            : null;
        });

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
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                >
                  Sort
                </button>
                <Button text="Invite users" />
              </div>
            </div>
            {/* Toolbar */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8 ">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-gray-500 text-sm font-normal">
                  {filteredUsers.length} creators
                </h2>
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={(event) => setQuery(event.target.value)}
                  className="px-4 py-2  focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-200 rounded-md mr-4 w-80"
                  placeholder="Search for users"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-8 sm:py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredUsers.map(function (d, idx) {
              return <Card user={d} key={d.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
