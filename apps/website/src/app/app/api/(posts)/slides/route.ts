import { NextResponse } from "next/server";

import { db } from "@gramflow/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const post_link = searchParams.get("post_link");
  console.log({ post_link });
  if (!post_link) {
    return NextResponse.json({ error: "Post link is required" });
  }

  const slides = await db.slides.findMany({
    where: {
      post_link: post_link.endsWith("/") ? post_link : `${post_link}/`,
    },
  });

  console.log({ slides });
  return NextResponse.json(slides);
};
