export interface AnimeApiResponse {
  broadcast: {
    day: string;
    time: string;
    timezone: string;
  };
  licensors: {
    name: string;
  }[];
  trailer: {
    youtube_id: string;
  };
}
