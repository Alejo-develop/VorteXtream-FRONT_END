export interface Streamer {
  id: string;
  game_name: string;
  title: string;
  type?: string;
  user_name?: string;
  viewer_count: number;
  profile_image_url?: string;
  thumbnail_url: string;
}

export interface CategorysStreams {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
}
