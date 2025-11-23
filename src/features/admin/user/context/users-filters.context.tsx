import {
	createContext,
	type ReactNode,
	use,
	useCallback,
	useState,
} from "react";
import type { Nullable } from "@/common/types/common";
import type { GetAllUsersInput } from "@/features/admin/user/schemas/get-all-users.schema";

const UsersFiltersContext =
	createContext<
		Nullable<{
			filters: GetAllUsersInput;
			setFilters: <K extends keyof GetAllUsersInput>(
				key: K,
				data: GetAllUsersInput[K],
			) => void;
		}>
	>(null);

export const UsersFiltersProvider = ({ children }: { children: ReactNode }) => {
	const [filters, setFilters] = useState<GetAllUsersInput>({ page: 1 });

	const handleSetFilter = useCallback(
		<K extends keyof GetAllUsersInput>(key: K, value: GetAllUsersInput[K]) => {
			setFilters((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	return (
		<UsersFiltersContext
			value={{
				filters,
				setFilters: handleSetFilter,
			}}
		>
			{children}
		</UsersFiltersContext>
	);
};

export const useUsersFilters = () => {
	const ctx = use(UsersFiltersContext);
	if (!ctx) {
		throw new Error("useUsersFilters must be used within UsersFiltersProvider");
	}

	return ctx;
};
