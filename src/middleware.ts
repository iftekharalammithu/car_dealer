import { auth } from "@/auth";
import { routes } from "./config/route";
import { NextResponse } from "next/server";

function setRequestHeaders(requestHeaders: Headers) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'nonce-${nonce}';
  img-src 'self' blob: data:;
  font-src 'self';
  base-uri 'self';
  object-src 'none';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

  requestHeaders.set("x-auth-token", `Bearer ${process.env.X_AUTH_TOKEN}`);

  const contentSecurityPolicy = cspHeader.replace(/\s{2,}/g, " ").trim();
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);
}

export default auth((req) => {
  const nextUrl = req.nextUrl.clone();
  const requestHeader = new Headers(req.headers);
  setRequestHeaders(requestHeader);

  if (req.auth) {
    if (req.auth.requires2FA) {
      if (nextUrl.pathname === routes.challenge) {
        return NextResponse.next();
      }
      const challengeUrl = new URL(routes.challenge, req.url);
      return NextResponse.redirect(challengeUrl);
    }
    if (
      nextUrl.pathname === routes.challenge ||
      nextUrl.pathname === routes.signIn
    ) {
      const adminUrl = new URL(routes.admin.dashboard, req.url);
      return NextResponse.redirect(adminUrl);
    }
  } else {
    if (
      nextUrl.pathname.startsWith("/admin") ||
      nextUrl.pathname === routes.challenge
    ) {
      const signInUrl = new URL(routes.signIn, req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next({
    request: {
      headers: requestHeader,
    },
  });
});

export const config = {
  matcher:
    "/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json|logo.svg).*)",
  runtime: "nodejs",
};
