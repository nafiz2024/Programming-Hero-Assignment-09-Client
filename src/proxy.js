import { NextResponse } from 'next/server'
 
export async function proxy(request) {
    const { pathname } = request.nextUrl;
    const sessionCookie =
      request.cookies.get("drivefleet-auth.session_token")?.value ||
      request.cookies.get("drivefleet-auth.session")?.value;

    if (pathname === "/explore-car") {
        return NextResponse.next();
    }

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

 
export const config = {
  matcher: ['/add-car', '/my-bookings', '/my-added-cars', '/explore-car/:path*'],
}
