import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const validRoles = ["admin", "super-user", "SEO"];
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { protocol, host, pathname } = req.nextUrl;
    if (!session) {
      return NextResponse.redirect(
        `${protocol}//${host}/auth/login?p=${pathname}`
      );
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const session: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { protocol, host, pathname } = req.nextUrl;
    if (!session) {
      return NextResponse.redirect(
        `${protocol}//${host}/auth/login?p=${pathname}`
      );
    }

    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(`${protocol}//${host}/`);
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    const session: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin", "/api/admin/:path*"],
  runtime: "experimental-edge",
  unstable_allowDynamic: [
    "/node_modules/jose", // use a glob to allow anything in the function-bind 3rd party module
  ],
};
