import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { PlusSmIcon } from "@heroicons/react/solid";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import ProjectNavbar from "../../../components/layout/projects/ProjectNavbar";
import DOMPurify from "dompurify";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Project = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, error } = useSWR(`/api/projects/${router.query.id}`, fetcher);

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="flex h-full min-h-screen w-full flex-row items-stretch overflow-hidden">
        <main className="relative flex flex-shrink flex-grow basis-1 flex-col place-items-stretch overflow-auto bg-white">
          <div className="absolute inset-0 flex flex-initial flex-row overflow-hidden bg-white">
            <div className="max-w-[100% - 24px] flex flex-shrink flex-grow basis-1 flex-col rounded-md bg-none shadow">
              <div className="flex max-h-12 flex-initial flex-row items-center rounded-t-md border border-b-0 border-[#eff1f4] bg-white p-3">
                <div className="flex flex-initial flex-row items-center">
                  <div className="flex flex-initial flex-row ml-12 lg:ml-0">
                    <button
                      aria-label="Close"
                      className="group inline-flex items-center justify-center rounded p-1 font-medium hover:bg-[#f0f3f9]"
                      type="button"
                    >
                      <svg
                        className="text-[#6B6F76] group-hover:text-[#282a30]"
                        width="16"
                        height="16"
                        viewBox="-7 -7 38 38"
                        fill="currentColor"
                      >
                        <path d="M0.439127 21.44C0.157865 21.7214 -9.37008e-05 22.103 7.33302e-08 22.5008C9.38474e-05 22.8987 0.158232 23.2802 0.439627 23.5615C0.721022 23.8427 1.10262 24.0007 1.50048 24.0006C1.89834 24.0005 2.27987 23.8424 2.56113 23.561L11.8231 14.3C11.8463 14.2767 11.8739 14.2582 11.9043 14.2456C11.9347 14.233 11.9672 14.2265 12.0001 14.2265C12.033 14.2265 12.0656 14.233 12.0959 14.2456C12.1263 14.2582 12.1539 14.2767 12.1771 14.3L21.4391 23.563C21.5784 23.7023 21.7437 23.8128 21.9257 23.8883C22.1077 23.9637 22.3028 24.0025 22.4998 24.0026C22.6968 24.0026 22.8919 23.9639 23.0739 23.8885C23.2559 23.8132 23.4213 23.7027 23.5606 23.5635C23.7 23.4242 23.8105 23.2589 23.8859 23.0769C23.9614 22.8949 24.0002 22.6998 24.0003 22.5028C24.0003 22.3058 23.9615 22.1107 23.8862 21.9287C23.8109 21.7467 23.7004 21.5813 23.5611 21.442L14.3001 12.177C14.2768 12.1537 14.2584 12.1262 14.2458 12.0958C14.2332 12.0654 14.2267 12.0329 14.2267 12C14.2267 11.9671 14.2332 11.9345 14.2458 11.9042C14.2584 11.8738 14.2768 11.8462 14.3001 11.823L23.5631 2.56097C23.8444 2.27931 24.0022 1.89745 24.002 1.49941C24.0017 1.10136 23.8433 0.71973 23.5616 0.438468C23.28 0.157206 22.8981 -0.000647135 22.5001 -0.000365836C22.102 -8.45362e-05 21.7204 0.158308 21.4391 0.439968L12.1771 9.69997C12.1539 9.72325 12.1263 9.74172 12.0959 9.75432C12.0656 9.76693 12.033 9.77342 12.0001 9.77342C11.9672 9.77342 11.9347 9.76693 11.9043 9.75432C11.8739 9.74172 11.8463 9.72325 11.8231 9.69997L2.56113 0.439968C2.42186 0.300636 2.25651 0.190098 2.07453 0.114667C1.89254 0.0392356 1.69748 0.000387673 1.50048 0.000341244C1.10262 0.000247476 0.721022 0.158206 0.439627 0.439468C0.158232 0.72073 9.38099e-05 1.10226 4.17235e-08 1.50011C-9.37265e-05 1.89797 0.157865 2.27957 0.439127 2.56097L9.70013 11.823C9.72341 11.8462 9.74188 11.8738 9.75448 11.9042C9.76709 11.9345 9.77357 11.9671 9.77357 12C9.77357 12.0329 9.76709 12.0654 9.75448 12.0958C9.74188 12.1262 9.72341 12.1537 9.70013 12.177L0.439127 21.44Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="ml-3 flex flex-initial flex-row">
                    <div
                      role="button"
                      className="flex min-w-0 flex-initial cursor-pointer flex-row items-baseline"
                    >
                      <button
                        aria-label="Move up"
                        className="inline-flex h-[28px] max-w-[28px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded border border-[#dfe1e4] bg-white px-[10px] shadow-sm hover:border-[#c9cbcd] hover:bg-[#f4f5f8]"
                        type="button"
                      >
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="#6B6F76"
                          className="-mx-[2px] inline-flex max-h-[18px] max-w-[18px] rotate-180 scale-125 items-center justify-center"
                        >
                          <path d="M1.415.057L.472 1l4 4 4-4-.944-.943-3.056 3.056L1.415.057z"></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      role="button"
                      className="ml-[6px] flex min-w-0 flex-initial cursor-pointer flex-row items-baseline"
                    >
                      <button
                        aria-label="Move down"
                        className="inline-flex h-[28px] max-w-[28px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded border border-[#dfe1e4] bg-white px-[10px] shadow-sm hover:border-[#c9cbcd] hover:bg-[#f4f5f8]"
                        type="button"
                      >
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="#6B6F76"
                          className="-mx-[2px] inline-flex max-h-[18px] max-w-[18px] scale-125 items-center justify-center"
                        >
                          <path d="M1.415.057L.472 1l4 4 4-4-.944-.943-3.056 3.056L1.415.057z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-shrink flex-grow basis-1 overflow-auto no-scrollbar rounded-b-md border border-[#eff1f4]">
                <div className="flex h-full w-full"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );

  const tabs = [
    { name: "Summary", href: `/projects/${data.project.id}`, current: true },
    {
      name: "Creators",
      href: `/projects/${data.project.id}/creators`,
      current: false,
    },
    { name: "Documents", href: "#", current: false },
    { name: "Deliverables", href: "#", current: false },
    { name: "Shipments", href: "#", current: false },
    { name: "Settings", href: "#", current: false },
  ];

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-row items-stretch overflow-hidden">
      <main className="relative flex flex-shrink flex-grow basis-1 flex-col place-items-stretch overflow-auto bg-white">
        <div className="absolute inset-0 flex flex-initial flex-row overflow-hidden bg-white">
          <div className="max-w-[100%] m-[12px] flex flex-shrink flex-grow basis-1 flex-col rounded-md bg-none shadow">
            <div className="flex max-h-12 flex-initial flex-row items-center rounded-t-md border border-b-0 border-[#eff1f4] bg-white p-3">
              <div className="flex flex-initial flex-row items-center ml-12 lg:ml-0">
                <div className="flex flex-initial flex-row">
                  <Link href="/projects">
                    <a
                      aria-label="Close"
                      className="group inline-flex items-center justify-center rounded p-1 font-medium hover:bg-[#f0f3f9]"
                      type="button"
                    >
                      <svg
                        className="text-[#6B6F76] group-hover:text-[#282a30]"
                        width="16"
                        height="16"
                        viewBox="-7 -7 38 38"
                        fill="currentColor"
                      >
                        <path d="M0.439127 21.44C0.157865 21.7214 -9.37008e-05 22.103 7.33302e-08 22.5008C9.38474e-05 22.8987 0.158232 23.2802 0.439627 23.5615C0.721022 23.8427 1.10262 24.0007 1.50048 24.0006C1.89834 24.0005 2.27987 23.8424 2.56113 23.561L11.8231 14.3C11.8463 14.2767 11.8739 14.2582 11.9043 14.2456C11.9347 14.233 11.9672 14.2265 12.0001 14.2265C12.033 14.2265 12.0656 14.233 12.0959 14.2456C12.1263 14.2582 12.1539 14.2767 12.1771 14.3L21.4391 23.563C21.5784 23.7023 21.7437 23.8128 21.9257 23.8883C22.1077 23.9637 22.3028 24.0025 22.4998 24.0026C22.6968 24.0026 22.8919 23.9639 23.0739 23.8885C23.2559 23.8132 23.4213 23.7027 23.5606 23.5635C23.7 23.4242 23.8105 23.2589 23.8859 23.0769C23.9614 22.8949 24.0002 22.6998 24.0003 22.5028C24.0003 22.3058 23.9615 22.1107 23.8862 21.9287C23.8109 21.7467 23.7004 21.5813 23.5611 21.442L14.3001 12.177C14.2768 12.1537 14.2584 12.1262 14.2458 12.0958C14.2332 12.0654 14.2267 12.0329 14.2267 12C14.2267 11.9671 14.2332 11.9345 14.2458 11.9042C14.2584 11.8738 14.2768 11.8462 14.3001 11.823L23.5631 2.56097C23.8444 2.27931 24.0022 1.89745 24.002 1.49941C24.0017 1.10136 23.8433 0.71973 23.5616 0.438468C23.28 0.157206 22.8981 -0.000647135 22.5001 -0.000365836C22.102 -8.45362e-05 21.7204 0.158308 21.4391 0.439968L12.1771 9.69997C12.1539 9.72325 12.1263 9.74172 12.0959 9.75432C12.0656 9.76693 12.033 9.77342 12.0001 9.77342C11.9672 9.77342 11.9347 9.76693 11.9043 9.75432C11.8739 9.74172 11.8463 9.72325 11.8231 9.69997L2.56113 0.439968C2.42186 0.300636 2.25651 0.190098 2.07453 0.114667C1.89254 0.0392356 1.69748 0.000387673 1.50048 0.000341244C1.10262 0.000247476 0.721022 0.158206 0.439627 0.439468C0.158232 0.72073 9.38099e-05 1.10226 4.17235e-08 1.50011C-9.37265e-05 1.89797 0.157865 2.27957 0.439127 2.56097L9.70013 11.823C9.72341 11.8462 9.74188 11.8738 9.75448 11.9042C9.76709 11.9345 9.77357 11.9671 9.77357 12C9.77357 12.0329 9.76709 12.0654 9.75448 12.0958C9.74188 12.1262 9.72341 12.1537 9.70013 12.177L0.439127 21.44Z"></path>
                      </svg>
                    </a>
                  </Link>
                </div>
                <div className="ml-3 flex flex-initial flex-row">
                  <div
                    role="button"
                    className="flex min-w-0 flex-initial cursor-pointer flex-row items-baseline"
                  >
                    <button
                      aria-label="Move up"
                      className="inline-flex h-[28px] max-w-[28px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded border border-[#dfe1e4] bg-white px-[10px] shadow-sm hover:border-[#c9cbcd] hover:bg-[#f4f5f8]"
                      type="button"
                    >
                      <svg
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="#6B6F76"
                        className="-mx-[2px] inline-flex max-h-[18px] max-w-[18px] rotate-180 scale-125 items-center justify-center"
                      >
                        <path d="M1.415.057L.472 1l4 4 4-4-.944-.943-3.056 3.056L1.415.057z"></path>
                      </svg>
                    </button>
                  </div>
                  <div
                    role="button"
                    className="ml-[6px] flex min-w-0 flex-initial cursor-pointer flex-row items-baseline"
                  >
                    <button
                      aria-label="Move down"
                      className="inline-flex h-[28px] max-w-[28px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded border border-[#dfe1e4] bg-white px-[10px] shadow-sm hover:border-[#c9cbcd] hover:bg-[#f4f5f8]"
                      type="button"
                    >
                      <svg
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="#6B6F76"
                        className="-mx-[2px] inline-flex max-h-[18px] max-w-[18px] scale-125 items-center justify-center"
                      >
                        <path d="M1.415.057L.472 1l4 4 4-4-.944-.943-3.056 3.056L1.415.057z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-shrink flex-grow basis-1 overflow-auto no-scrollbar rounded-b-md border border-[#eff1f4]">
              <div className="h-full w-full">
                <div>
                  <ProjectNavbar data={data} tabs={tabs} />
                  <div className="w-full grid grid-cols-12 h-screen lg:divide-x lg:divide-gray-200">
                    <div className="col-span-12 lg:col-span-8 max-w-5xl mt-2 px-6 lg:px-8 py-4 space-y-12">
                      <div className="space-y-2">
                        <h2 className="font-medium text-lg text-gray-900">
                          {" "}
                          Project overview
                        </h2>
                        <p className="text-sm font-normal text-gray-700">
                          {" "}
                          {data.project.description && data.project.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-medium text-lg text-gray-900">
                          {" "}
                          Project roles{" "}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          <div className="flex items-center space-x-2 group">
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 group-hover:border-gray-300 group-hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <a className="text-sm font-normal text-gray-500 group-hover:text-gray-700 cursor-pointer">
                              {" "}
                              Add member{" "}
                            </a>
                          </div>
                          {data.projectAdmins.map((user) => (
                            <div
                              className="flex items-center space-x-2"
                              key={user.user.id}
                            >
                              {user.user.image ? (
                                <Image
                                  src={user.user.image}
                                  className="flex-shrink-0 rounded-full max-w-none object-cover"
                                  width={32}
                                  height={32}
                                />
                              ) : (
                                <div className="flex-shrink-0 rounded-full w-8 h-8 bg-indigo-600"></div>
                              )}
                              <div>
                                <p className="text-sm text-gray-900">
                                  {user.user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.role}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-medium text-lg text-gray-900">
                          Key resources
                        </h2>
                        {data.project.brief ? (
                          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                            <Link href={`/projects/${data.project.id}/brief`}>
                              <a className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                                <div className="flex flex-grow flex-col space-y-2 p-4">
                                  <h2 className="text-lg font-medium text-gray-900">
                                    {data.project.name}'s Project Brief
                                  </h2>
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-1">
                                      <p className="text-sm font-normal text-gray-500">
                                        {data.projectAdmins[0].user.name}
                                      </p>
                                      <p className="text-sm font-normal text-gray-500">
                                        ∙
                                      </p>
                                      <p className="text-sm font-normal text-gray-500">
                                        TBD
                                      </p>
                                    </div>
                                    <p className="text-sm font-normal text-gray-500">
                                      🔒 {data.project.name}
                                    </p>
                                  </div>
                                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
                                    <span className="text-xs font-medium leading-none text-white">
                                      {(
                                        data.projectAdmins[0].user.name
                                          .split(" ")
                                          .shift()
                                          .charAt(0) +
                                        data.projectAdmins[0].user.name
                                          .split(" ")
                                          .pop()
                                          .charAt(0)
                                      ).toUpperCase()}
                                    </span>
                                  </span>
                                </div>
                                <div className="flex-shrink-0 items-end bg-gray-100 px-4 py-3">
                                  <p className="text-normal text-sm text-gray-500">
                                    Last viewed just now
                                  </p>
                                </div>
                              </a>
                            </Link>
                          </div>
                        ) : (
                          <div className="w-full border border-gray-200 rounded-md py-4 px-8 mx-auto items-center justify-center text-center space-y-2">
                            <p className="max-w-sm mx-auto text-sm font-normal text-gray-700">
                              {" "}
                              Align your team around a shared vision with a
                              project brief and supporting files.{" "}
                            </p>
                            <div className="flex items-center space-x-2 justify-center">
                              <Link
                                href={`/projects/${data.project.id}/brief/edit`}
                              >
                                <a className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#0C3D8D] hover:bg-[#3D64A4] transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C3D8D]">
                                  Create project brief
                                </a>
                              </Link>
                              <button
                                type="button"
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C3D8D]"
                              >
                                Add files and links
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-medium text-lg text-gray-900">
                          Milestones
                        </h2>
                        <p className="text-sm font-normal text-gray-700">
                          Milestones coming soon
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block lg:col-span-4 bg-slate-100 max-w-5xl pt-12 px-6 lg:px-8 pb-4 space-y-6">
                      <div className="flex items-baseline justify-between">
                        <p className="text-lg font-medium text-teal-500">
                          {" "}
                          On track{" "}
                        </p>
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Update status
                        </button>
                      </div>
                      <div className="w-full bg-white shadow rounded-md p-4 space-y-1 border-t-8 border-teal-500">
                        <p className="text-sm font-medium text-gray-900">
                          {" "}
                          All systems go for launch{" "}
                        </p>
                        <p className="text-sm font-normal text-gray-700">
                          {" "}
                          Project is all set up and ready to progress. Add
                          milestones to set goals for your team.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Project;
Project.auth = true;
