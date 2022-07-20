import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { mutate } from "swr";

const PayoutsPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  const tabs = [
    { name: "General", href: "/settings", current: false },
    { name: "Creators", href: "/settings/creators", current: false },
    { name: "Integrations", href: "/settings/integrations", current: false },
    { name: "Notifications", href: "/settings/notifications", current: false },
    { name: "Payouts", href: "/settings/payouts", current: true },
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
              Payout settings
            </h2>
            <p className="text-gray-500 text-sm">
              Manage and view payouts for this store
            </p>
          </div>
        </div>
        <div className="flex items-start border-b border-gray-100 py-6">
          <div className="mr-8 w-2/5 flex-shrink-0">
            <h3 className="text-sm font-medium text-gray-900">
              Payout methods
            </h3>
            <p className="max-w-xs text-sm text-gray-500">
              Select a default payout method
            </p>
          </div>
          <div className="flex-grow">
            <div className="space-y-4">
              <div className="flex items-center rounded border border-gray-200 p-4 hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
                <div className="relative flex h-6 w-8 flex-shrink-0 items-center justify-center rounded bg-gray-100">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      className="h-6 w-6 fill-transparent stroke-current"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M18.25 11.5v7.75m-12.5 0V11.5m4 7.75V11.5m4.5 7.75V11.5M12 4.75l7.25 6.5H4.75L12 4.75ZM4.75 19.25h14.5"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mx-4 flex-grow overflow-hidden">
                  <h4 className="text-sm font-medium text-gray-900">
                    Bank Account
                  </h4>
                  <p className="truncate text-sm text-gray-500">
                    Connect your bank account
                  </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="inline-flex w-full cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-wedges-gray-200 flex items-center rounded border p-4 hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
                <div className="relative flex h-6 w-8 flex-shrink-0 items-center justify-center rounded bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center rounded border border-gray-100 bg-white">
                    <div className="h-5 w-5">
                      <svg
                        className="h-full w-full"
                        viewBox="0 0 26 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.2675 29.154L7.7905 25.832L6.6255 25.805H1.0625L4.9285 1.29205C4.9405 1.21805 4.9795 1.14905 5.0365 1.10005C5.0935 1.05105 5.1665 1.02405 5.2425 1.02405H14.6225C17.7365 1.02405 19.8855 1.67205 21.0075 2.95105C21.5335 3.55105 21.8685 4.17805 22.0305 4.86805C22.2005 5.59205 22.2035 6.45705 22.0375 7.51205L22.0255 7.58905V8.26505L22.5515 8.56305C22.9945 8.79805 23.3465 9.06705 23.6165 9.37505C24.0665 9.88805 24.3575 10.54 24.4805 11.313C24.6075 12.108 24.5655 13.054 24.3575 14.125C24.1175 15.357 23.7295 16.43 23.2055 17.308C22.7235 18.117 22.1095 18.788 21.3805 19.308C20.6845 19.802 19.8575 20.177 18.9225 20.417C18.0165 20.653 16.9835 20.772 15.8505 20.772H15.1205C14.5985 20.772 14.0915 20.96 13.6935 21.297C13.2945 21.641 13.0305 22.111 12.9495 22.625L12.8945 22.924L11.9705 28.779L11.9285 28.994C11.9175 29.062 11.8985 29.096 11.8705 29.119C11.8455 29.14 11.8095 29.154 11.7745 29.154H7.2675Z"
                          fill="#253B80"
                        ></path>
                        <path
                          d="M23.0472 7.66699C23.0192 7.84599 22.9872 8.02899 22.9512 8.21699C21.7142 14.568 17.4822 16.762 12.0772 16.762H9.32517C8.66417 16.762 8.10717 17.242 8.00417 17.894L6.59517 26.83L6.19617 29.363C6.12917 29.791 6.45917 30.177 6.89117 30.177H11.7722C12.3502 30.177 12.8412 29.757 12.9322 29.187L12.9802 28.939L13.8992 23.107L13.9582 22.787C14.0482 22.215 14.5402 21.795 15.1182 21.795H15.8482C20.5772 21.795 24.2792 19.875 25.3612 14.319C25.8132 11.998 25.5792 10.06 24.3832 8.69699C24.0212 8.28599 23.5722 7.94499 23.0472 7.66699Z"
                          fill="#179BD7"
                        ></path>
                        <path
                          d="M21.7529 7.15103C21.5639 7.09603 21.3689 7.04603 21.1689 7.00103C20.9679 6.95703 20.7619 6.91803 20.5499 6.88403C19.8079 6.76403 18.9949 6.70703 18.1239 6.70703H10.7719C10.5909 6.70703 10.4189 6.74803 10.2649 6.82203C9.92591 6.98503 9.67391 7.30603 9.61291 7.69903L8.04891 17.605L8.00391 17.894C8.10691 17.242 8.66391 16.762 9.32491 16.762H12.0769C17.4819 16.762 21.7139 14.567 22.9509 8.21703C22.9879 8.02903 23.0189 7.84603 23.0469 7.66703C22.7339 7.50103 22.3949 7.35903 22.0299 7.23803C21.9399 7.20803 21.8469 7.17903 21.7529 7.15103Z"
                          fill="#222D65"
                        ></path>
                        <path
                          d="M9.61399 7.699C9.67499 7.306 9.92699 6.985 10.266 6.823C10.421 6.749 10.592 6.708 10.773 6.708H18.125C18.996 6.708 19.809 6.765 20.551 6.885C20.763 6.919 20.969 6.958 21.17 7.002C21.37 7.047 21.565 7.097 21.754 7.152C21.848 7.18 21.941 7.209 22.032 7.238C22.397 7.359 22.736 7.502 23.049 7.667C23.417 5.32 23.046 3.722 21.777 2.275C20.378 0.682 17.853 0 14.622 0H5.24199C4.58199 0 4.01899 0.48 3.91699 1.133L0.00998882 25.898C-0.0670112 26.388 0.310989 26.83 0.804989 26.83H6.59599L8.04999 17.605L9.61399 7.699Z"
                          fill="#253B80"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mx-4 flex-grow overflow-hidden">
                  <h4 className="text-sm font-medium text-gray-900">PayPal</h4>
                  <p className="truncate text-sm font-normal text-gray-500">
                    Connect your PayPal account
                  </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="inline-flex w-full cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PayoutsPage;
PayoutsPage.auth = true;
