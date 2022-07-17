import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { mutate } from "swr";

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
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);
    const res = await fetch(
      `/api/upload-url?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const photo_data = {
      id: session.id,
      url: `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/${filename}`,
    };

    if (upload.ok) {
      console.log("Uploaded successfully!");
      try {
        fetch(`/api/users/${session.id}`, {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo_data),
        });
        await mutate(`/api/users/${session.id}`);
        console.log(
          `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/${filename}`
        );
        Router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Upload failed.");
    }
  };

  const tabs = [
    { name: "General", href: "/settings", current: true },
    { name: "Creators", href: "/settings/creators", current: false },
    { name: "Integrations", href: "/settings/integrations", current: false },
    { name: "Notifications", href: "/settings/notifications", current: false },
    { name: "Payouts", href: "/settings/payouts", current: false },
    { name: "Webhooks", href: "/settings/webhooks", current: false },
    { name: "API", href: "/settings/api", current: false },
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
      });
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

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
        <form onSubmit={updateUser}>
          <div className="flex items-end justify-between border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-xl font-medium text-gray-700">
                Account settings
              </h2>
              <p className="text-gray-500 text-sm">
                View and update your account details
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="inline-flex w-full cursor-pointer items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
          <div className="border-gray-100 flex items-start border-b py-6">
            <div className="mr-8 w-2/5 flex-shrink-0">
              <h3 className="text-gray-900 font-medium text-sm">
                Full Name <span className="text-red-500">*</span>
              </h3>
              <p className="text-gray-500 max-w-xs font-normal text-sm">
                Appears on receipts, invoices, and more
              </p>
            </div>
            <div className="flex-grow">
              <input
                type="text"
                name="full-name"
                id="full-name"
                onChange={(e) => setName(e.target.value)}
                placeholder={session.user.name}
                value={name}
                className="shadow-sm w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-700 border border-gray-900 border-opacity-20"
              />
            </div>
          </div>
          <div className="flex items-start border-b border-gray-100 py-6">
            <div className="mr-8 w-2/5 flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-900">Avatar</h3>
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <div className="mr-2 h-6 w-6">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 h-full w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        viewBox="0 0 64 64"
                        version="1.1"
                      >
                        <circle
                          fill="#898FA9"
                          width="64"
                          height="64"
                          cx="32"
                          cy="32"
                          r="32"
                        ></circle>
                        <text
                          x="50%"
                          y="50%"
                          alignment-baseline="middle"
                          text-anchor="middle"
                          font-size="38"
                          font-weight="600"
                          dy=".1em"
                          dominant-baseline="middle"
                          fill="#ffffff"
                        >
                          R
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="inline-flex w-full cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    {" "}
                    Choose{" "}
                  </label>
                  <input
                    id="file-upload"
                    onChange={uploadPhoto}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                  />
                </div>
                <div className="ml-4 text-gray-500 text-sm font-light">
                  JPG, GIF or PNG. 1MB Max.
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default SettingsPage;
SettingsPage.auth = true;
