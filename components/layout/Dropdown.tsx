import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyLink(props) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

export default function Dropdown() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex-shrink-0 flex border-t border-gray-200 w-full min-h-[60px] flex flex-row justify-between items-center px-[10px]">
          <a
            href="#"
            className="flex-shrink-0 w-full group block mr-[10px] px-[10px] rounded-[5px] hover:bg-[#F0F0F2] py-[7px]"
          >
            <div className="flex items-center">
              <div>
                <div className="flex-shrink-0 h-[25px] w-[25px] bg-blue-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-[14px] leading-[18px] font-medium text-[#404040] group-hover:text-[#404040]">
                  {session.user.name}
                </p>
              </div>
            </div>
          </a>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 w-[280px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {session.user.email}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              <MyLink
                href="/settings"
                className="hover:bg-gray-100 text-gray-900 text-gray-700 block px-4 py-2 text-sm"
              >
                Account settings
              </MyLink>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <div>
              <Menu.Item onClick={logoutHandler}>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
