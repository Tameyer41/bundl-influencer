import AdminLayout from "./AdminLayout";
import CreatorLayout from "./CreatorLayout";
import { useSession } from "next-auth/react";

export default function Layout(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading)
    return (
      <div className="w-full h-screen grid place-items-center">
        <div
          className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full text-white"
          role="status"
        ></div>
      </div>
    );

  return (
    <>
      {!session && !loading && <main>{props.children}</main>}
      {session &&
        (session.role === "admin" ? (
          <AdminLayout props={props} />
        ) : (
          <CreatorLayout props={props} />
        ))}
    </>
  );
}
