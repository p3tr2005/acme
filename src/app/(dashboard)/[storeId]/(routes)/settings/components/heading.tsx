type Props = {
	title: string;
	description: string;
};

const Heading = ({ title, description }: Props) => {
	return (
		<div className="flex flex-col space-y-4">
			<h1 className="font-bold text-4xl">{title}</h1>

			<p className="text-sm text-zinc-600">{description}</p>
		</div>
	);
};

export default Heading;
