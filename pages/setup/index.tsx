import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";

const SetupPage = () => {
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
      url: `https://s3.us-east-1.amazonaws.com/projectinfluencer/${updated_file_name}`,
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
    <section className="relative mx-auto w-full max-w-[1600px] overflow-auto">
      <div className="relative min-h-screen px-5 pt-3 pb-16">
        <div className="mx-auto w-[640px] py-[56px]">
          <h1 className="dark:text-[#25252d] mb-[8px] text-center text-[24px] font-medium leading-[32px]">
            Congrats on the new account! 🎉
          </h1>
          <p className="mb-[40px] text-center text-[14px] text-[#25252d]">
            Complete these simple steps to get your profile up and running.
          </p>
          <div className="group flex w-full items-center rounded-md p-[24px]">
            <div className="bg-[#f7f7f8] dark:bg-dark-17 flex h-[48px] w-[64px] items-center justify-center rounded opacity-50">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="h-[24px] w-[24px] fill-transparent stroke-current"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6.75 19.25h10.5a2 2 0 0 0 2-2V8.183a2 2 0 0 0-.179-.827l-.538-1.184A2 2 0 0 0 16.713 5H7.287a2 2 0 0 0-1.82 1.172L4.93 7.356a2 2 0 0 0-.18.827v9.067a2 2 0 0 0 2 2z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.5 7.75c0 1.243-1 2.5-2.5 2.5s-2.25-1.257-2.25-2.5M19.25 7.75c0 1.243-.75 2.5-2.25 2.5s-2.5-1.257-2.5-2.5M14.5 7.75c0 1.243-1 2.5-2.5 2.5s-2.5-1.257-2.5-2.5M9.75 15.75a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v3.5h-4.5v-3.5z"
                ></path>
              </svg>
            </div>
            <div className="mx-[24px] opacity-50">
              <h4 className="dark:text-[#25252d] font-medium text-[14px]">
                Create your account
              </h4>
              <p className="text-[#6c6c84] dark:text-dark-grey text-[14px]">
                The best way to get started is to quit talking and begin doing
              </p>
            </div>
            <div className="ml-auto">
              <svg
                className="h-[40px] w-[40px]"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                  fill="#2DCA72"
                ></path>
                <path
                  d="M25.3346 16.3333L18.0013 23.6667L14.668 20.3333"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <div className="hover:bg-[#f7f7f8] dark:hover:bg-dark-17 group flex w-full items-center rounded-md p-[24px]">
            <div className="bg-[#f7f7f8] dark:bg-dark-17 group-hover:bg-light-91 dark:group-hover:bg-dark-19 flex h-[48px] w-[64px] items-center justify-center rounded">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[24px] w-[24px] fill-transparent stroke-current"
              >
                <path
                  d="M12 19.25V4.75M4.75 12h14.5"
                  stroke="#25252D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="mx-[24px]">
              <h4 className="dark:text-[#25252d] font-medium text-[14px]">
                Create your first product
              </h4>
              <p className="text-[#6c6c84] dark:text-dark-grey text-[14px]">
                Create and preview your products
              </p>
            </div>
            <div className="ml-auto">
              <button
                className="w-[152px] bg-[#7047eb] hover:bg-[#7e59ed] dark:text-[#25252d] inline-flex max-w-full cursor-pointer items-center rounded-[8px] px-[16px] py-[8px] font-medium text-white focus:outline-none"
                type="button"
              >
                <span className="mx-auto">Create Product</span>
              </button>
            </div>
          </div>
          <div className="hover:bg-[#f7f7f8] dark:hover:bg-dark-17 group flex w-full items-center rounded-md p-[24px]">
            <div className="bg-[#f7f7f8] dark:bg-dark-17 group-hover:bg-light-91 dark:group-hover:bg-dark-19 flex h-[48px] w-[64px] items-center justify-center rounded">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="h-[24px] w-[24px] fill-transparent stroke-current"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M18.25 11.5v7.75m-12.5 0V11.5m4 7.75V11.5m4.5 7.75V11.5M12 4.75l7.25 6.5H4.75L12 4.75zM4.75 19.25h14.5"
                ></path>
              </svg>
            </div>
            <div className="mx-[24px]">
              <h4 className="dark:text-[#25252d] font-medium text-[14px]">
                Get paid
              </h4>
              <p className="text-[#6c6c84] dark:text-dark-grey text-[14px]">
                Set up payout details so you can get paid
              </p>
            </div>
            <div className="ml-auto">
              <button
                className="w-[152px] bg-[#7047eb] hover:bg-[#7e59ed] dark:text-[#25252d] inline-flex max-w-full cursor-pointer items-center rounded-[8px] px-[16px] py-[8px] font-medium text-white focus:outline-none"
                type="button"
              >
                <span className="mx-auto">Enable Payouts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupPage;
