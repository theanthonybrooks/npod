import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const { pathname } = request.nextUrl;

  // Regex for Apple devices
  const isAppleDevice = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(userAgent);
  console.log("pathname: ", pathname);
  if (pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isAppleDevice) {
    // Do something for Apple devices
  }

  const response = NextResponse.next();
  //   response.cookies.set("isAppleDevice", isAppleDevice ? "true" : "false", {
  //     path: "/",
  //   });
  return response;
}

export const config = {
  matcher: "/:path*",
};
