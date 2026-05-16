import { getIronSession } from "iron-session";
import { type NextRequest, NextResponse } from "next/server";
import type { SessionData } from "@/lib/auth";
import { sessionOptions } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();
  // Allow unauthenticated access to the login page itself
  if (req.nextUrl.pathname === "/admin") return NextResponse.next();

  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return res;
}

export const config = { matcher: ["/admin/:path*"] };
