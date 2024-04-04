import { addNewMusicEvent } from "./addNewMusicEvent";
import { getMusicEventFromSpotify } from "./spotify";
import { readLine } from "./utils/readLine";

async function main() {
  console.log("Welcome to the music event creator!");
  console.log("");

  try {
    console.log("Add new song");
    const trackId = await readLine("Spofity ID: ");
    if (!trackId) {
      console.log("No track ID provided. Exiting...");
      return;
    }

    const track = await getMusicEventFromSpotify(trackId);
    if (!track) {
      console.log("Track not found");
      return;
    }

    await addNewMusicEvent(track);
  } catch (err) {
    console.error("Error: ", err);
  }
}
main();
