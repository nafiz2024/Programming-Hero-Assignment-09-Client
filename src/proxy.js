import { NextResponse } from 'next/server'
 
export async function proxy(request) {
    const { pathname } = request.nextUrl;
    const cookieStore = request.cookies.getAll();
    const hasSessionCookie = cookieStore.some((cookie) => {
      const name = String(cookie?.name || "").toLowerCase();
      if (!name) return false;
      return (
        name.includes("session_token") ||
        name.includes("session") ||
        name.includes("better-auth")
      );
    });

    if (pathname === "/explore-car") {
        return NextResponse.next();
    }

    if (!hasSessionCookie) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

 
export const config = {
  matcher: ['/add-car', '/my-bookings', '/my-added-cars', '/explore-car/:path*'],
}
