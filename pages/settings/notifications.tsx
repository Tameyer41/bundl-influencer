import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { mutate } from "swr";
import { Switch } from "@headlessui/react";

const NotificationsPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  const [enabledEmail, setEnabledEmail] = useState(false);
  const [enabledMessages, setEnabledMessages] = useState(false);

  const tabs = [
    { name: "General", href: "/settings", current: false },
    { name: "Creators", href: "/settings/creators", current: false },
    { name: "Integrations", href: "/settings/integrations", current: false },
    { name: "Notifications", href: "/settings/notifications", current: true },
    { name: "Payouts", href: "/settings/payouts", current: false },
    { name: "Webhooks", href: "/settings/webhooks", current: false },
    { name: "API", href: "/settings/api", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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

  return (
    <>
      <main className="lg:max-w-[60rem] lg:mx-auto pt-5 lg:pt-6 pb-16 px-6">
        <div className="mb-6 ml-12 lg:ml-0">
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
              Notification settings
            </h2>
            <p className="text-gray-500 text-sm">
              View and update your email marketing settings
            </p>
          </div>
        </div>
        <div className="flex items-start border-b border-gray-100 py-6">
          <div className="mr-8 w-2/5 flex-shrink-0">
            <h3 className="text-sm font-medium text-gray-900">
              Privacy options
            </h3>
          </div>
          <div className="flex-grow">
            <div className="mb-6 flex items-start space-x-4">
              <div className="mt-1 flex-shrink-0">
                <Switch.Group>
                  <div className="flex items-center">
                    <Switch
                      checked={enabledEmail}
                      onChange={setEnabledEmail}
                      className={`${
                        enabledEmail ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-[18px] w-[30px] items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4`}
                    >
                      <span
                        className={`${
                          enabledEmail ? "translate-x-3.5" : "translate-x-0.5"
                        } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <Switch.Label>
                      <label className="inline-block cursor-pointer text-sm font-medium text-gray-900">
                        {" "}
                        Enable double opt-in{" "}
                      </label>
                      <p className="text-sm text-gray-500">
                        Enable double opt-in for subscribers who join via API or
                        integration
                      </p>
                    </Switch.Label>
                  </div>
                </Switch.Group>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="mt-1 flex-shrink-0">
                <Switch.Group>
                  <div className="flex items-center">
                    <Switch
                      checked={enabledMessages}
                      onChange={setEnabledMessages}
                      className={`${
                        enabledMessages ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex w-[30px] h-[18px] items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4`}
                    >
                      <span
                        className={`${
                          enabledMessages
                            ? "translate-x-3.5"
                            : "translate-x-0.5"
                        } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <Switch.Label>
                      <label className="inline-block cursor-pointer text-sm font-medium text-gray-900">
                        {" "}
                        Track opens{" "}
                      </label>
                      <p className="text-sm text-gray-500">
                        Track opens with an invisible beacon embedded in your
                        emails
                      </p>
                    </Switch.Label>
                  </div>
                </Switch.Group>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotificationsPage;
NotificationsPage.auth = true;
