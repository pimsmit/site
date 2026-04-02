"use client";

import { Star, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  rating?: number;
  className?: string;
}

interface BlogGridProps {
  title: string;
  description: string;
  posts?: BlogPost[];
  className?: string;
}

export function BlogGrid({
  title,
  description,
  posts = [],
  className,
}: BlogGridProps) {
  return (
    <section className={cn("py-24 px-6", className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-semibold capitalize !leading-[1.4] md:text-5xl lg:text-6xl mb-2 text-ainomiq-text">
          {title}
        </h2>
        <p className="mx-auto max-w-[800px] text-center text-lg !leading-[2] text-ainomiq-text-muted md:text-xl mb-10">
          {description}
        </p>

        <div className="grid h-auto grid-cols-1 gap-5 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr]">
          {posts.map((post, index) => {
            const isPrimary = index === 0;
            const rating = post.rating ?? 4;

            return (
              <a
                key={post.id}
                href={post.href}
                style={{ backgroundImage: `url(${post.imageUrl})` }}
                className={cn(
                  "group relative row-span-1 flex size-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-5 text-white max-md:h-[300px] transition-all duration-300 hover:scale-[0.98] hover:rotate-[0.3deg]",
                  isPrimary &&
                    "col-span-1 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1",
                  post.className
                )}
              >
                <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:h-full" />

                <article className="relative z-0 flex items-end">
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-3xl font-semibold md:text-4xl">
                      {post.title}
                    </h3>
                    <div className="flex flex-col gap-3">
                      <span className="text-base capitalize py-px px-2 rounded-md bg-white/40 w-fit text-white backdrop-blur-md">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              width={20}
                              height={20}
                              stroke={
                                idx < rating ? "#ffa534" : "#B9B8B8aa"
                              }
                              fill={
                                idx < rating ? "#ffa534" : "#B9B8B8aa"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-lg font-thin">
                          ({post.views.toLocaleString()} Views)
                        </span>
                      </div>
                      {post.readTime && (
                        <div className="text-xl font-semibold">
                          {post.readTime} min read
                        </div>
                      )}
                    </div>
                  </div>
                  <MoveRight
                    className="transition-all duration-300 group-hover:translate-x-2"
                    color="white"
                    width={40}
                    height={40}
                    strokeWidth={1.25}
                  />
                </article>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
