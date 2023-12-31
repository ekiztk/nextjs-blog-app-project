"use client";
import { UserProps } from "@/utils/types";
import { useSession } from "next-auth/react";
import EditProfile from "./edit-profile";

const Profile = ({ user }: { user: UserProps }) => {
  const { data: session, status } = useSession();

  if (!user) {
    return (
      <section className="pt-[120px] pb-[120px]">
        <div>no user found</div>
      </section>
    );
  }

  if (status === "authenticated" && session.user?.email === user.email) {
    return <EditProfile authUser={user} />;
  }

  return (
    <section className="overflow-hidden py-12 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[10%] py-10 dark:bg-dark sm:p-[40px] lg:mb-5 lg:px-8 xl:p-[40px] px-8 flex flex-col justify-center items-center gap-2">
              <img
                src={user?.image || "/user.png"}
                alt={user?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h1 className="text-3xl font-semibold text-center">
                {user?.name}
              </h1>
              <div>
                <h5 className="text-lg font-semibold text-center">Email</h5>
                <p className="text-gray-700 text-center">{user?.email}</p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-center">
                  Birth Date
                </h5>
                <p className="text-gray-700 text-center">
                  {new Date(user?.birthDate).toDateString()}
                </p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-center">About Me</h5>
                <p className="text-gray-700 text-center"> {user?.aboutMe}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
