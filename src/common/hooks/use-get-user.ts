import { useNavigate } from "@tanstack/react-router";
import { globalSelectors } from "@/store/slice";
import { useAppSelector } from "@/store/store";
import type { User } from "@/common/types/api";
import { paths } from "@/config/paths";

export const useGetUser = (): User => {
	const user = useAppSelector(globalSelectors.getUser);
	const navigate = useNavigate();

	if (!user) {
		navigate({
			to: paths.auth.signIn,
			search: {
				redirectPath: location.pathname,
			},
		});
	}

	// biome-ignore lint: at this moment user is not null
	return user!;
};