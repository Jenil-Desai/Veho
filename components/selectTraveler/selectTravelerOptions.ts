import { TravelerOption } from "@/types/types";

const travelerOptions: TravelerOption[] = [
  {
    id: "solo_traveler",
    title: "Solo Explorer",
    description:
      "Perfect for independent adventurers seeking personal discoveries",
    icon: "🧑🏻",
    people: "1 People",
  },
  {
    id: "couple_travelers",
    title: "Travel Duo",
    description: "Ideal for couples or pairs embarking on shared adventures",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: "family_travelers",
    title: "Family Journey",
    description: "For families creating memories together",
    icon: "🏡",
    people: "2-6 People",
  },
  {
    id: "friend_group",
    title: "Group Adventure",
    description: "Perfect for friend groups exploring together",
    icon: "⛵️",
    people: "3-8 People",
  },
];

export default travelerOptions;
