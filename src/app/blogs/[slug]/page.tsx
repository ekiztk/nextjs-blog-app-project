import BlogDetailsHome from "@/components/blogs/blog-details";

interface Param {
  slug: string;
}

async function extractBlogDetails(slug: string) {
  const res = await fetch(
    `${process.env.URL}/api/blog-post/blog-details?slug=${slug}`,
    {
      method: "GET",
      next: {
        revalidate: 0,
      },
    }
  );

  const data = await res.json();
  console.log(data.data);

  if (data.success) return data.data;
}

export default async function BlogDetails({ params }: { params: Param }) {
  const { slug } = params;

  const blogData = await extractBlogDetails(slug);

  return <BlogDetailsHome blogData={blogData} />;
}
