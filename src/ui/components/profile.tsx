import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/avatar";
import type { AvatarImageProps } from "@radix-ui/react-avatar";

type Props = {
	fallback: string;
	href: string;
} & AvatarImageProps;

const Profile = ({ fallback, href, ...rest }: Props) => {
	return (
		<Link href={href}>
			<Avatar className="cursor-pointer">
				<AvatarImage {...rest} />
				<AvatarFallback className="bg-primary text-white font-semibold">
					{fallback[0].toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</Link>
	);
};

export default Profile;
