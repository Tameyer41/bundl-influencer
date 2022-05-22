import AdminLayout from "./AdminLayout";
import CreatorLayout from "./CreatorLayout";
import { useSession } from "next-auth/react";

export default function Layout(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return <div>Loading...</div>;

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
