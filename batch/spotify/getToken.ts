import axios from "axios";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getToken(): Promise<TokenResponse> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify client ID or client secret");
  }

  const apiUrl = "https://accounts.spotify.com/api/token";
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", clientId);
  data.append("client_secret", clientSecret);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(apiUrl, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
