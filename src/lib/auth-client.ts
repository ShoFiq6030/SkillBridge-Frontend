import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: "http://localhost:5000",
  // baseURL: "https://skill-bridge-backend-green.vercel.app/",
  baseURL: env.NEXT_PUBLIC_API_URL,
  callbackURL: "http://localhost:3000",
});

