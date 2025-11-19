import { createFileRoute } from "@tanstack/react-router";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { toast } from "sonner";

import { paths } from "@/config/paths";

export const Route = createFileRoute(`/_base${paths.home}`)({
	component: RouteComponent,
});

function RouteComponent() {
	toast.info("INFO");
	toast.success("SUCCESS", { description: "Some description" });

	toast.warning("WARNING");
	toast.error("ERROR");

	return <div>Main</div>;
}
