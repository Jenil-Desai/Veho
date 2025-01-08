import axios from "axios";

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  alt: string | null;
  avg_color: string | null;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  liked: boolean;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PexelsResponse {
  url?: string;
  page: number;
  per_page: number;
  next_page: number;
  photos: Photo[];
  total_results: number;
}

export async function getImageUrl(placeName: string) {
  try {
    const response = await axios.get<PexelsResponse>(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query: placeName,
          per_page: "1",
        },
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY,
        },
      }
    );
    return response.data.photos[0].src.original;
  } catch (error) {
    console.log(error);
    return "";
  }
}
