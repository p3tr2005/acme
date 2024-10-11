import { jakartaSans } from "@/lib/fonts";
import type { Children } from "@/types";
import { Toaster } from "@/ui/components/sonner";
import "@/ui/styles/main.css";

const Layout = ({ children }: Children) => {
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
