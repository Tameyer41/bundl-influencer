import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";

const SettingsPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });
  const [name, setName] = useState(session.user.name);

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
      id: session.id,
      url: `https://s3.us-east-1.amazonaws.com/projectinfluencer/${filename}`,
    };
    if (upload.ok) {
      try {
        fetch(`/api/users/${session.id}`, {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo_data),
        }).then(reloadSession);
        Router.push("/");
      } catch (error) {
        console.error(error);
      }
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };

  const tabs = [
    { name: "General", href: "#", current: true },
    { name: "Creators", href: "/settings/creators", current: false },
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

  const objectWithData = {
    name: name,
    id: session.id,
  };

  function updateUser(e) {
    e.preventDefault();
    try {
      fetch(`/api/users/${session.id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      }).then(reloadSession);
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main className="max-w-[70rem] pt-6 pb-16 px-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#212121] text-opacity-60">
            Bundl Marketing
          </h2>
          <h1 className="text-3xl text-[#212121] font-medium">
            Workspace Settings
          </h1>
        </div>
        <form onSubmit={updateUser}>
          <div className="space-y-6">
            <div className="block max-w-full overflow-auto">
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
            <div>
              <h1 className="text-lg font-semibold text-[#212121]">
                Name and photos
              </h1>
              <p className="mt-1 text-sm text-[#212121] font-normal">
                Changing your name below will update your name on your profile.
              </p>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder={session.user.name}
                  value={name}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <input
                  onChange={uploadPhoto}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              </div>
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
      </main>
    </>
  );
};

export default SettingsPage;
