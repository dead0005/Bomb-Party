import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRoomId } from "functions/session";
import { LayoutWithHeader } from "components/Layout";
import { Rooms } from "components/Rooms";

export const Home = () => {
	const navigate = useNavigate();
	const [isPrivate, setIsPrivate] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const room = (formData.get("room") as string).toUpperCase();
		navigate(room);
	};

	const togglePrivate = () => setIsPrivate((current) => !current);

	return (
		<LayoutWithHeader className="pb-16">
			<div className="mx-auto max-w-6xl space-y-12 px-4 md:px-0">
				<section className="hero-card overflow-hidden rounded-[2.5rem] border border-slate-600/40 bg-slate-950/90 p-10 text-white shadow-[0_40px_100px_-90px_rgba(15,23,42,0.85)]">
					<div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] items-center">
						<div className="space-y-6">
							<p className="text-sm uppercase tracking-[0.4em] text-cyan-300/90 font-semibold">
								Bomb Party
							</p>
							<h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
								A fresh multiplayer word game for your next party.
							</h1>
							<p className="max-w-2xl text-base opacity-75">
								Create quick rooms, invite friends, and challenge each other to type the best matching word before the timer explodes.
							</p>
							<div className="grid gap-4 sm:grid-cols-2">
								<Link
									to={getRoomId()}
									state={{ isPrivate }}
									className="btn btn-primary btn-lg w-full"
								>
									Create room
								</Link>
								<button
									type="button"
									onClick={togglePrivate}
									className="btn btn-ghost btn-outline w-full"
								>
									{isPrivate ? "Private room on" : "Enable private room"}
								</button>
							</div>
						</div>

						<div className="rounded-[2rem] border border-cyan-400/10 bg-cyan-400/5 p-6 text-slate-100 shadow-xl">
							<p className="text-sm uppercase tracking-[0.35em] text-cyan-200 font-semibold mb-3">
								Game highlights
							</p>
							<ul className="space-y-3 text-sm opacity-80">
								<li>• Fast room creation for instant gameplay.</li>
								<li>• Private mode for friends-only parties.</li>
								<li>• Responsive layout with voice-like visuals.</li>
								<li>• Live chat, avatars, and sound controls.</li>
							</ul>
						</div>
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-[2fr_1fr] items-center rounded-[2rem] border border-slate-600/30 bg-base-100/95 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
					<div>
						<p className="text-sm uppercase tracking-[0.35em] text-primary font-semibold mb-2">
							Have a room code?
						</p>
						<h2 className="text-3xl font-semibold mb-3">Enter it here and join instantly</h2>
						<p className="text-sm opacity-70 max-w-xl">
							Paste the 4-letter code from a friend to enter the game in seconds.
						</p>
					</div>
					<form onSubmit={onSubmit} className="space-y-4">
						<label className="label" htmlFor="existing-room">
							<span className="label-text">Room code</span>
						</label>
						<input
							id="existing-room"
							name="room"
							autoComplete="off"
							placeholder="ABCD"
							className="input input-bordered w-full uppercase"
							maxLength={4}
						/>
						<button type="submit" className="btn btn-outline w-full">
							Join room
						</button>
					</form>
				</section>

				<section className="grid gap-6 lg:grid-cols-3">
					<div className="feature-card rounded-[2rem] p-6">
						<h2 className="text-xl font-bold mb-3">Designed for parties</h2>
						<p className="text-sm opacity-70">
							Simple controls, a clean game flow, and a focused live room experience make every match easy to join.
						</p>
					</div>
					<div className="feature-card rounded-[2rem] p-6">
						<h2 className="text-xl font-bold mb-3">Smart room join</h2>
						<p className="text-sm opacity-70">
							Enter a code or share a room link so your friends can join instantly from any device.
						</p>
					</div>
					<div className="feature-card rounded-[2rem] p-6">
						<h2 className="text-xl font-bold mb-3">Unique gameplay</h2>
						<p className="text-sm opacity-70">
							Build your own word combos, manage the timer, and fight for the win with a fresh UI and feel.
						</p>
					</div>
				</section>

				<section className="rounded-[2rem] border border-slate-600/30 bg-base-100/90 p-8 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]">
					<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="text-sm uppercase tracking-[0.35em] text-primary font-semibold">Join a room</p>
							<h2 className="text-3xl font-semibold">Public rooms are waiting</h2>
							<p className="mt-2 text-sm opacity-70 max-w-2xl">
								Browse active rooms below and jump into a game without hassle.
							</p>
						</div>
						<div className="rounded-3xl border border-base-300 bg-base-200 p-4 text-sm opacity-80">
							Pro tip: Share your room code with friends or invite them to the same link.
						</div>
					</div>

					<div className="mt-8">
						<Rooms />
					</div>
				</section>
			</div>
		</LayoutWithHeader>
	);
};
