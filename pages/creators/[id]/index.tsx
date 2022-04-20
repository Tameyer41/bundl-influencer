import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import InlineEdit from "../../../components/ui/InlineEdit";
import {
  LightningBoltIcon,
  MailIcon,
  FolderIcon,
  PhotographIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  GlobeIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";

export async function getStaticProps({ params }) {
  // fetch single post detail
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${params.id}`
  );
  const user = await response.json();
  return {
    props: user,
    revalidate: 10,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());

  const ids = users.map((user) => user.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const User = (props) => {
  const router = useRouter();
  const tabs = [
    {
      name: "Activity",
      icon: LightningBoltIcon,
      href: `creators/${router.query.id}`,
      current: true,
    },
    {
      name: "Emails",
      icon: MailIcon,
      href: `${router.asPath}/email`,
      current: false,
    },
    {
      name: "Files",
      icon: FolderIcon,
      href: `${router.asPath}/files`,
      current: false,
    },
    {
      name: "Images",
      icon: PhotographIcon,
      href: `${router.asPath}/images`,
      current: false,
    },
    {
      name: "Notes",
      icon: PencilIcon,
      href: `${router.asPath}/notes`,
      current: false,
    },
  ];
  const [value, setValue] = useState();
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
    <div className="max-w-7xl mx-auto px-8 py-6">
      <div className="pb-5 border-b border-gray-200 sm:pb-0">
        <div className="flex space-x-4 items-center">
          <img
            className="inline-block h-12 w-12 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h3 className="text-2xl leading-6 font-semibold text-gray-900">
            {props.name ? props.name : "Creator Name"}
          </h3>
        </div>
        <div className="mt-4 mb-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            Tag about the user
          </span>
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-4">
              {tabs.map((tab) => (
                <Link key={tab.name} href={tab.href}>
                  <div
                    className={classNames(
                      tab.current
                        ? "border-[#2456BD] text-[#2456BD] flex items-center"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 flex items-center",
                      "cursor-pointer whitespace-nowrap pb-[12px] px-2 border-b-2 font-normal text-sm"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <tab.icon
                      className="mr-1 flex-shrink-0 h-[20px] w-[20px]"
                      aria-hidden="true"
                    />
                    {tab.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3 pt-6">
          <h2 className="text-xl font-semibold text-black"> Activity </h2>
        </div>
        <div className="w-1/3 border-l pt-6 pl-6">
          <div className="">
            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center">
                    <ChevronRightIcon
                      className={`${
                        open
                          ? "transform rotate-90 w-4 h-4 mr-3"
                          : "w-4 h-4 mr-3"
                      }`}
                    />
                    <span className="font-medium text-base text-black">
                      Contact Details
                    </span>
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel as="ul">
                      <li className="mt-4 flex items-center space-x-[8px]">
                        <GlobeIcon className="h-5 w-5 text-[#C1BEC2]" />
                        <InlineEdit value={value} setValue={setValue} />
                      </li>
                      <li className="mt-2 flex items-center space-x-[8px]">
                        <DocumentTextIcon className="h-5 w-5 text-[#C1BEC2]" />
                        <p> Tags </p>
                      </li>
                      <li className="mt-2 flex items-center space-x-[8px]">
                        <GlobeIcon className="h-5 w-5 text-[#C1BEC2]" />
                        <p> Tags </p>
                      </li>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
