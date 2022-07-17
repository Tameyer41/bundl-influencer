import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());
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
  const { data, error } = useSWR(`/api/users/${session.id}`, fetcher);

  function logoutHandler() {
    signOut();
  }

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <Menu>
        <div className="flex-shrink-0 flex border-t border-gray-200 w-full min-h-[60px] flex-row justify-between items-center px-[10px] py-[10px]">
          <Menu.Button className="flex-shrink-0 w-full group block mr-[10px] px-[10px] rounded-[5px]">
            <div className="flex items-center">
              <div>
                <div className="flex-shrink-0 rounded-[6px] w-[53px] h-[53px] bg-gray-400 animate-pulse"></div>
              </div>
              <div className="ml-3 text-left ">
                <p className="text-[14px] leading-[18px] font-medium text-[#3F3F3F] group-hover:text-[#404040]">
                  Workspace
                </p>

                <div className="w-full h-[14px] mt-1 bg-gray-400 animate-pulse rounded-full"></div>
              </div>
            </div>
          </Menu.Button>
        </div>
      </Menu>
    );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <div className="flex-shrink-0 flex border-t border-gray-200 w-full min-h-[60px] flex-row justify-between items-center px-[10px] py-[10px]">
          <Menu.Button className="flex-shrink-0 w-full group block mr-[10px] px-[10px] rounded-[5px]">
            <div className="flex items-center">
              <div>
                {data.image ? (
                  <Image
                    src={data.image}
                    className="flex-shrink-0 rounded-[6px] object-cover"
                    width={53}
                    height={53}
                  />
                ) : (
                  <div className="flex-shrink-0 rounded-[6px] w-[53px] h-[53px] bg-blue-500"></div>
                )}
              </div>
              <div className="ml-3 text-left ">
                <p className="text-[14px] leading-[18px] font-medium text-[#3F3F3F] group-hover:text-[#404040]">
                  Workspace
                </p>
                <p className="text-[14px] leading-[18px] font-normal text-[#707070] group-hover:text-[#404040]">
                  {data.name}
                </p>
              </div>
            </div>
          </Menu.Button>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Menu.Items className="pt-2 origin-top-right absolute top-[0.2rem] left-2.5 w-[300px] rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-[54]">
          {/* Start */}
          <Menu.Button className="flex-shrink-0 w-full group block mr-[10px] px-[10px] rounded-[5px]">
            <div className="flex items-center">
              <div>
                {data.image ? (
                  <Image
                    src={data.image}
                    className="flex-shrink-0 rounded-[6px] object-cover"
                    width={53}
                    height={53}
                  />
                ) : (
                  <div className="flex-shrink-0 rounded-[6px] w-[53px] h-[53px] bg-blue-500"></div>
                )}
              </div>
              <div className="ml-3 text-left ">
                <p className="text-[14px] leading-[18px] font-medium text-[#3F3F3F] group-hover:text-[#404040]">
                  Workspace
                </p>
                <p className="text-[14px] leading-[18px] font-normal text-[#707070] group-hover:text-[#404040]">
                  {data.name}
                </p>
              </div>
            </div>
          </Menu.Button>
          {/* End */}
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {data.email}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              <MyLink
                href="/settings"
                className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
              >
                Account settings
              </MyLink>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/support"
                  target="_blank"
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
                  href="/license"
                  target="_blank"
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
