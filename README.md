# OpenAI SDK Learning Sandbox

This repository is a small Node.js project for learning the OpenAI SDK through simple, focused examples.

## Project Structure

```text
get-started/
├── package.json
├── pnpm-lock.yaml
├── README.md
├── PROJECT_OVERVIEW.md
└── src/
    ├── 01-basic.js
    ├── 02-basic-chat.js
    ├── 03-memory.js
    ├── 04-stream.js
    ├── 05-chat-bot.js
    └── ai/
        └── ai.js
```

## What Is In The Project

- `src/01-basic.js`: minimal OpenAI API example
- `src/02-basic-chat.js`: basic chat-style example
- `src/03-memory.js`: conversation memory example
- `src/04-stream.js`: streaming example
- `src/05-chat-bot.js`: interactive terminal chatbot
- `src/ai/ai.js`: shared OpenAI helper used by the examples

## Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file with your API key:

```bash
OPENAI_API_KEY=your_key_here
```

## Run The Examples

Run any script directly with Node:

```bash
node src/01-basic.js
node src/02-basic-chat.js
node src/03-memory.js
node src/04-stream.js
node src/05-chat-bot.js
```

## Package Scripts

The project defines these scripts in `package.json`:

```bash
pnpm start
pnpm run list
```

The current file tree only includes the standalone scripts under `src/`, so running those directly with Node is the most reliable way to use the repo as it stands.

## Notes

- The codebase uses ES modules.
- Dependencies are `openai` and `dotenv`.
- The project is intentionally small so each file stays focused on one concept.

## Extending The Project

To add another example:

1. Create a new file in `src/`.
2. Keep the example focused on one concept.
3. Reuse `src/ai/ai.js` if the script needs the shared OpenAI helper.
