import { getTrack } from "./getTrack";
import { musicEvent } from "../../src/data/music/musicEvent";
import type { MusicEvent } from "../../src/data/music/musicEvent";

/**
 *
 * @param trackId A spotify track id or a spotify track url
 * @returns
 */
export async function getMusicEventFromSpotify(
  trackId: string,
): Promise<MusicEvent | undefined> {
  const track = await getTrack(trackId);
  if (!track) {
    console.error(`Track with id ${trackId} not found`);
    return undefined;
  }

  const newEvent = {
    id: crypto.randomUUID(),
    spotifyId: track.id,
    title: track.name,
    artistName: track.artists[0].name,
    coverArt: track.album.images[0].url,
    description: { sv: "", en: "" },
    genre: "pop",
    preview: track.preview_url,
    year: new Date(track.album.release_date).getFullYear(),
  } as MusicEvent;

  try {
    const parsed = musicEvent.parse(newEvent);
    console.log(
      `${parsed.title} - ${parsed.artistName} [${parsed.year}] parsed successfully`,
    );
    return parsed;
  } catch (error) {
    console.error(track, "Error parsing track");
    return undefined;
  }
}
