import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const objectWithData = {
    name: name,
    email: email,
    id: session.user.id,
  };

  const updateUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      fetch(`/api/users/${session.user.id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });
      setName(session.user.name);
      setEmail(session.user.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form onSubmit={updateUser}>
          <div className="space-y-6">
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
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  onChange={(e) => setName(e.target.value)}
                  value={session.user.name}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={session.user.email}
                  id="email"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
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
