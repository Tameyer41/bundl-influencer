import AppLayout from "@lib/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

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
      <AppLayout>
        <div>
          <h1>
            Hello, {`${session.user.name ?? session.user.email}`} This is a
            protected route. You can see it because you're logged in.
          </h1>
        </div>
        Client Side Rendering This page uses the useSession() React Hook. The
        useSession() React Hook is easy to use and allows pages to render very
        quickly. The advantage of this approach is that session state is shared
        between pages by using the Provider in _app.js so that navigation
        between pages using useSession() is very fast. The disadvantage of
        useSession() is that it requires client side JavaScript.
        <blockquote>
          <p>This page is protected using the useSession hook.</p>
          <p>Either way works.</p>
          <p>
            But in this case the session is <strong>not</strong> available on
            the first render.
          </p>
        </blockquote>
      </AppLayout>
    </>
  );
};

export default Page;
