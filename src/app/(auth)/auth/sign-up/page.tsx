"use client";

import { type SignUpPayload, signUpSchema } from "@/lib/validations/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/card";
import OAuth from "@/ui/components/oauth";
import { ShirtIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { signUpAction } from "@/app/_actions/sign-up-action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const form = useForm<SignUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter()

  const onSubmit = async (values: SignUpPayload) => {
    const err = await signUpAction(values);

    if (!err) {
      toast.success("Sign up successful");

      router.push('/auth/sign-in')
      return
    }

    toast.error(err.error);
    return;
  };
  return (
    <Card className="w-[450px] mt-32 mx-auto rounded-md p-3">
      <CardHeader className="flex-col items-center gap-4">
        <ShirtIcon size={30} />
        <CardTitle className="text-4xl font-bold">Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              sign up
            </ButtonFallback>
          </form>
        </Form>
        <OAuth />
      </CardContent>

      <CardFooter className="text-sm font-semibold text-zinc-500">
        <p>
          Already have an account?{" "}
          <Link
            className="text-green-600 font-bold hover:underline"
            href="/auth/sign-in"
          >
            sign in
          </Link>{" "}
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
