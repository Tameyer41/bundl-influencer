import Card from "components/ui/Card";
import Button from "components/ui/Button";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { filter } from "lodash";
import Modal from "components/ui/Modal";
import { CogIcon } from "@heroicons/react/outline";
import Link from "next/link";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function CreatorsPage() {
  const { data, error } = useSWR(`/api/users/creators`, fetcher);
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");

  console.log(session);

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
      {/* Page title & actions */}
      <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Influencer Discovery
          </h1>
        </div>
        <div className="flex">
          <Modal />
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <Link href="/settings">
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span className="sr-only">Previous</span>
                <CogIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </Link>
          </span>
        </div>
      </div>
      {/* Value prop start */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-screen mx-auto flex gap-[16px] overflow-x-auto horizontal-scroll">
          <div className="relative inline-block h-[330px] flex-none">
            <div className="absolute">
              <div className="flex-start relative flex h-full w-[320px] flex-col p-[24px]">
                <p className="text-sm font-normal text-white">Collection</p>
                <p className="text-lg font-medium text-white">
                  Meet smaller creators
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="relative inline-block w-auto cursor-pointer rounded-[8px] bg-white py-[8px] px-[16px] text-center text-[14px] font-medium leading-[18px] text-[#222222]">
                Show all
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1277&q=80"
              className="h-full min-h-[1px] w-[600px] rounded-[12px] object-cover"
            />
          </div>
          <div className="relative inline-block h-[330px] flex-none">
            <div className="absolute">
              <div className="flex-start relative flex h-full w-[320px] flex-col p-[24px]">
                <p className="text-sm font-normal text-white">Collection</p>
                <p className="text-lg font-medium text-white">
                  Discover creators around the world
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="relative inline-block w-auto cursor-pointer rounded-[8px] bg-white py-[8px] px-[16px] text-center text-[14px] font-medium leading-[18px] text-[#222222]">
                Show all
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1518604804907-27700fbf4ac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="h-full min-h-[1px] w-[600px] rounded-[12px] object-cover"
            />
          </div>
          <div className="relative inline-block h-[330px] flex-none">
            <div className="absolute">
              <div className="flex-start relative flex h-full w-[320px] flex-col p-[24px]">
                <p className="text-sm font-normal text-white">Collection</p>
                <p className="text-lg font-medium text-white">
                  Find creators on YouTube
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="relative inline-block w-auto cursor-pointer rounded-[8px] bg-white py-[8px] px-[16px] text-center text-[14px] font-medium leading-[18px] text-[#222222]">
                Show all
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1618139624045-6781deafb7e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
              className="h-full min-h-[1px] w-[600px] rounded-[12px] object-cover"
            />
          </div>
        </div>
        <style jsx>{`
          .horizontal-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
      {/* Value prop end */}
      <hr />
      <div className="bg-white">
        <div className="py-8 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredUsers.map(function (d, idx) {
              return <Card user={d} key={d.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
CreatorsPage.auth = true;
