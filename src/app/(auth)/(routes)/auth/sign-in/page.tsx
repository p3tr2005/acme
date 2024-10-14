"use client";

import { ShirtIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { type SignInPayload, signInSchema } from "@/lib/validations/auth";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/ui/components/card";
import OAuth from "@/ui/components/oauth";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/components/form";
import { Input } from "@/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonFallback from "@/ui/components/button-fallback";
import Link from "next/link";
import { signInAction } from "@/app/_actions/sign-in-action";

const SignIn = () => {
	const form = useForm<SignInPayload>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignInPayload) => {
		const err = await signInAction(values);

		if (!err) {
			toast.success("Sign in successful");

			return;
		}

		toast.error(err.error);

		return;
	};
	return (
		<Card className="w-[450px] mt-32 mx-auto rounded-md p-3">
			<CardHeader className="flex-col items-center gap-4">
				<ShirtIcon size={30} />
				<CardTitle className="text-4xl font-bold">Sign In</CardTitle>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold">Email</FormLabel>
									<FormControl>
										<Input placeholder="name@domain.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold">Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="******" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ButtonFallback
							loading={form.formState.isSubmitting}
							disabled={form.formState.isSubmitting}
							className="w-full font-bold"
							size="lg"
							type="submit"
						>
							sign in
						</ButtonFallback>
					</form>
				</Form>
				<OAuth />
			</CardContent>

			<CardFooter className="text-sm font-semibold text-zinc-500">
				<p>
					Doen&apos;t have an account?{" "}
					<Link
						className="text-green-600 font-bold hover:underline"
						href="/auth/sign-up"
					>
						create account
					</Link>{" "}
				</p>
			</CardFooter>
		</Card>
	);
};

export default SignIn;
