import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

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

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in", "/sign-in", {});
    },
  });

  async function reloadSession() {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  }

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  const objectWithData = {
    name: name,
    id: session.user.id,
  };

  function updateUser(e) {
    e.preventDefault();
    try {
      fetch(`/api/users/${session.user.id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      }).then(reloadSession);
      Router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  }

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
                  placeholder={session.user.name}
                  value={name}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <p>Upload a .png or .jpg image (max 1MB).</p>
              <input
                onChange={uploadPhoto}
                type="file"
                accept="image/png, image/jpeg"
              />
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
