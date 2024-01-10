"use client";

import Button from "@/components/button";
import Spinner from "@/components/spinner";
import { firebaseConfig } from "@/utils";
import { UserProps } from "@/utils/types";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";

//mock data yüklemek kaldı
const app = initializeApp(firebaseConfig);
const stroage = getStorage(app, "gs://nextjs-blog-d6881.appspot.com");

function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);

  return `${fileName}-${timeStamp}-${randomString}`;
}

async function handleImageSaveToFireBase(file: any) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const stroageRef = ref(stroage, `user/${extractUniqueFileName}`);
  const uploadImg = uploadBytesResumable(stroageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
}

interface EditProfileProps extends Omit<UserProps, "birthDate"> {
  password?: string;
  birthDate?: Date | string;
}

export default function EditProfile({
  authUser,
}: {
  authUser: EditProfileProps;
}) {
  const { update } = useSession();
  const params = useParams<{ email: string }>();
  const [user, setUser] = useState(
    { ...authUser, password: "" } || {
      email: "",
      password: "",
      name: "",
      aboutMe: "",
      birthDate: new Date(),
      image: "",
    }
  );

  useEffect(() => {}, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "birthDate") {
      setUser({ ...user, [e.target.name]: new Date(e.target.value) });
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [imageLoading, setImageLoading] = useState<boolean>(false);

  async function handleUserImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return;
    setImageLoading(true);
    const saveImageToFirebase: any = await handleImageSaveToFireBase(
      event.target.files[0]
    );

    if (saveImageToFirebase !== "") {
      setImageLoading(false);
      console.log(saveImageToFirebase, "saveImageToFirebase");
      setUser({
        ...user,
        image: saveImageToFirebase,
      });
    }
  }

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(user);
    // API endpoint to update the user
    const res = await fetch(`/api/auth/profile/${params?.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...user,
        birthDate: new Date(user.birthDate!).toISOString(),
      }),
    });

    if (res.status === 200) {
      alert("başarıyla update edildi.");
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <section className="overflow-hidden py-12 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[10%] py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-8">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Update Your Profile
              </h2>
              <div>
                <form onSubmit={handleUserSubmit}>
                  <div className="flex gap-3">
                    {imageLoading ? (
                      <div className="w-1/2">
                        <Spinner />
                      </div>
                    ) : (
                      <img
                        src={user?.image || "/user.png"}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                      />
                    )}
                    <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Upload User Image
                      </label>
                      <input
                        id="fileinput"
                        accept="image/*"
                        max={1000000}
                        onChange={handleUserImageChange}
                        type="file"
                        className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                      className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base  placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                      className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base  placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </label>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </label>
                  <label>
                    About Me:
                    <textarea
                      name="aboutMe"
                      value={user.aboutMe}
                      onChange={handleChange}
                      className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base  placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </label>
                  <label>
                    Birth Date:
                    <input
                      type="date"
                      name="birthDate"
                      value={
                        new Date(user.birthDate!).getFullYear().toString() +
                        "-" +
                        (new Date(user.birthDate!).getMonth() + 1)
                          .toString()
                          .padStart(2, "0") +
                        "-" +
                        new Date(user.birthDate!)
                          .getDate()
                          .toString()
                          .padStart(2, "0")
                      }
                      onChange={handleChange}
                      className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </label>
                  <div className="w-full px-4">
                    <Button text="Update Profile" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
