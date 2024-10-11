"use client";

import type { Children } from "@/types";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type Props = {
	icon?: ReactNode;
	loading?: boolean;
} & Children &
	ButtonProps;

const ButtonFallback = ({ icon, children, loading, ...props }: Props) => {
	const { pending } = useFormStatus();
	return (
		<Button {...props}>
			{loading || pending ? (
				<Loader2Icon size={18} className="animate-spin" />
			) : (
				<div className={cn(icon && "flex items-center justify-between gap-4")}>
					{icon}
					{children}
				</div>
			)}
		</Button>
	);
};

export default ButtonFallback;
