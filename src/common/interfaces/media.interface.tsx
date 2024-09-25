export interface CardProps{
    jikanImageUrl: string;
    id: string;
    backdrop_path: string;
    overview: string;
    title: string;
    vote_average: number;
    imageUrl: string;
    typeMedia?: string | null;
  };


export interface HistoryResponse{
  id: string;
  userId: string;
  mediaId: string;
  imgMedia: string;
  mediaTitle: string;
  synopsis: string; 
  rating: number;
  typeMedia?: string | null;
}

export interface FavoritesResponse{
  id: string;
  userId: string;
  mediaId: string;
  backdrop_path: string;
  overview: string;
  title: string;
  vote_average: number;
  typeMedia?: string | null;
}

