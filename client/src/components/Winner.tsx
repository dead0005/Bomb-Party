import React from "react";
import confetti from "canvas-confetti";
import { useRoom } from "hooks/useRoom";
import { Highlight } from "components/Highlight";
import { Avatar } from "components/Avatar";
import type { Group, User } from "types/index";
import clsx from "clsx";

interface WinnerProps {
	winner: Group;
}

export function Winner({ winner }: WinnerProps) {
	const { room } = useRoom();
	const users = room.get("users") as Map<string, User>;
	const round = room.get("round");
	const hardMode = room.get("hardMode");
	const roomLetterBlendWord = room.get("letterBlendWord");
	const roomLetterBlend = room.get("letterBlend");

	const ref = React.useRef<HTMLElement | null>(null);
	const refCallback = React.useCallback((node: HTMLElement | null) => {
		if (ref.current) {
			confetti.reset();
		}
		if (node) {
			const rect = node.getBoundingClientRect();
			confetti({
				disableForReducedMotion: true,
				origin: {
					x: (rect.left + rect.width / 2) / window.innerWidth,
					y: (rect.top + rect.height / 2) / window.innerHeight,
				},
				particleCount: 50,
				startVelocity: 30,
				spread: 270,
			});
		}
		ref.current = node;
	}, []);

	return (
		<div className="winner-card mt-12 animate-bounce-in text-center rounded-[2.5rem] border border-slate-400/30 bg-gradient-to-br from-yellow-50 to-orange-50 p-12 shadow-xl">
			<div className="flex flex-col items-center justify-center gap-6 mb-10">
				<h3
					ref={refCallback}
					className="text-5xl font-black flex items-center gap-4 text-slate-900"
				>
					🎉 {`Winner${winner.members.size === 1 ? "" : "s"}`}
					<span
						className={clsx(
							"badge badge-lg text-lg font-black",
							hardMode ? "badge-error" : "badge-success",
						)}
					>
						Round {round}
					</span>
				</h3>
			</div>

			<div className="flex flex-wrap justify-center items-end gap-10 mb-12">
				{[...winner.members].map((userId) => {
					const user = users.get(userId);
					if (!user) return null;
					return (
						<div key={user.id} className="flex flex-col items-center gap-4">
							<div className="w-36 h-36 rounded-full border-4 border-yellow-400 bg-white p-2 shadow-lg animate-pulse-slow">
								<Avatar id={user.avatar} />
							</div>
							<div
								className={clsx(
									"font-black tracking-tight text-slate-900",
									winner.members.size === 1 ? "text-3xl" : "text-xl",
								)}
								data-testid="winner-name"
							>
								{user.name}
							</div>
						</div>
					);
				})}
			</div>

			{roomLetterBlendWord && (
				<div className="bg-slate-800/95 text-white p-6 rounded-2xl inline-block border border-slate-600 shadow-lg">
					<span className="opacity-70 text-xs block mb-2 uppercase tracking-widest font-bold">
						Final word played
					</span>
					<span className="text-4xl font-black" data-testid="last-word">
						<Highlight
							searchWords={[roomLetterBlend?.toUpperCase()]}
							textToHighlight={roomLetterBlendWord?.toUpperCase()}
							highlightClassName="text-yellow-300 font-black"
						/>
					</span>
				</div>
			)}
		</div>
	);
}
