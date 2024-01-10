"use client";

import Button from "@/components/button";
import { PostData } from "@/utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetailsHome({ blogData }: { blogData: PostData }) {
  console.log(blogData.comments, "blogData");

  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCommentSave() {
    const response = await fetch(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
        postId: blogData?.id,
      }),
    });

    const data = await response.json();

    console.log(data, "comment123");

    if (data && data.success) {
      setComment("");
      router.refresh();
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      router.refresh();
    }, 200000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!blogData) return null;

  return (
    <>
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black text-center dark:text-white sm:text-4xl">
                  {blogData?.title}
                </h2>
                <p className="text-center mb-10 text-body-color dark:text-white">{`Created At: ${new Date(
                  blogData.createDate ?? Date.now()
                ).toUTCString()}, Modified At: ${new Date(
                  blogData.lastModifyDate ?? Date.now()
                ).toUTCString()}`}</p>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mr-10 mb-5 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={blogData?.author?.image || "/user.png"}
                            alt="User"
                            fill
                          />
                        </div>
                      </div>
                      <Link href={`/profile/${blogData?.author.email}`}>
                        <div className="w-full">
                          <h4 className="mb-1 text-base font-medium text-body-color">
                            {blogData?.author?.name}
                          </h4>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link
                      className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-white"
                      href=""
                    >
                      {blogData?.category?.label}
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={blogData?.image || "/placeholder.png"}
                        alt="Blog"
                        className="object-cover object-center"
                        fill
                      />
                    </div>
                  </div>
                  <p className="mb-8 whitespace-pre-wrap break-keep leading-relaxed text-base font-medium sm:text-lg lg:text-base xl:text-lg">
                    {JSON.parse(blogData?.content)}
                  </p>
                </div>
              </div>
            </div>
            {session !== null ? (
              <div className="bg-primary/[10%] p-4 w-full lg:w-8/12 flex gap-4">
                <>
                  <input
                    name="comment"
                    id="comment"
                    autoFocus
                    autoComplete="off"
                    placeholder="Write comment here"
                    value={comment}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setComment(event.target.value)
                    }
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                  />
                  <Button text="Add" onClick={handleCommentSave} />
                </>
              </div>
            ) : null}
            <section className="dark:bg-gray-900  py-8 lg:py-16 w-full lg:w-8/12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-white">
                  Comments ({blogData?.comments.length})
                </h2>
              </div>
              {blogData && blogData.comments && blogData.comments.length > 0
                ? blogData.comments.map((comment) => (
                    <div className="p-6 text-base rounded-lg bg-primary/[10%] dark:bg-gray-900">
                      <div className="flex justify-between items-center mb-2">
                        <Link href={`/profile/${comment.author.email}`}>
                          <div className="flex items-center">
                            <Image
                              src={comment?.author?.image || "/user.png"}
                              className="mr-2 rounded-full"
                              alt="User"
                              width={24}
                              height={24}
                              unoptimized
                            />
                            <p className="inline-flex items-center mr-3 text-sm text-black dark:text-white font-semibold">
                              {`${comment.author.name} (Author)  | ${new Date(
                                comment.createDate ?? Date.now()
                              ).toUTCString()}`}
                            </p>
                          </div>
                        </Link>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">
                        {comment.content}
                      </p>
                    </div>
                  ))
                : null}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
