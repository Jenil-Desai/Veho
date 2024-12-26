export interface ContextItem {
  id: string;
  mapbox_id: string;
  text: string;
  wikidata: string;
  short_code?: string; // Optional, as not all context items have this property
}

export interface Geometry {
  coordinates: [number, number]; // Array of two numbers (longitude, latitude)
  type: string; // e.g., "Point"
}

export interface Properties {
  mapbox_id: string;
  wikidata: string;
}

export interface Feature {
  id: string;
  place_name: string;
  place_type: string[]; // Array of strings
  properties: Properties;
  relevance: number;
  text: string;
  type: string; // e.g., "Feature"
}

export interface LocationData {
  bbox: [number, number, number, number]; // Array of four numbers (bounding box)
  center: [number, number]; // Array of two numbers (center coordinates)
  context: ContextItem[]; // Array of context items
  geometry: Geometry; // Geometry object
  id: string; // Unique identifier for the place
  place_name: string; // Full place name
  place_type: string[]; // Array of place types
  properties: Properties; // Properties object
  relevance: number; // Relevance score
  text: string; // Text representation of the place
  type: string; // e.g., "Feature"
}
