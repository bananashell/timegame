# Welcome to the timeline

This is a simple yet fun game trying to place historic events in correct order

## Rules

The main goal is to place your current historic event in the correct order relative to the other you have by guessing what year the given event happened.
Nailing or being close gives you bonus points.

The game ends when your guess isn't chronologically correct.

### Example

You have one historic event previously, 1950,
and you have to guess what year the moon-landing occured.

If you guess _before_ 1950 the game would end.
If you guess _after_ 1950 you would be awarded atleast one point, if you guess close to, or spot on, you get bonus points and the game continues. Now you have **2** events to factor in, 1950 and 1969.

### Prerequisites

- Install bun
- Install firebase-tools https://firebase.google.com/docs/cli
  - Setup database emulator (running on port :8080)
- Install dependencies `bun install``

### Dev

- `bun dev`
- `firebase emulators:start`
