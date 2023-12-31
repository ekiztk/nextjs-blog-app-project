"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  “Unleashing Ideas, One Post at a Time!”
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  Welcome to {process.env.NEXT_PUBLIC_WEBSITE_NAME}, a blog
                  where thoughts and ideas flow freely. Here, you’ll find a
                  variety of blog posts reflecting on a wide range of topics.
                  From lifestyle tips and book reviews to travel experiences and
                  personal reflections, we cover it all. Dive into the cascade
                  of thoughts and explore the world through different lenses.
                  Let’s embark on this journey of discovery together!
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white 
                  hover:bg-primary/80"
                  href={"/blogs"}
                >
                  Explore All Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
