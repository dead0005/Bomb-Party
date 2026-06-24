import React from "react";
import clsx from "clsx";
import { useGameStore } from "hooks/useStore";

interface RulesProps {
	className?: string;
}

export const Rules = ({ className }: RulesProps) => {
	const setIsAdmin = useGameStore((state) => state.setIsAdmin);
	const toggleAdmin = () => setIsAdmin();
	const theme = useGameStore((store) => store.theme);

	return (
		<div
			className={clsx(
				"rounded-3xl border border-base-300 bg-base-200 p-6 shadow-lg mx-auto max-w-[32rem] mb-6",
				theme === "light" ? "text-base-content" : "text-base-100",
				className,
			)}
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h5 className="font-bold text-xl">How to play</h5>
						<p className="text-sm opacity-70">
							Use the current letter blend to form a valid word before time runs out.
						</p>
					</div>
					<button
						type="button"
						onClick={toggleAdmin}
						className="btn btn-xs btn-outline"
					>
						Admin
					</button>
				</div>

				<ul className="space-y-3 text-sm opacity-90 list-disc pl-5">
					<li>Type a word with 3+ letters containing the blend in order.</li>
					<li>Failing to answer before the bomb pops costs a heart.</li>
					<li>The last player standing wins the match.</li>
					<li>Long words can earn bonus letters and extra points.</li>
				</ul>
			</div>
		</div>
	);
};
