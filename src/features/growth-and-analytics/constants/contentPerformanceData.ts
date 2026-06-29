import { Bookmark, Eye, Heart, MessageCircle } from "lucide-react";

import type { StatCardItem } from "@/shared/types/statsCards";

import type {
  CategoryDatum,
  ContentPostRow,
  LabeledValue,
} from "../types/types";

export const contentAccountOptions = [
  { value: "armario", label: "Armario Pro (Instagram)" },
  { value: "bloom", label: "Bloom Theory Cafe (Instagram)" },
  { value: "otc", label: "OTC Kompally (Facebook)" },
  { value: "sorshe", label: "Sorshe (Instagram)" },
];

export const contentStatCards: StatCardItem[] = [
  {
    id: "reach",
    label: "Reach",
    value: "412K",
    description: "Last 30 days",
    delta: "+8.1%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: Eye,
  },
  {
    id: "likes",
    label: "Total Likes",
    value: "38.2K",
    description: "Across 24 posts",
    delta: "+5.4%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: Heart,
  },
  {
    id: "comments",
    label: "Comments",
    value: "4.1K",
    description: "Across 24 posts",
    delta: "+11.7%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: MessageCircle,
  },
  {
    id: "saves",
    label: "Saves",
    value: "2.6K",
    description: "Across 24 posts",
    delta: "-2.3%",
    deltaLabel: "vs prev period",
    trend: "negative",
    icon: Bookmark,
  },
];

export const contentTypeSplit: CategoryDatum[] = [
  { key: "reel", label: "Reels", value: 11, color: "var(--chart-1)" },
  { key: "image", label: "Images", value: 7, color: "var(--chart-3)" },
  { key: "carousel", label: "Carousels", value: 4, color: "var(--chart-2)" },
  { key: "story", label: "Stories", value: 2, color: "var(--chart-4)" },
];

export const engagementByType: LabeledValue[] = [
  { label: "Reels", value: 5.8 },
  { label: "Carousels", value: 4.2 },
  { label: "Images", value: 3.1 },
  { label: "Stories", value: 1.9 },
];

export const contentPosts: ContentPostRow[] = [
  {
    id: "p1",
    caption: "Summer collection drop — behind the scenes",
    mediaType: "Reel",
    reach: 84200,
    likes: 6120,
    comments: 412,
    saves: 980,
    engagementRate: 7.8,
  },
  {
    id: "p2",
    caption: "Customer spotlight: how they styled it",
    mediaType: "Carousel",
    reach: 52100,
    likes: 3980,
    comments: 286,
    saves: 640,
    engagementRate: 5.4,
  },
  {
    id: "p3",
    caption: "New menu reveal",
    mediaType: "Image",
    reach: 38600,
    likes: 2110,
    comments: 142,
    saves: 210,
    engagementRate: 3.2,
  },
  {
    id: "p4",
    caption: "Weekend giveaway announcement",
    mediaType: "Reel",
    reach: 71300,
    likes: 5240,
    comments: 528,
    saves: 820,
    engagementRate: 6.9,
  },
  {
    id: "p5",
    caption: "Quick tip Tuesday",
    mediaType: "Story",
    reach: 19800,
    likes: 640,
    comments: 38,
    saves: 92,
    engagementRate: 1.8,
  },
];
