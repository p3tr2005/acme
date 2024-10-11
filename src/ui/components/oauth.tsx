import { ChromeIcon } from "lucide-react";
import ButtonFallback from "./button-fallback";

const OAuth = () => {
	return (
		<main className="flex flex-col-reverse w-full gap-3 space-y-3">
			<ButtonFallback
				className="bg-background text-black border border-zinc-400"
				variant="default"
				size="lg"
				icon={<ChromeIcon size={25} />}
			>
				<p className="font-semibold flex-1">Continue With Google</p>
			</ButtonFallback>

			<div className="w-full flex items-center justify-center gap-2">
				<hr className="w-full border border-zinc-300" />
				<p className="font-bold">OR</p>
				<hr className="w-full border border-zinc-300" />
			</div>
		</main>
	);
};

export default OAuth;
