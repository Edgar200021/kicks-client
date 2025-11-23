import { useNavigate } from "@tanstack/react-router";
import { useHandleError } from "@/common/hooks/use-handler-error";
import { paths } from "@/config/paths";
import { useLogoutMutation } from "@/features/auth/api/auth-api";

export const useLogout = () => {
	const [lg, { isLoading, error }] = useLogoutMutation();
	const navigate = useNavigate();

	useHandleError(error);

	const logout = async () => {
		await lg(null).unwrap();
		navigate({ to: paths.home });
	};

	return { logout, isLoading };
};
