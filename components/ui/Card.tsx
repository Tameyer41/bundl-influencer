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
        <div className="aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-md bg-gray-200 relative group">
          <div className="z-10 absolute top-4 right-2 text-left">
            <AddToProjectModal user={user} />
          </div>
          {user.image ? (
            <Link href={`/creators/${user.id}`}>
              <Image
                onMouseEnter={() => {
                  mutate(`/api/users/${user.id}`, async (current) => {
                    return current ?? fetcher(`/api/users/${user.id}`);
                  });
                }}
                src={user.image}
                className="h-full w-full object-cover object-center"
                width={500}
                height={800}
              />
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
                className="h-full w-full object-cover object-center"
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
            <div className="space-y-1">
              <h2 className="text-base font-medium text-gray-700 hover:underline">
                {" "}
                {user.name}{" "}
              </h2>
              <p className="text-sm font-normal text-gray-500">
                {" "}
                {user.email}{" "}
              </p>
            </div>

            <div className="w-full cursor-pointer">
              <a className="block w-full border border-gray-200 rounded px-4 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 text-center">
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
