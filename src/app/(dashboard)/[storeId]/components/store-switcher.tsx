"use client";

import { Check, ChevronsUpDown, Store } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

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

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(() =>
		stores.find((store) => store.value === params.storeId),
	);
	const onModalOpen = useModalStore((state) => state.onOpen);

	const onSelect = async () => {
		//TODO: add logic to switch store
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
									value={store.value}
									onSelect={onSelect}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selected ? "opacity-100" : "opacity-0",
										)}
									/>

									<p className={cn(selected ? "font-bold" : "font-normal")}>
										{store.label}
									</p>
								</CommandItem>
							))}
						</CommandGroup>

						<Button
							onClick={onModalOpen}
							className="rounded-none w-full bg-green-600 text-white font-semibold"
						>
							Create new store
						</Button>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
