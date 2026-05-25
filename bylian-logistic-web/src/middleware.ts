import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  
  // Extract the port number from host header (e.g. localhost:3344 -> 3344)
  const port = host.split(":")[1] || "";

  // 1. PUBLIC WEB PORT (3344)
  if (port === "3344") {
    // Restrict access to any admin panel pages on the public port
    if (url.pathname.startsWith("/admin")) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Access Denied - Bylian Logistic</title>
            <style>
              body { font-family: sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
              div { max-width: 500px; padding: 40px; border: 1px solid #1e293b; background: #020617; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
              h1 { color: #f97316; margin-top: 0; }
              p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
              code { background: #1e293b; padding: 4px 8px; border-radius: 6px; color: #e2e8f0; font-family: monospace; }
            </style>
          </head>
          <body>
            <div>
              <h1>Access Restricted</h1>
              <p>The Admin Workspace cannot be accessed via the Public Web port (3344).</p>
              <p>Please use the designated secure port to access administrative terminals:<br />
                <code>http://localhost:4455/admin</code>
              </p>
            </div>
          </body>
        </html>`,
        {
          status: 403,
          headers: { "content-type": "text/html; charset=utf-8" }
        }
      );
    }
  }

  // 2. ADMIN PORT (4455)
  if (port === "4455") {
    // If accessing root of port 4455, auto-redirect to admin panel
    if (url.pathname === "/") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    // Force redirection of any public routes (non-admin, non-static/api) to the admin workspace
    const isStaticOrApi = 
      url.pathname.startsWith("/api") || 
      url.pathname.startsWith("/_next") || 
      url.pathname.includes(".") || 
      url.pathname === "/favicon.ico";

    if (!url.pathname.startsWith("/admin") && !isStaticOrApi) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
