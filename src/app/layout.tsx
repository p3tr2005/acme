import "@/ui/styles/main.css";
import type { Children } from "@/types";

import { jakartaSans } from "@/lib/fonts";
import { Toaster } from "@/ui/components/sonner";
import ModalProvider from "@/ui/components/modal-provider";

const Layout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body className={jakartaSans.className}>
        <ModalProvider />
        {children}
        <Toaster richColors position="top-center" theme="light" />
      </body>
    </html>
  );
};

export default Layout;
