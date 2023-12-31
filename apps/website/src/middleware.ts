import { NextRequest, NextResponse } from "next/server";
import {env} from "~/env.mjs";
import { authMiddleware } from "@clerk/nextjs";



export const config = {
  matcher: [
    "/((?!.*\\..*|_next|_static/|_vercel|[\w-]+\.\w+).*)", "/", "/(api|trpc)(.*)"
  ],
};

const middleware = (req: NextRequest) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
      .get("host")!
      .replace(".localhost:3000", `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
      hostname.includes("---") &&
      hostname.endsWith(`.${env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
        process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
        new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite root application to `/home` folder
  if (
      hostname === "localhost:3000" ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
        new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

export default authMiddleware({
  beforeAuth: async (req) => {
    return middleware(req);
  },
  publicRoutes: [
    "/api/webhooks(.*)",
    "/api/trigger",
    "/api/status",
    "/api/uploadthing",
    "/api/slides",
    "/",
  ],
});