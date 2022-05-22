import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProjectsPage() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return (
    <div className="h-[90vh] grid place-items-center">
      <div className="md:w-[430px] space-y-4 rounded-lg p-6 bg-white">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#CAA53D]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-center text-3xl font-medium text-gray-700">
          No messages found
        </h1>
        <p className="text-center text-sm text-gray-600">
          Start a chat with a creator by pressing the button below. You can also
          start a groupchat by pressing multiple users' names.
        </p>
        <div className="flex items-center justify-between rounded border border-gray-200 p-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200">
              🛟
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Send a message
              </p>
              <p className="text-xs font-normal text-gray-500">
                Press to open a list of creators
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-[#7E623A]">Quick chat</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EED5B0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#7E623A]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <a
          href="#"
          className="flex justify-center text-sm font-normal text-gray-500 hover:underline hover:text-gray-700"
        >
          Need help?{" "}
        </a>
      </div>
    </div>
  );
}
