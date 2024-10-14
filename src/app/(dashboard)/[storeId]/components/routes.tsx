"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";

type Props = {
	className?: string;
} & HTMLAttributes<HTMLElement>;

const NavRoutes = ({ className, ...rest }: Props) => {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/${params.storeId}/settings`,
			label: "Settings",
			active: pathname === `/${params.storeId}/settings`,
		},
	];

	return (
		<nav className={cn("flex items-center", className)} {...rest}>
			{routes.map((route) => (
				<Link
					href={route.href}
					key={route.href}
					className={cn(
						"text-sm",
						route.active
							? "text-zinc-700 font-semibold"
							: "text-muted-foreground",
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
};

export default NavRoutes;
