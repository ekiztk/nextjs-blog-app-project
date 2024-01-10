"use client";

import { Option, PostData } from "@/utils/types";
import SingleBlog from "../single-blog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function BlogList({
  lists,
  reFetch,
}: {
  lists: PostData[];
  reFetch: (sortField: string, sortOrder: string) => any;
}) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Option[]>([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);

  const [posts, setPosts] = useState<PostData[]>(lists || []);
  const [sortField, setSortField] = useState("lastModifyDate");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPosts = async () => {
      const newPosts: PostData[] = await reFetch(sortField, sortOrder);
      setPosts(newPosts);
    };
    fetchPosts();
  }, [sortField, sortOrder]);

  useEffect(() => {
    fetch(`/api/category`, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories([...data?.data]);
        setCategoriesLoading(false);
      });
  }, []);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await res.json();

    if (data && data.success) router.refresh();
  }

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          <div className="rounded-md bg-primary bg-opacity-5 bg-primary/[10%] dark:bg-opacity-10">
            <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
              Filter by Category
            </h3>
            <div className="flex flex-wrap py-6 px-8">
              {isCategoriesLoading ? (
                <Spinner />
              ) : (
                categories?.map((catItem) => (
                  <button
                    onClick={() => {
                      if (catItem.value === selectedCategory)
                        setSelectedCategory("");
                      else setSelectedCategory(catItem.value);
                    }}
                    className={`mr-3 mb-3 inline-flex items-center justify-center rounded-md ${
                      catItem.value === selectedCategory
                        ? "bg-green"
                        : "bg-primary"
                    } py-2 px-4 text-white duration-300`}
                  >
                    {catItem.label}
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="rounded-md bg-primary bg-opacity-5 bg-primary/[10%] dark:bg-opacity-10">
            <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
              Sort
            </h3>
            <div className="flex flex-wrap py-2 px-8 gap-2">
              <label>
                Sort Field:
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base placeholder-body-color shadow-one focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                >
                  <option value="title">Title</option>
                  <option value="lastModifyDate">Last Modify Date</option>
                </select>
              </label>
              <label>
                Sort Order:
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base placeholder-body-color shadow-one focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <h2 className="my-4 text-center text-2xl font-bold">Post List</h2>
        <div className="-mx-4 grid grid-cols-1 md:grid-cols-3  gap-2 ">
          {posts && posts.length
            ? posts.map((listItem: PostData) => {
                if (
                  selectedCategory !== "" &&
                  listItem.category.value !== selectedCategory
                ) {
                  return <></>;
                }

                return (
                  <div className="px-4" key={listItem.id}>
                    <SingleBlog
                      handleDelete={handleDelete}
                      blogItem={listItem}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
}
