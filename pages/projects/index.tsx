import { ChevronRightIcon } from "@heroicons/react/solid";
import Modal from "components/ui/Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import prisma from "@lib/prisma";
import { useEffect } from "react";

import {
  CalendarIcon,
  SpeakerphoneIcon,
  TerminalIcon,
} from "@heroicons/react/outline";

const items = [
  {
    name: "Marketing Campaign",
    description: "I think the kids call these memes these days.",
    href: "#",
    iconColor: "bg-pink-500",
    icon: SpeakerphoneIcon,
  },
  {
    name: "Engineering Project",
    description:
      "Something really expensive that will ultimately get cancelled.",
    href: "#",
    iconColor: "bg-purple-500",
    icon: TerminalIcon,
  },
  {
    name: "Event",
    description: "Like a conference all about you that no one will care about.",
    href: "#",
    iconColor: "bg-yellow-500",
    icon: CalendarIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectsPage() {
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

  return (
    <div className="h-[90vh] grid place-items-center">
      <div className="md:w-[430px] space-y-4 rounded-lg p-6 bg-white">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#CAA53D]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-center text-3xl font-medium text-gray-700">
          No projects found
        </h1>
        <p className="text-center text-sm text-gray-600">
          Creating a problem is as easy and pressing the button found below. You
          can view all of your current and past projects.
        </p>
        <div className="flex items-center justify-between rounded border border-gray-200 p-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200">
              🛟
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Create a project
              </p>
              <p className="text-xs font-normal text-gray-500">
                (385) 145 1736
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-[#7E623A]">Action needed</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EED5B0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#7E623A]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <a
          href="#"
          className="flex justify-center text-sm font-normal text-gray-500"
        >
          Cancel porting{" "}
        </a>
      </div>
    </div>
  );
}
