import Calendar from "components/dashboard/Calendar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function CalendarPage() {
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

  return <Calendar />;
}
