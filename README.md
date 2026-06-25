# Bomb Party

Bomb Party is a real-time multiplayer word game built with modern web technologies. Players create rooms, join friends, and race to type valid words that match the current letter blend before the timer runs out.

## Features

- Real-time multiplayer rooms powered by Socket.io
- Quick room creation and join-by-code flow
- Private and public room support
- Responsive interface for desktop and mobile
- Sound controls, dark mode, and custom avatars
- Simple game settings and polished action feedback
- Easy local development with Bun and Vite

## Tech stack

- Bun runtime and package manager
- React 19 with TypeScript
- Vite frontend tooling
- Tailwind CSS + DaisyUI UI system
- Socket.io real-time communication
- Zustand state management
- Howler for audio playback
- Vitest for frontend tests

## Getting started

### Download the repository

```bash
git clone https://github.com/dead0005/Bomb-Party.git
cd Bomb-Party
```

### Install dependencies

```bash
bun install
```

### Run in development

```bash
bun run dev
```

This starts the backend server and frontend Vite dev server together.

### Build for production

```bash
bun run build
```

### Run frontend tests

```bash
bun run test:client
```

## Project structure

- `client/` � React frontend application
- `src/` � Bun backend server and shared runtime code
- `data/` � game dictionary and static assets
- `tests/` � test cases

## Deployment

The project can be deployed with Bun-compatible hosting platforms. If you use Fly or a similar service, point the service at the root application entry and expose port `8080`.

## Notes

This repository is a custom Bomb Party implementation with a fresh UI and room-based multiplayer gameplay. All external clone references have been removed so the project reflects your own brand.

## License

MIT


