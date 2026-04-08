import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  let isAuthenticated = false;
  let role = Roles.user;

  if (data?.user) {
    isAuthenticated = true;
    role = data.user.role;
  }

  if (!isAuthenticated && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
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
