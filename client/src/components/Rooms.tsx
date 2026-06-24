import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deserialize } from "functions/deserialize";
import { useGameStore } from "hooks/useStore";
import { useSocket } from "hooks/useSocket";

interface RoomData {
	isPrivate: boolean;
	players: { size: number }; // Simplified view of players for list
	// Add other properties if needed based on what backend sends
}

export const Rooms = () => {
	const { socket } = useSocket();
	const [rooms, setRooms] = useState<Map<string, RoomData>>(new Map());
	const userId = useGameStore((state) => state.userId);

	useEffect(() => {
		const getRooms = (val: string) => setRooms(new Map(deserialize(val)));

		socket.emit("leaveRoom", userId);
		socket.emit("getRooms");
		socket.on("getRooms", getRooms);
		return () => {
			socket.off("getRooms", getRooms);
		};
	}, [socket, userId]);

	const gameRooms = useMemo(() => [...rooms].filter(([, data]) => !data.isPrivate), [rooms]);

	return (
		<div className="w-full">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{gameRooms.map(([room, data]) => (
					<Link
						key={room}
						to={room}
						className="room-card group block rounded-[1.75rem] border border-slate-300/20 bg-base-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
					>
						<div className="flex items-center justify-between gap-4">
							<span className="text-lg font-semibold">{room}</span>
							<span className="badge badge-outline">{data.players.size} players</span>
						</div>
						<p className="mt-3 text-sm opacity-70">Public room open for new players.</p>
					</Link>
				))}
				{gameRooms.length === 0 && (
					<p className="text-sm opacity-50 italic">No active public rooms</p>
				)}
			</div>
		</div>
	);
};
