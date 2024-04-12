type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: Urls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Reason;
  type: string;
  uri: string;
  artists: Artist[];
};

type Artist = {
  external_urls: Urls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Urls = {
  spotify: string;
};

type Image = {
  url: string;
  height: number;
  width: number;
};

type Follower = {
  href: string;
  total: number;
};

type Reason = {
  reason: string;
};

type ExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: Urls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: any;
  restrictions: Reason;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};
