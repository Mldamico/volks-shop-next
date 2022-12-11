import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const token = req.cookies.get("token");

    try {
      await jose.jwtVerify(
        (token?.value as unknown as string) || "",
        new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
      );

      return NextResponse.next();
    } catch (error) {
      console.error(`JWT Invalid or not signed in`, { error });
      const { protocol, host, pathname } = req.nextUrl;

      return NextResponse.redirect(
        `${protocol}//${host}/auth/login?p=${pathname}`
      );
    }
  }
}

export const config = {
  matcher: ["/checkout/:path*"],
  runtime: "experimental-edge",
  unstable_allowDynamic: [
    "/node_modules/jose", // use a glob to allow anything in the function-bind 3rd party module
  ],
};
