import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { mutate } from "swr";
import { ChevronRightIcon } from "@heroicons/react/solid";

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
      image: `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/${filename}`,
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
      <main className="lg:max-w-[70rem] lg:mx-auto pt-6 pb-16 px-6">
        <div className="mx-auto w-[640px] py-[56px]">
          <h1 className="dark:text-[#25252d] mb-[8px] text-center text-[24px] font-medium leading-[32px]">
            Let's customize your profile!
          </h1>
          <p className="mb-[40px] text-center text-[14px] text-[#25252d]">
            Upload a few photos to show off who you are.
          </p>
          <form onSubmit={updateUser}>
            <div className="w-full items-center rounded-md p-[24px]">
              <div className="space-y-6">
                <div className="">
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
                  <Link href="/setup">
                    <button
                      type="button"
                      className="text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mr-8"
                    >
                      Back
                    </button>
                  </Link>

                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
SettingsPage.auth = true;
