import { UserProps } from "@/utils/types";
import Profile from "./profile";

interface Param {
  email: string;
}

async function extractUserDetails(email: string) {
  const res = await fetch(`${process.env.URL}/api/auth/profile/${email}`, {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  console.log(data.data);

  if (data.success) {
    return data.data;
  } else {
    return null;
  }
}

export default async function Page({ params }: { params: Param }) {
  const { email } = params;
  const user: UserProps = await extractUserDetails(email);

  return <Profile user={user} />;
}
