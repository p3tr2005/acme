import { auth, signOut } from "@/auth";
import ButtonFallback from "@/ui/components/button-fallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/card";
import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";

const App = async () => {
  const session = await auth()

  if (!session) redirect("/auth/sign-in")

  return <Card className="w-[450px] mx-auto mt-32 p-3 rounded-md">
    <CardHeader className="flex-row justify-between items-center">
      <CardTitle>Dashboard</CardTitle>
      <CardDescription>
        <form action={async () => {
          "use server";
          await signOut()
        }}>
          <ButtonFallback variant="outline" className="text-zinc-800">
            <LogOutIcon size={20} />
          </ButtonFallback>
        </form>
      </CardDescription>
    </CardHeader>

    <CardContent>
      {JSON.stringify(session, null, 2)}
    </CardContent>
  </Card>;
};

export default App;
