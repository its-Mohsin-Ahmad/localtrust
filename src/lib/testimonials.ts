/**
 * Customer review data shared between the homepage testimonial carousel and
 * the `/reviews` page, so both always show the same verified feedback.
 */

export interface Testimonial {
  id: string;
  name: string;
  category: string;
  avatar: string;
  rating: number;
  quote: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ayesha S.",
    category: "Home Cleaning",
    avatar: "/images/assets/testimonial-ayesha.jpg",
    rating: 5,
    quote: "Excellent service! The cleaner was punctual, professional and did a great job.",
    date: "Apr 12, 2025",
  },
  {
    id: "2",
    name: "Bilal Ahmed",
    category: "Plumbing",
    avatar: "/images/assets/testimonial-bilal.jpg",
    rating: 5,
    quote: "Quick response and fixed the issue in no time. Highly recommended!",
    date: "Apr 8, 2025",
  },
  {
    id: "3",
    name: "Fatima Khan",
    category: "Tutoring",
    avatar: "/images/assets/testimonial-fatima.jpg",
    rating: 5,
    quote: "Great tutor, very patient and helpful. My child's grades improved a lot.",
    date: "Mar 26, 2025",
  },
  {
    id: "4",
    name: "Zubair Tariq",
    category: "Electrical",
    avatar: "/images/assets/testimonial-bilal.jpg",
    rating: 5,
    quote: "Installed a 3-phase connection seamlessly and gave clear safety guidance.",
    date: "Mar 18, 2025",
  },
  {
    id: "5",
    name: "Mariam Sohail",
    category: "Painting",
    avatar: "/images/assets/testimonial-ayesha.jpg",
    rating: 5,
    quote: "Neat finishing, no mess left behind, and finished within the promised timeline.",
    date: "Mar 10, 2025",
  },
];