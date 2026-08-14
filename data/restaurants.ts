export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "GOLDEN PUNPKIN",
    image: "/restaurants/restaurant1.jpg",
    rating: 4.9,
    reviews: 320,
    deliveryTime: "20-30 min",
  },
  {
    id: 2,
    name: "MALIS",
    image: "/restaurants/restaurant2.jpg",
    rating: 4.8,
    reviews: 280,
    deliveryTime: "25-35 min",
  },
  {
    id: 3,
    name: "Royal BBQ",
    image: "/restaurants/restaurant3.jpg",
    rating: 4.7,
    reviews: 180,
    deliveryTime: "15-25 min",
  },
];