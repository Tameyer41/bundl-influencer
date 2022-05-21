import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useCSVReader } from "react-papaparse";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SettingsPage = () => {
  const router = useRouter();
  const { CSVReader } = useCSVReader();
  const [emails, setEmails] = useState("");

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  const { data: whitelistData, error } = useSWR("/api/whitelist", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!whitelistData) return <div>Loading...</div>;
  console.log(whitelistData);

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const updated_file_name = fields.key.replace(/ /g, "+");

    const photo_data = {
      id: session.user.id,
      url: `https://s3.us-east-1.amazonaws.com/projectinfluencer/${filename}`,
    };
    if (upload.ok) {
      try {
        fetch(`/api/users/${session.user.id}`, {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo_data),
        }).then(reloadSession);
        Router.push("/projects");
      } catch (error) {
        console.error(error);
      }
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };

  const tabs = [
    { name: "General", href: "/settings", current: false },
    { name: "Creators", href: "/settings/creators", current: true },
    { name: "Notifications", href: "#", current: false },
    { name: "Plan", href: "#", current: false },
    { name: "Billing", href: "#", current: false },
    { name: "Team Members", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  async function reloadSession() {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  }

  if (status === "loading") {
    return "Loading or not authenticated...";
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
    try {
      const response = await fetch(
        `http://localhost:3000/api/whitelist/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emails),
        }
      );
      const data = await response.json().then(reloadSession);
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="max-w-2xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={submitData}>
          <div className="space-y-6">
            <div className="lg:hidden">
              <label htmlFor="selected-tab" className="sr-only">
                Select a tab
              </label>
              <select
                id="selected-tab"
                name="selected-tab"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden lg:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? "border-purple-500 text-purple-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                    >
                      {tab.name}
                    </a>
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
              <CSVReader
                config={config}
                onUploadAccepted={(results: any) => {
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
                    <div className="flex flex-row mb-2.5">
                      <button
                        type="button"
                        {...getRootProps()}
                        className="w-1/5"
                      >
                        Browse file
                      </button>
                      <div className="border border-gray-50 h-10 leading-[2.5] pl-2.5 w-4/5">
                        {acceptedFile && acceptedFile.name}
                      </div>
                      <button
                        {...getRemoveFileProps()}
                        className="rounded-sm px-5 py-0"
                      >
                        Remove
                      </button>
                    </div>
                    <ProgressBar className="bg-red-400" />
                  </>
                )}
              </CSVReader>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mr-4"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <div className="mt-6">
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
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
