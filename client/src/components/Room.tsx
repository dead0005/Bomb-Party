import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { useGameStore } from "hooks/useStore"
import { useSocket } from "hooks/useSocket"
import { useRoom } from "hooks/useRoom"
import { useIdle } from "hooks/useIdle"
import { MessagesWrapper } from "components/Messages"
import { PrivateTooltip } from "components/PrivateTooltip"
import { Hr } from "components/Hr"
import { Game } from "components/Game"
import { EditName } from "components/EditName"
import { AvatarSettings } from "components/AvatarSettings"
import { AudioSettings } from "components/AudioSettings"
import { GameSettings } from "components/GameSettings"
import { GithubLink } from "components/GithubLink"
import { reset } from "functions/reset"

export function Room() {
  const { socket } = useSocket()
  const { roomId, room } = useRoom() as any
  const theme = useGameStore((state) => state.theme)
  const isPrivate = room.get("private")
  const isAdmin = useGameStore((state) => state.isAdmin)

  const resetClient = () => socket.emit("resetClient")

  useEffect(() => {
    socket.on("resetClient", reset)
    return () => {
      socket.off("resetClient", reset)
    }
  }, [socket])

  useIdle()

  return (
    <div className={clsx("min-h-screen bg-base-100 text-base-content", theme)}>
      {isAdmin && (
        <button
          type="button"
          onClick={resetClient}
          className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4 z-50 text-xl"
          title="Reset client"
        >
          ☠️
        </button>
      )}

      <div className="container mx-auto px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
          <main className="room-shell rounded-[2rem] border border-slate-300/50 bg-base-100 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-primary font-semibold mb-2">
                  live room
                </div>
                <div className="text-4xl font-black font-mono tracking-tight">{roomId}</div>
                {isPrivate && (
                  <div className="badge badge-secondary mt-3">Private room</div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/" className="btn btn-outline btn-sm">
                  Exit room
                </Link>
                <div className="rounded-2xl bg-slate-950/5 px-4 py-2 text-sm opacity-80">
                  {room.get("users")?.size ?? 0} players connected
                </div>
              </div>
            </div>

            <section className="mt-6 room-overview rounded-[1.75rem] border border-slate-300/30 bg-slate-950/5 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Game board</h2>
                  <p className="text-sm opacity-70">
                    Track the current blend, timer, and player turn in a more polished interface.
                  </p>
                </div>
                <div className="badge badge-outline">Ready to play</div>
              </div>
              <div className="mt-6">
                <Game />
              </div>
            </section>
          </main>

          <aside className="space-y-6">
            <section className="panel-card p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Player profile</h3>
              <AvatarSettings />
              <div className="mt-4">
                <EditName />
              </div>
            </section>

            <section className="panel-card p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Audio controls</h3>
              <AudioSettings />
            </section>

            <section className="panel-card p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Game configuration</h3>
              <GameSettings />
            </section>

            <section className="panel-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">Live chat</h3>
                  <p className="text-sm opacity-70">Talk strategy while the match is live.</p>
                </div>
                <PrivateTooltip />
              </div>
              <div className="mt-4">
                <MessagesWrapper />
              </div>
            </section>
          </aside>
        </div>
      </div>

      <GithubLink />
    </div>
  )
}
