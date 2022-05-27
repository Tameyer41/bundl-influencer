import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCSVReader } from "react-papaparse";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

const tabs = [
  { name: "General", href: "/settings", current: false },
  { name: "Creators", href: "/settings/creators", current: true },
  { name: "Notifications", href: "#", current: false },
  { name: "Plan", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Team Members", href: "#", current: false },
];

const SettingsPage = () => {
  const router = useRouter();
  const { CSVReader } = useCSVReader();
  const [emails, setEmails] = useState("");
  const [fileDisplay, setFileDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      <main className="max-w-2xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={submitData}>
          <div className="space-y-6">
            <div className="block max-w-full overflow-auto">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <Link key={tab.name} href={tab.href}>
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
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
            <div>
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                User Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to update
                your account.
              </p>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Email Whitelist
              </label>

              {/* Start of drag and drop */}
              <div className="mt-2">
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
                            <p className="pl-1">or drag and drop</p>
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
                                {acceptedFile && acceptedFile.name}
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
                          <div className="flex justify-end mt-4">
                            <button
                              type="button"
                              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mr-4"
                            >
                              Cancel
                            </button>

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
                              <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
                              >
                                Upload user list
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </CSVReader>
              </div>
              {/* End of drag and drop */}
            </div>
          </div>
        </form>
        <div className="mt-6">
          {whitelistData && (
            <>
              <h2 className="text-sm font-medium text-gray-700">
                {" "}
                Full Email Whitelist{" "}
              </h2>
              <ul>
                {whitelistData.whitelist.map((user) => (
                  <li key={user.id}>
                    <p className="text-sm font-normal text-gray-500">
                      {user.email}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
