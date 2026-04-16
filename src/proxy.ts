import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;

    // Skip middleware for verify-email route
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Check for session token in cookies
  // console.log("cookies:",request.cookies)
  const sessionToken = request.cookies.get("__Secure-better-auth.session_token");
  console.log("Session token in proxy:", sessionToken);


  //* User is not authenticated at all
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  const { data } = await  userService.getSession();
  console.log("Session data in proxy:", data); 
  
  let role = Roles.user;

  if (data?.user) {
    isAuthenticated = true;
    role = data.user.role;
  }

  if (!isAuthenticated && pathname !== "/login") {
    console.log("redirect")
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/dashboard") {
    if (role === Roles.user) {
      return NextResponse.redirect(
        new URL("/dashboard/user-dashboard", request.url),
      );
    }
    if (role === Roles.tutor) {
      return NextResponse.redirect(
        new URL("/dashboard/tutor-dashboard", request.url),
      );
    }

    if (role === Roles.admin) {
      return NextResponse.redirect(
        new URL("/dashboard/admin-dashboard", request.url),
      );
    }

    return NextResponse.next();
  }

  // Admin access control
  if (
    role === Roles.admin &&
    (pathname.startsWith("/dashboard/tutor-dashboard") ||
      pathname.startsWith("/dashboard/user-dashboard"))
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/admin-dashboard", request.url),
    );
  }

  // Tutor access control
  if (
    role === Roles.tutor &&
    (pathname.startsWith("/dashboard/admin-dashboard") ||
      pathname.startsWith("/dashboard/user-dashboard"))
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/tutor-dashboard", request.url),
    );
  }

  // User access control
  if (
    role === Roles.user &&
    (pathname.startsWith("/dashboard/admin-dashboard") ||
      pathname.startsWith("/dashboard/tutor-dashboard"))
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/user-dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/dashboard/:path*"],
};
