import { getToken } from "./getToken";
import type { Track } from "./models";
import axios from "axios";

export async function getTrack(trackId: string): Promise<Track> {
  if (trackId.indexOf("https://open.spotify.com/track/") == 0) {
    const trackIdRegex = /^https:\/\/open\.spotify\.com\/track\/(\w+)/;
    const match = trackId.match(trackIdRegex);
    trackId = match ? match[1] : trackId;
  }

  const token = await getToken();
  const url = `https://api.spotify.com/v1/tracks/${trackId}`;
  const options = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const response = await axios.get<Track>(url, options);
    if (response.status !== 200) {
      throw new Error(`Error getting track: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    let message =
      error && typeof error === "object" && "message" in error
        ? error.message
        : undefined;

    throw new Error(
      `Error getting track - ${message ?? "Unknown error"}`.trim(),
    );
  }
}
