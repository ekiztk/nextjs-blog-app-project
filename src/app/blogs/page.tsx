import BlogList from "@/components/blogs/blog-list";

async function extractAllBlogs(
  sortField: string = "lastModifyDate",
  sortOrder: string = "asc"
) {
  "use server";
  const res = await fetch(
    `${process.env.URL}/api/blog-post/get-all-posts?sortField=${sortField}&sortOrder=${sortOrder}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (data.success) return data.data;
}

export default async function Blogs() {
  const blogPostsList = await extractAllBlogs();

  return <BlogList reFetch={extractAllBlogs} lists={blogPostsList} />;
}
