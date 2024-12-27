interface generatePromptProps {
  location: string;
  totalDays: number;
  totalNights: number;
  travelers: string;
  budget: string;
}

export function generatePrompt({ location, totalDays, totalNights, travelers, budget }: generatePromptProps): string {
  return `Generate Travel Plan for Location: ${location}, for ${totalDays} Days and ${totalNights} Night for ${travelers} with a ${budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 1 days and 1 night with each day plan with best time to visit in JSON. Ensure that all URLs (images, bookings, places) are valid and working.`;
}
