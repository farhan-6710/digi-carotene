import type { Slot, StatusKey, Week } from "@/types/admin/posts-management/types";

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const weeks: Week[] = [
  { label: "Week 1", range: "May 1 to May 7", dates: [1, 2, 3, 4, 5, 6, 7] },
  {
    label: "Week 2",
    range: "May 8 to May 14",
    dates: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    label: "Week 3",
    range: "May 15 to May 21",
    dates: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    label: "Week 4",
    range: "May 22 to May 28",
    dates: [22, 23, 24, 25, 26, 27, 28],
  },
  {
    label: "Week 5",
    range: "May 29 to May 31",
    dates: [29, 30, 31, 0, 0, 0, 0],
  },
];

export const dummyPostsData: Slot[] = [
  {
        date: 1,
    day: "Mon",
    clients: [
      {
        id: "cli-101",
        time: "9:00 am",
        name: "Bloom Skincare",
        status: "Posted",
      },
      {
        id: "cli-102",
        time: "10:30 am",
        name: "Northwind Apparel",
        status: "Posted",
      },
      {
        id: "cli-103",
        time: "12:00 pm",
        name: "Urban Eats Co.",
        status: "Missed",
      },
      {
        id: "cli-104",
        time: "3:30 pm",
        name: "Peak Fitness",
        status: "Scheduled",
      },
    ],
  },
  {
        date: 2,
    day: "Tue",
    clients: [
      {
        id: "cli-201",
        time: "8:30 am",
        name: "Luxe Interiors",
        status: "Posted",
      },
      {
        id: "cli-202",
        time: "11:00 am",
        name: "GreenLeaf Organics",
        status: "Posted",
      },
      {
        id: "cli-203",
        time: "1:15 pm",
        name: "Swift Logistics",
        status: "Scheduled",
      },
      {
        id: "cli-204",
        time: "4:45 pm",
        name: "Nova Tech",
        status: "Scheduled",
      },
    ],
  },
  {
        date: 3,
    day: "Wed",
    clients: [
      {
        id: "cli-301",
        time: "9:15 am",
        name: "Bright Dental",
        status: "Posted",
      },
      {
        id: "cli-302",
        time: "10:45 am",
        name: "Coastal Realty",
        status: "Missed",
      },
      {
        id: "cli-303",
        time: "2:00 pm",
        name: "Studio Arc",
        status: "Scheduled",
      },
      {
        id: "cli-304",
        time: "5:00 pm",
        name: "FreshBite Foods",
        status: "Scheduled",
      },
    ],
  },
  { date: 4, day: "Thu", clients: [] },
  {
        date: 5,
    day: "Fri",
    clients: [
      {
        id: "cli-501",
        time: "9:30 am",
        name: "Velvet Fashion",
        status: "Posted",
      },
      {
        id: "cli-502",
        time: "11:30 am",
        name: "Summit Finance",
        status: "Scheduled",
      },
    ],
  },
  { date: 6, day: "Sat", clients: [] },
  {
        date: 7,
    day: "Sun",
    clients: [
      {
        id: "cli-701",
        time: "10:00 am",
        name: "Pulse Health",
        status: "Posted",
      },
      {
        id: "cli-702",
        time: "1:00 pm",
        name: "Craft & Co.",
        status: "Missed",
      },
      {
        id: "cli-703",
        time: "3:00 pm",
        name: "Horizon Travel",
        status: "Scheduled",
      },
    ],
  },
  { date: 8, day: "Mon", clients: [] },
  {
        date: 9,
    day: "Tue",
    clients: [
      {
        id: "cli-901",
        time: "8:00 am",
        name: "Pixel Games",
        status: "Posted",
      },
    ],
  },
  {
        date: 10,
    day: "Wed",
    clients: [
      {
        id: "cli-1001",
        time: "9:45 am",
        name: "Pure Glow Beauty",
        status: "Scheduled",
      },
      {
        id: "cli-1002",
        time: "2:30 pm",
        name: "Metro Motors",
        status: "Scheduled",
      },
    ],
  },
  { date: 11, day: "Thu", clients: [] },
  {
        date: 12,
    day: "Fri",
    clients: [
      {
        id: "cli-1201",
        time: "11:15 am",
        name: "Willow Wellness",
        status: "Posted",
      },
    ],
  },
  { date: 13, day: "Sat", clients: [] },
  {
        date: 14,
    day: "Sun",
    clients: [
      {
        id: "cli-1401",
        time: "10:30 am",
        name: "CloudNine SaaS",
        status: "Missed",
      },
      {
        id: "cli-1402",
        time: "4:00 pm",
        name: "Harbor Legal",
        status: "Scheduled",
      },
    ],
  },
  {
        date: 15,
    day: "Mon",
    clients: [
      {
        id: "cli-1501",
        time: "9:00 am",
        name: "Stellar Events",
        status: "Posted",
      },
      {
        id: "cli-1502",
        time: "12:30 pm",
        name: "Artisan Coffee",
        status: "Scheduled",
      },
      {
        id: "cli-1503",
        time: "3:15 pm",
        name: "NextGen Edu",
        status: "Scheduled",
      },
    ],
  },
  { date: 16, day: "Tue", clients: [] },
  {
        date: 17,
    day: "Wed",
    clients: [
      {
        id: "cli-1701",
        time: "8:45 am",
        name: "BlueSky Media",
        status: "Posted",
      },
    ],
  },
  { date: 18, day: "Thu", clients: [] },
  {
        date: 19,
    day: "Fri",
    clients: [
      {
        id: "cli-1901",
        time: "10:00 am",
        name: "Forge Industrial",
        status: "Scheduled",
      },
      {
        id: "cli-1902",
        time: "1:45 pm",
        name: "PetPal",
        status: "Scheduled",
      },
    ],
  },
  { date: 20, day: "Sat", clients: [] },
  {
        date: 21,
    day: "Sun",
    clients: [
      {
        id: "cli-2101",
        time: "11:00 am",
        name: "Zen Yoga",
        status: "Posted",
      },
    ],
  },
  { date: 22, day: "Mon", clients: [] },
  {
        date: 23,
    day: "Tue",
    clients: [
      {
        id: "cli-2301",
        time: "9:30 am",
        name: "Ridge Outdoors",
        status: "Missed",
      },
      {
        id: "cli-2302",
        time: "2:00 pm",
        name: "Golden Bakery",
        status: "Scheduled",
      },
    ],
  },
  { date: 24, day: "Wed", clients: [] },
  {
        date: 25,
    day: "Thu",
    clients: [
      {
        id: "cli-2501",
        time: "8:15 am",
        name: "Spark Social",
        status: "Posted",
      },
      {
        id: "cli-2502",
        time: "11:45 am",
        name: "Prime Consulting",
        status: "Posted",
      },
      {
        id: "cli-2503",
        time: "4:30 pm",
        name: "EcoHome",
        status: "Scheduled",
      },
    ],
  },
  { date: 26, day: "Fri", clients: [] },
  {
        date: 27,
    day: "Sat",
    clients: [
      {
        id: "cli-2701",
        time: "10:15 am",
        name: "TrailBlaze",
        status: "Scheduled",
      },
    ],
  },
  { date: 28, day: "Sun", clients: [] },
  {
        date: 29,
    day: "Mon",
    clients: [
      {
        id: "cli-2901",
        time: "9:00 am",
        name: "Lumen Lighting",
        status: "Scheduled",
      },
      {
        id: "cli-2902",
        time: "12:00 pm",
        name: "FitFuel",
        status: "Scheduled",
      },
    ],
  },
  {
        date: 30,
    day: "Tue",
    clients: [
      {
        id: "cli-3001",
        time: "10:30 am",
        name: "Bloom & Bark",
        status: "Scheduled",
      },
    ],
  },
  { date: 31, day: "Wed", clients: [] },
];

export const initialSlots: Slot[] = dummyPostsData;

export const statusColors: Record<StatusKey, string> = {
  Draft: "bg-status-draft ",
  Scheduled: "bg-status-scheduled",
  Posted: "bg-status-posted",
  Missed: "bg-status-missed",
};

export const statusText: Record<StatusKey, string> = {
  Draft: "text-status-draft",
  Scheduled: "text-status-scheduled",
  Posted: "text-status-posted",
  Missed: "text-status-missed",
};
