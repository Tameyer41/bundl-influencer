import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { mutate } from "swr";

const IntegrationsPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });
  const [name, setName] = useState(session.user.name);

  const tabs = [
    { name: "General", href: "/settings", current: false },
    { name: "Creators", href: "/settings/creators", current: false },
    { name: "Integrations", href: "/settings/integrations", current: true },
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
        <div className="border-gray-100 flex items-end justify-between border-b pb-6">
          <div>
            <h2 className="text-xl text-gray-700 font-medium">
              Connected apps
            </h2>
            <p className="text-gray-500 text-sm font-normal">
              Connect your store to third-party apps and services
            </p>
          </div>
        </div>
        <div className="border-gray-100 flex items-center border-b py-4">
          <div className="relative mr-4 flex h-12 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-100">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.4 15.341C29.4 14.2773 29.3045 13.2546 29.1273 12.2728H15V18.0751H23.0727C22.725 19.9501 21.6682 21.5387 20.0795 22.6024V26.366H24.9273C27.7636 23.7546 29.4 19.9092 29.4 15.341Z"
                fill="#4285F4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 30C19.05 30 22.4454 28.6569 24.9273 26.3659L20.0795 22.6023C18.7364 23.5023 17.0182 24.0341 15 24.0341C11.0932 24.0341 7.78633 21.3955 6.60678 17.85H1.59541V21.7364C4.0636 26.6387 9.13633 30 15 30Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.60678 17.8501C6.30678 16.9501 6.13633 15.9887 6.13633 15.0001C6.13633 14.0115 6.30678 13.0501 6.60678 12.1501V8.26373H1.59541C0.5795 10.2887 -4.57764e-05 12.5796 -4.57764e-05 15.0001C-4.57764e-05 17.4206 0.5795 19.7115 1.59541 21.7365L6.60678 17.8501Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 5.966C17.2023 5.966 19.1795 6.72281 20.7341 8.20918L25.0364 3.9069C22.4386 1.48644 19.0432 7.62939e-05 15 7.62939e-05C9.13633 7.62939e-05 4.0636 3.36145 1.59541 8.26373L6.60678 12.1501C7.78633 8.60464 11.0932 5.966 15 5.966Z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div className="mr-auto">
            <h4 className="text-gray-700 font-medium text-sm">Google</h4>
            <p className="text-gray-500 text-sm">
              Sync your calendar and email with Google
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="inline-flex w-full cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-200"
            >
              Settings
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default IntegrationsPage;
IntegrationsPage.auth = true;
