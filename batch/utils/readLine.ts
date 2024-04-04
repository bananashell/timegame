export async function readLine(prompt: string): Promise<string | undefined> {
  process.stdout.write(prompt);
  for await (const line of console) {
    if (line === "exit") {
      break;
    }

    return line.trim();
  }

  return undefined;
}
