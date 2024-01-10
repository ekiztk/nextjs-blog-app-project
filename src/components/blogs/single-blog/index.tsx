import { PostData } from "@/utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function SingleBlog({
  blogItem,
  handleDelete,
}: {
  blogItem: PostData;
  handleDelete: (id: number) => {};
}) {
  const { id, image, category, title, author, slug, lastModifyDate } = blogItem;
  const { data: session } = useSession();

  return (
    <div className="bg-primary/[10%]">
      <div className="relative overflow-hidden rounded-md  shadow-one dark:bg-dark">
        <div className="relative block h-[196px] w-full">
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-green py-2 px-4 text-sm font-semibold capitalize text-white">
            {category?.label}
          </span>
          <Image src={image || "/placeholder.png"} alt="Blog Post" fill />
        </div>
      </div>
      <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h4>
          <Link
            className="mb-1 text-ellipsis overflow-hidden whitespace-nowrap block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            href={`/blogs/${slug}`}
          >
            {title}
          </Link>
        </h4>
        <p className="h-[20px] text-ellipsis overflow-hidden whitespace-nowrap mb-6 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {new Date(lastModifyDate ?? Date.now()).toDateString()}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <Link
              className=" flex flex-row items-center justify-center"
              href={`/profile/${author?.email}`}
            >
              <div className="mr-4">
                <div className="h-10 relative w-10 overflow-hidden rounded-full">
                  <Image
                    src={author?.image || "/user.png"}
                    alt="Blog Post"
                    fill
                  />
                </div>
              </div>
              <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                By {author?.name}
              </p>
            </Link>
            <div>
              {session !== null && session?.user?.email === author?.email ? (
                <FaTrash
                  onClick={() => handleDelete(id)}
                  size={16}
                  className="cursor-pointer"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
