import AppLayout from "@lib/components/Layouts/AppLayout";
import { useSession, signIn } from "next-auth/react";
import { useQuery } from "react-query";
import superagent from "superagent";

const Page = () => {
  const { status, data: session } = useSession({
    required: false,
  });

  const withSessionQuery = useQuery(
    ["with-session-example", session],
    async () => {
      console.log(session);
      const data = await superagent.get("/api/with-session-example");

      return data.body.content;
    },
    {
      // The query will not execute until the session exists
      enabled: !!session,
    }
  );

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

  console.log(withSessionQuery);
  if (!session) {
    return (
      <>
        <AppLayout title="With Session">
          <blockquote>
            <h1>Access Denied</h1>
            <h1>
              <button type="button" onClick={() => signIn()}>
                <a>Login</a>&nbsp;
              </button>
              to see a secret message
            </h1>
          </blockquote>
        </AppLayout>
      </>
    );
  }

  return (
    <>
      <AppLayout title="With Session">
        <div>
          <h1>
            Hello, {`${session.user.name ?? session.user.email}`} You can see
            this because you're logged in.
          </h1>
          <blockquote>
            <p>
              This example shows usage with React Query and protected api
              routes.
            </p>
          </blockquote>
          {withSessionQuery?.data && <p>{withSessionQuery.data}</p>}
        </div>
      </AppLayout>
    </>
  );
};

export default Page;
