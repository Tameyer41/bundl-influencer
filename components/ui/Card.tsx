import Link from "next/link";
import Image from "next/image";
import { mutate } from "swr";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import AddToProjectModal from "./AddToProjectModal";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card(props) {
  const { user } = props;
  return (
    <>
      <div className="group space-y-4">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-64 lg:aspect-none group cursor-pointer relative">
          <div className="z-10 absolute top-4 right-2 text-left">
            <AddToProjectModal user={user} />
          </div>
          {user.image ? (
            <Link href={`/creators/${user.id}`}>
              <div className="relative h-80 w-80">
                <Image
                  onMouseEnter={() => {
                    mutate(`/api/users/${user.id}`, async (current) => {
                      return current ?? fetcher(`/api/users/${user.id}`);
                    });
                  }}
                  src={user.image}
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                />
              </div>
            </Link>
          ) : (
            <Link href={`/creators/${user.id}`}>
              <img
                onMouseEnter={() => {
                  mutate(`/api/users/${user.id}`, async (current) => {
                    return current ?? fetcher(`/api/users/${user.id}`);
                  });
                }}
                src="https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg"
                alt="Hand stitched, orange leather long wallet"
                className="h-80 w-80 object-center object-cover"
              />
            </Link>
          )}
        </div>
        <Link href={`/creators/${user.id}`}>
          <div
            className="space-y-4 cursor-pointer"
            onMouseEnter={() => {
              mutate(`/api/users/${user.id}`, async (current) => {
                return current ?? fetcher(`/api/users/${user.id}`);
              });
            }}
          >
            <div className="flex justify-between mt-4">
              <div className="overflow-hidden">
                <h2 className="truncate text-sm font-medium text-gray-900">
                  {user.name ? user.name : "No name"}
                </h2>
                <p className="text-gray-500 text-sm font-normal">
                  <span>{user.email}</span>
                </p>
              </div>
              <span className="text-emerald-400">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block h-6 w-6 fill-current"
                >
                  <circle cx="12" cy="12" r="3" fill="#2DCA72"></circle>
                </svg>
              </span>
            </div>

            <div className="w-full cursor-pointer">
              <a className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
                {" "}
                View profile{" "}
              </a>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
