import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log('Token not found');
    return NextResponse.redirect(new URL("/signinup", request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    console.log('Token is valid');
    return NextResponse.next();
  } catch (err) {
    console.error('Token is invalid:', err);
    return NextResponse.redirect(new URL("/signinup", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
