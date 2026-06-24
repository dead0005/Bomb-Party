import { useSocket } from "hooks/useSocket"
import { useRoom } from "hooks/useRoom"
import type { Group, User } from "types/index"
import clsx from "clsx"

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("")

export function HeartLetters() {
  const { userId } = useSocket()
  const { room } = useRoom()

  const running = room.get("running")
  const groups = room.get("groups") as Map<string, Group>
  const users = room.get("users") as Map<string, User>

  const user = users.get(userId || "")
  const groupId = user?.group
  const group = groups.get(groupId || "")
  const userLetters = group?.letters as Set<string> | undefined
  const userBonusLetters = group?.bonusLetters as Set<string> | undefined

  if (!running) {
    return null
  }

  return (
    <div className="alphabet-grid rounded-[2rem] border border-slate-300/50 bg-white/80 backdrop-blur-sm p-4 shadow-md w-full max-w-lg mx-auto">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-700 font-bold mb-3 text-center">
        Use these letters for a bonus ❤️
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {ALPHABET.map((letter) => (
          <div
            key={letter}
            className={clsx(
              "w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-all transform",
              userBonusLetters?.has(letter)
                ? "bg-yellow-400 text-yellow-900 shadow-lg scale-110 border-2 border-yellow-500"
                : userLetters?.has(letter)
                  ? "bg-slate-600 text-white border-2 border-slate-600 opacity-100"
                  : "bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-60",
            )}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  )
}
