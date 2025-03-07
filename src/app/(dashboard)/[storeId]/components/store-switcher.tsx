"use client";

import { Check, ChevronsUpDown, Store } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/components/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/ui/components/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/ui/components/popover";
import { useModalStore } from "@/lib/stores/modal-store";

type Props = {
	stores: Array<{
		label: string;
		value: string;
	}>;
};

export const StoreSwitcher = ({ stores }: Props) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const onModalOpen = useModalStore((state) => state.onOpen);

	const selected = useMemo(
		() => stores.find((store) => store.value === params.storeId),
		[stores, params.storeId],
	);

	const onSelect = async (currentStoreId: string) => {
		router.push(`/${currentStoreId}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className="w-[250px] justify-between"
				>
					<div className="flex items-center justify-start gap-6 font-semibold">
						<Store size={15} /> {selected ? selected.label : "Create new store"}
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[250px] p-0">
				<Command>
					<CommandInput placeholder="Search store.." />

					<CommandList>
						<CommandEmpty>No store found.</CommandEmpty>

						<CommandGroup>
							{stores.map((store) => (
								<CommandItem
									key={store.value}
									value={store.label}
									onSelect={() => onSelect(store.value)}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											store.value === params.storeId
												? "opacity-100"
												: "opacity-0",
										)}
									/>

									<p
										className={cn(
											store.value === params.storeId
												? "font-bold"
												: "font-normal",
										)}
									>
										{store.label}
									</p>
								</CommandItem>
							))}
						</CommandGroup>

						<Button
							onClick={onModalOpen}
							className="rounded-none w-full bg-foreground text-white font-semibold"
						>
							Create new store
						</Button>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
