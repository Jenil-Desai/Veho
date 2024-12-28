import axios from "axios";

interface getImageUrlProps {
  placeName: string;
}

export async function getImageUrl({ placeName }: getImageUrlProps) {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      placeName
    )}&client_id=${
      process.env.EXPO_PUBLIC_UNSPLASH_API_KEY
    }&orientation=landscape`;

    const response = await axios.get(url);
    return response.data.urls.raw;
  } catch (error) {
    console.log("Error fetching image from Unsplash:", error);
    return null;
  }
}
