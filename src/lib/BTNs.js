import { IconButton } from "@chakra-ui/react";
import React, { useTransition } from "react";

export function TopBtn({ title, onClick, Icons }) {
	const [isPending, startTransition] = useTransition();

	return (
		<IconButton
			rounded={"full"}
			aria-label={title}
			variant="surface"
			colorPalette={"green"}
			_hover={{
				transition: "transform .2s ease-in-out",
				transform: "rotate(-10deg)",
			}}
			size={["sm", "md", "xl"]}
			p={"1"}
			onClick={() => {
				startTransition(() => {
					onClick();
				});
			}}
			loading={isPending}
		>
			{Icons}
		</IconButton>
	);
}
