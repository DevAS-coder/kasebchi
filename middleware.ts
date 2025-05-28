import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl;

  const isLoginPage = url.pathname === "/login";

  if (!token) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);

    if (isLoginPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Token is invalid:', err);

    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}


export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
