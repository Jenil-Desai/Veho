interface generatePromptProps {
  location: string;
  totalDays: number;
  totalNights: number;
  travelers: string;
  budget: string;
}

export function generatePrompt({ location, totalDays, totalNights, travelers, budget }: generatePromptProps): string {
  return `{
  "description": "Generate a detailed travel plan for a given location based on user input. Ensure the following guidelines are strictly followed:",
  
  "instructions": {
    "location": “${location}”,
    "duration": “${totalDays} Days and ${totalNights} Night",
    "group_size": "${travelers}",
    "budget": "${budget}",
    "elements": [
      "Flight details",
      "Flight Price with Booking URL",
      "Hotel options list (with name, address, price, image URL, geo coordinates, rating, description)",
      "Places to visit nearby (place name, details, image URL, geo coordinates, ticket pricing, travel time)",
      "Day-wise itinerary (for each day, detailed plan with best time to visit)"
    ]
  },

  "output_format": {
    "trip_name": "{Location Name} Exploration",
    "destination": "{Location Name}, {Region}, {State}, {Country}",
    "duration": "{X} Days, {Y} Nights",
    "group_size": "{2-6 People}",
    "budget": "{Balanced Journey}",
    "best_time_to_visit": "{Best Season (for example: October to March)}",
    "flights": [
      {
        "note": "Flight details are approximate and may vary. Please check with actual booking websites for updated information.",
        "origin": "{Your Origin City}",
        "destination": "{Arrival Airport}",
        "approx_price": "{Approx. Price (in INR)}",
        "booking_url": "{URL for Booking (e.g., MakeMyTrip, Cleartrip, etc.)}"
      }
    ],
    "transportation": {
      "from_airport": "{Mode of transport from arrival airport to destination (e.g., Taxi, Pre-booked cab, etc.)}",
      "local": "{Local transport options (e.g., Taxi, Auto-rickshaw)}"
    },
    "hotels": [
      {
        "hotel_name": "{Hotel Name}",
        "address": "{Hotel Address}",
        "price": "{Price per night (in INR)}",
        "note": "Prices are approximate and may vary depending on the season and availability.",
        "image_url": "{Hotel Image URL}",
        "geo_coordinates": {
          "latitude": "{Latitude}",
          "longitude": "{Longitude}"
        },
        "rating": "{Rating (e.g., 4.5)}",
        "description": "{Short Description of the hotel}"
      }
    ],
    "day_plan": [
      {
        "day": 1,
        "activities": [
          {
            "time": "{Start Time} - {End Time}",
            "place_name": "{Place Name}",
            "details": "{Description of the place}",
            "image_url": "{Place Image URL}",
            "geo_coordinates": {
              "latitude": "{Latitude}",
              "longitude": "{Longitude}"
            },
            "ticket_pricing": {
              "approx_adult": "{Ticket Price for Adults (in INR)}",
              "approx_child": "{Ticket Price for Children (in INR)}"
            },
            "travel_time": "{Travel time from last location (in hours/minutes)}",
            "note": "Ticket prices may vary. Please check the official website for updated information."
          },
          {
            "time": "{Start Time} - {End Time}",
            "place_name": "{Place Name}",
            "details": "{Description of the place}",
            "image_url": "{Place Image URL}",
            "geo_coordinates": {
              "latitude": "{Latitude}",
              "longitude": "{Longitude}"
            },
            "ticket_pricing": "{}",
            "travel_time": "{Travel time (in minutes)}",
            "note": "Ticket prices may vary. Please check on-site for updated information."
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "{Start Time} - {End Time}",
            "place_name": "{Place Name}",
            "details": "{Description of the place}",
            "image_url": "{Place Image URL}",
            "geo_coordinates": {
              "latitude": "{Latitude}",
              "longitude": "{Longitude}"
            },
            "ticket_pricing": {
              "approx_adult": "{Ticket Price for Adults (in INR)}"
            },
            "travel_time": "{Travel time from last location (in hours/minutes)}",
            "note": "Ticket prices may vary. Please check the official website for updated information."
          },
          {
            "time": "{Start Time} - {End Time}",
            "place_name": "Departure from {Departure Airport}",
            "details": "Return journey to your origin city."
          }
        ]
      }
    ]
  },

  "validation": {
    "urls": {
      "image_urls": "Ensure all URLs for images are valid and working.",
      "booking_urls": "Ensure the booking URLs are correct and lead to the exact mentioned booking platform.",
      "place_urls": "Ensure all URLs for places (e.g., official websites or tourism links) are valid and working."
    },
    "price": "Ensure all prices are real, based on current data, and give accurate details. Avoid using approximations unless required.",
    "geocoordinates": "Provide exact geo-coordinates (latitude, longitude) for all locations.",
    "dynamic_replacement": "Ensure placeholders like {2-6 people}, {Your Origin City}, {Hotel Name}, etc., are correctly replaced based on the user’s input."
  }
}
`;
}
