import React from "react";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  LightningBoltIcon,
  MailIcon,
  FolderIcon,
  PhotographIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function IndividualCreatorsPage() {
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
  let pid = router.query.id;
  const { data, error } = useSWR(`/api/users/${pid}`, fetcher);
  const { data: session, status } = useSession();

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
        <div
          className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full text-white"
          role="status"
        ></div>
      </div>
    );

  return router.isFallback ? (
    <div className="w-full h-screen grid place-items-center">
      <div
        className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full text-white"
        role="status"
      ></div>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto px-8 py-6">
      <div className="pb-5 border-b border-gray-200 sm:pb-0">
        <div className="flex space-x-4 items-center">
          <img
            className="inline-block h-12 w-12 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div className="space-y-1">
            <h3 className="text-2xl leading-6 font-semibold text-gray-900">
              {data.name ? data.name : "Creator Name"}
            </h3>
            <p className="text-sm font-normal text-gray-500">
              {" "}
              {data.email ? data.email : "N/A email"}
            </p>
          </div>
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
      <div className="w-full pt-6">
        <h2 className="text-xl font-semibold text-black"> Activity </h2>
      </div>
    </div>
  );
}
