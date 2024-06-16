interface UtilityIconMappingItem {
  label: string;
  icon: string;
}

type UtilityIconMapping = Record<string, UtilityIconMappingItem>;

export const utilityIconMapping: UtilityIconMapping = {
  SMARTTV: { label: "Smart TV", icon: "tv" },
  WIFI: { label: "WiFi", icon: "wifi" },
  PETFRIENDLY: { label: "Pet Friendly", icon: "pets" },
  AIRCONDITIONED: { label: "Air Conditioned", icon: "ac-unit" },
  DISHWASHER: { label: "Dishwasher", icon: "local-laundry-service" },
  MICROWAVE: { label: "Microwave", icon: "microwave" },
  SPORTS: { label: "Sports", icon: "sports-soccer" },
  GAMING: { label: "Gaming", icon: "sports-esports" },
  READING: { label: "Reading", icon: "book" },
  COOKING: { label: "Cooking", icon: "outdoor-grill" },
  GOINGOUT: { label: "Going Out", icon: "nightlife" },
  MUSIC: { label: "Music", icon: "piano" },
  PAINTING: { label: "Paiting", icon: "palette" },
  TELEVISION: { label: "Movies / TV Shows", icon: "movie" },
};
