import { Home, SearchX } from "lucide-react";
import { useState } from "react";
import { Button } from "@/common/components/ui/button/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/common/components/ui/card";
import { AppLink } from "@/common/components/ui/link/link";

export const BaseNotFound = () => {
	const [q, setQ] = useState("");

	function onSearchSubmit(e: React.FormEvent) {
		e.preventDefault();
		const query = q.trim();
		if (!query) return;
		// Перенаправляем на страницу поиска — подстрой под свой роут
		window.location.href = `/search?q=${encodeURIComponent(query)}`;
	}

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-6">
			<Card className="w-full max-w-2xl rounded-2xl shadow-lg">
				<CardContent className="flex flex-col items-center gap-8 p-8">
					{/* Top section */}
					<div className="flex flex-col items-center text-center gap-4">
						<SearchX className="w-12 h-12" />

						<CardTitle className="text-3xl md:text-4xl">
							Page not found
						</CardTitle>

						<CardDescription className="max-w-lg text-muted-foreground">
							The page you’re looking for doesn’t exist or has been moved. Try
							reloading, use the search below, or return to the homepage.
						</CardDescription>
					</div>

					{/* Buttons */}
					<div className="flex gap-3">
						<AppLink to="/">
							<Button variant="outline" className="flex items-center gap-2">
								<Home className="w-4 h-4" />
								Go home
							</Button>
						</AppLink>

						<Button asChild>
							<a
								href="mailto:support@example.com"
								className="flex items-center gap-2"
							>
								Report issue
							</a>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
