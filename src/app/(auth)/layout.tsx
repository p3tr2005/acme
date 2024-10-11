import { auth } from "@/auth";
import { DEFAULT_AUTH_REDIRECT } from "@/lib/constants";
import { jakartaSans } from "@/lib/fonts";
import type { Children } from "@/types";
import { Toaster } from "@/ui/components/sonner";
import "@/ui/styles/main.css";
import { redirect } from "next/navigation";

const Layout = async ({ children }: Children) => {
  const session = await auth()

  if (session) redirect(DEFAULT_AUTH_REDIRECT)

  return (
    <html lang="en">
      <body className={jakartaSans.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
};

export default Layout;
