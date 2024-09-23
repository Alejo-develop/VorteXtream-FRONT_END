export interface CardProps{
    jikanImageUrl: string;
    id: string;
    backdrop_path: string;
    overview: string;
    title: string;
    vote_average: number;
    imageUrl: string
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

