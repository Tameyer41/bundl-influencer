import { useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCSVReader } from "react-papaparse";
import useSWR from "swr";
import Link from "next/link";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

const tabs = [
  { name: "General", href: "/settings", current: false },
  { name: "Creators", href: "/settings/creators", current: true },
  { name: "Integrations", href: "/settings/integrations", current: false },
  { name: "Notifications", href: "/settings/notifications", current: false },
  { name: "Payouts", href: "/settings/payouts", current: false },
  { name: "Webhooks", href: "/settings/webhooks", current: false },
  { name: "API", href: "/settings/api", current: false },
];

const SettingsPage = () => {
  const router = useRouter();
  const { CSVReader } = useCSVReader();
  const [emails, setEmails] = useState("");
  const [fileDisplay, setFileDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });
  const { data: whitelistData, error } = useSWR("/api/whitelist", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!whitelistData)
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  async function reloadSession() {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  }

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

  function createCSV(results) {
    setEmails(results.data);
  }

  const config = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    transformHeader: function (h) {
      return h.toLowerCase();
    },
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/whitelist/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emails),
        }
      );
      const data = await response.json().then(reloadSession);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="lg:max-w-[60rem] lg:mx-auto pt-6 pb-16 px-6">
        <div className="mb-6">
          <h1 className="text-2xl text-[#212121] font-medium">Settings</h1>
        </div>
        <div className="block max-w-full overflow-auto mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {tabs.map((tab) => (
                <Link key={tab.name} href={tab.href}>
                  <a
                    className={classNames(
                      tab.current
                        ? "border-[#625df5] text-[#212121]"
                        : "border-transparent text-[#212121] text-opacity-60 hover:text-[#212121]",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                  >
                    {tab.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-end justify-between border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-xl font-medium text-gray-700">
              Creator Whitelist
            </h2>
            <p className="text-gray-500 text-sm">
              Upload a CSV file or type in an email to select who can join the
              platform.
            </p>
          </div>
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex cursor-pointer items-center rounded p-2 hover:bg-gray-100">
                  <span className="sr-only">Open options</span>

                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    className="h-6 w-6 text-gray-900"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 5.75v12.5M18.25 12H5.75"
                    ></path>
                  </svg>
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Add manually
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => setSlideoverOpen(true)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                        >
                          Upload CSV
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {whitelistData && (
          <table className="w-full table-auto border-collapse border-b border-gray-100">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 pl-0 pr-4 text-left">
                  <h4 className="text-sm font-light text-gray-500">URL</h4>
                </th>
                <th className="px-4 py-3 text-left">
                  <h4 className="text-sm font-light text-gray-500">Status</h4>
                </th>
                <th className="px-4 py-3 text-right">
                  <h4 className="text-right text-sm font-light text-gray-500">
                    Added
                  </h4>
                </th>
                <th className="p-4 py-3 pr-1 text-left">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {whitelistData.whitelist.map((user) => (
                <tr key={user.id} className="group border-b border-gray-100">
                  <td className="min-w-[240px] py-3 pl-0 pr-4">
                    <div className="flex items-center text-sm font-normal text-gray-900">
                      {user.email}
                    </div>
                  </td>
                  <td className="w-full py-3 px-4">
                    <div className="flex items-center text-sm font-normal">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-6 w-6 fill-transparent stroke-current text-red-500"
                      >
                        <path
                          d="m8.75 8.75 6.5 6.5M15.25 8.75l-6.5 6.5"
                          stroke="#F53D6B"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <circle
                          cx="12"
                          cy="12"
                          r="9.25"
                          stroke="#F53D6B"
                          stroke-width="1.5"
                        ></circle>
                      </svg>
                      <span className="font-normal text-gray-500">
                        Not Connected
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-right text-sm font-normal text-gray-900">
                    <div className="flex items-center">17 Jul 2022</div>
                  </td>
                  <td className="!py-2 pr-1 pl-4">
                    <div className="relative flex h-4 items-center">
                      <button
                        className="inline-flex h-8 w-8 max-w-full cursor-pointer items-center rounded-lg bg-transparent p-1 hover:bg-gray-100"
                        id="headlessui-popover-button-171"
                        type="button"
                        aria-expanded="false"
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          className="h-6 w-6 text-gray-900"
                        >
                          <path
                            fill="currentColor"
                            d="M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Transition.Root show={slideoverOpen} as={Fragment}>
        <form onSubmit={submitData}>
          <Dialog as="div" className="relative z-10" onClose={setSlideoverOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <Dialog.Title className="ml-4 text-2xl font-medium text-gray-900">
                                Whitelist Creators
                              </Dialog.Title>
                              <p className="mt-2 mb-6 px-4 text-sm">
                                Creator whitelisting{" "}
                                <a
                                  href="https://www.google.com/"
                                  target="_blank"
                                  className="text-blue-500 hover:underline"
                                >
                                  {" "}
                                  documentation
                                </a>
                                .
                              </p>
                            </div>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setSlideoverOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 border-t border-gray-100 pt-4 flex flex-col h-screen">
                          <div className="flex flex-col flex-grow px-4 py-3 overflow-auto">
                            <label
                              htmlFor="project-name"
                              className="text-gray-900 cursor-pointer font-medium text-sm px-4"
                            >
                              Email Whitelist
                            </label>

                            {/* Start of drag and drop */}
                            <div className="mt-3 px-4">
                              <CSVReader
                                config={config}
                                onUploadAccepted={(results: any) => {
                                  setFileDisplay(true);
                                  createCSV(results);
                                }}
                              >
                                {({
                                  getRootProps,
                                  acceptedFile,
                                  ProgressBar,
                                  getRemoveFileProps,
                                }: any) => (
                                  <>
                                    <div
                                      {...getRootProps()}
                                      className="max-w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                                    >
                                      <div className="space-y-1 text-center">
                                        <svg
                                          className="mx-auto h-12 w-12 text-gray-400"
                                          stroke="currentColor"
                                          fill="none"
                                          viewBox="0 0 48 48"
                                          aria-hidden="true"
                                        >
                                          <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                          <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                          >
                                            <span>Upload a file</span>
                                          </label>
                                          <p className="pl-1">
                                            or drag and drop
                                          </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                          PNG, JPG, GIF up to 10MB
                                        </p>
                                      </div>
                                    </div>
                                    {fileDisplay && (
                                      <>
                                        <div className="flex items-center justify-between mt-2">
                                          <div className="flex items-center space-x-2 text-gray-500">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                                              />
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                                              />
                                            </svg>
                                            <div className="text-gray-700">
                                              {acceptedFile &&
                                                acceptedFile.name}
                                            </div>
                                          </div>
                                          <div
                                            {...getRemoveFileProps()}
                                            className="cursor-pointer hover:text-gray-900 text-gray-700 text-sm font-medium"
                                          >
                                            Remove file
                                          </div>
                                        </div>
                                        <ProgressBar />
                                      </>
                                    )}
                                  </>
                                )}
                              </CSVReader>
                            </div>
                            {/* End of drag and drop */}
                          </div>

                          <div className="flex-shrink-0 bg-gray-50 px-4 py-3">
                            <div className="flex justify-between space-x-2">
                              {isLoading ? (
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
                                >
                                  <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                      stroke-width="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing...
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => setSlideoverOpen(false)}
                                    type="button"
                                    className="inline-flex cursor-pointer items-center rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="inline-flex w-full flex-grow cursor-pointer items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                    type="button"
                                  >
                                    <span className="mx-auto">
                                      Submit Creators
                                    </span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </form>
      </Transition.Root>
    </>
  );
};

export default SettingsPage;
SettingsPage.auth = true;
