export type StatCard = {
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
};

export const dashboardStats: StatCard[] = [
  {
    label: "Posts Posted This Month",
    value: "128",
    delta: "+12.4%",
    deltaLabel: "vs last month",
  },
  {
    label: "Posts Drafted This Month",
    value: "46",
    delta: "+6",
    deltaLabel: "since last week",
  },
  {
    label: "Posts Scheduled This Month",
    value: "34",
    delta: "+9",
    deltaLabel: "newly scheduled",
  },
  {
    label: "Posts Missed This Month",
    value: "7",
    delta: "-2",
    deltaLabel: "from last month",
  },
];

export type NeedsAttentionPosts = {
  time: string;
  from: string;
  status: "Missed" | "Due Today" | "Needs Review";
};

export const needsAttentionPosts: NeedsAttentionPosts[] = [
  {
    time: "09:00 AM",
    from: "Pulse Co. - Spring launch",
    status: "Missed",
  },
  {
    time: "10:30 AM",
    from: "Nova Design - Founder spotlight",
    status: "Due Today",
  },
  {
    time: "11:15 AM",
    from: "Atlas & Pine - Product carousel",
    status: "Needs Review",
  },
  {
    time: "01:00 PM",
    from: "Marlow & Co. - Story draft",
    status: "Due Today",
  },
  {
    time: "03:30 PM",
    from: "Reverb Labs - Campaign recap",
    status: "Needs Review",
  },
  {
    time: "04:45 PM",
    from: "Lumen Grocers - Offer promo",
    status: "Missed",
  },
  {
    time: "05:20 PM",
    from: "Vibe Agency - Event countdown",
    status: "Due Today",
  },
  {
    time: "06:15 PM",
    from: "Echo Tech - Product demo",
    status: "Needs Review",
  },
];

export type TopClient = {
  name: string;
  posts: number;
  scheduled: number;
  missed: number;
};

export const topClients: TopClient[] = [
  { name: "Pulse Co.", posts: 24, scheduled: 6, missed: 1 },
  { name: "Atlas & Pine", posts: 21, scheduled: 5, missed: 0 },
  { name: "Nova Design", posts: 18, scheduled: 4, missed: 2 },
  { name: "Reverb Labs", posts: 16, scheduled: 3, missed: 1 },
  { name: "Marlow & Co.", posts: 14, scheduled: 2, missed: 1 },
  { name: "Summit Studio", posts: 13, scheduled: 3, missed: 0 },
  { name: "Harbor & Co.", posts: 12, scheduled: 2, missed: 1 },
  { name: "Lumen Works", posts: 11, scheduled: 2, missed: 0 },
  { name: "Cedar Lane", posts: 10, scheduled: 1, missed: 1 },
  { name: "Northwind", posts: 9, scheduled: 1, missed: 0 },
];

export type RecentOrder = {
  time: string;
  from: string;
  id: string;
  status: "In Progress" | "Ready" | "Completed";
  total: string;
  items: OrderLineItem[];
};

export type OrderLineItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

export const recentOrders: RecentOrder[] = [
  {
    time: "14:22:10",
    from: "Table 7",
    id: "DC-728",
    status: "In Progress",
    total: "₹1,766.40",
    items: [
      {
        id: "latte",
        name: "Caffè Latte",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 240,
        quantity: 2,
      },
      {
        id: "croissant",
        name: "Butter Croissant",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 180,
        quantity: 1,
      },
    ],
  },
  {
    time: "14:20:44",
    from: "Pickup",
    id: "DC-727",
    status: "Ready",
    total: "₹936.00",
    items: [
      {
        id: "americano",
        name: "Americano",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 180,
        quantity: 2,
      },
      {
        id: "muffin",
        name: "Blueberry Muffin",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 195,
        quantity: 2,
      },
    ],
  },
  {
    time: "14:19:03",
    from: "Table 3",
    id: "DC-726",
    status: "Completed",
    total: "₹2,121.60",
    items: [
      {
        id: "cappuccino",
        name: "Cappuccino",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 220,
        quantity: 4,
      },
      {
        id: "pasta",
        name: "Arrabbiata Pasta",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 620.8,
        quantity: 2,
      },
    ],
  },
  {
    time: "14:16:28",
    from: "Table 2",
    id: "DC-725",
    status: "Completed",
    total: "₹624.00",
    items: [
      {
        id: "filter",
        name: "Filter Coffee",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 156,
        quantity: 4,
      },
    ],
  },
  {
    time: "14:15:12",
    from: "Table 5",
    id: "DC-724",
    status: "In Progress",
    total: "₹2,298.88",
    items: [
      {
        id: "flatwhite",
        name: "Flat White",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 260.56,
        quantity: 4,
      },
      {
        id: "sandwich",
        name: "Grilled Sandwich",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 628.32,
        quantity: 2,
      },
    ],
  },
  {
    time: "14:12:50",
    from: "Table 1",
    id: "DC-723",
    status: "Ready",
    total: "₹7,120.00",
    items: [
      {
        id: "brunch",
        name: "Breakfast Platter",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 890,
        quantity: 4,
      },
      {
        id: "coldbrew",
        name: "Cold Brew",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 280,
        quantity: 4,
      },
    ],
  },
  {
    time: "14:10:05",
    from: "Table 4",
    id: "DC-722",
    status: "Completed",
    total: "₹1,872.00",
    items: [
      {
        id: "mocha",
        name: "Mocha",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 234,
        quantity: 4,
      },
      {
        id: "brownie",
        name: "Walnut Brownie",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 468,
        quantity: 2,
      },
    ],
  },
  {
    time: "14:08:30",
    from: "Pickup",
    id: "DC-721",
    status: "Completed",
    total: "₹2604.00",
    items: [
      {
        id: "espresso",
        name: "Espresso",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 180,
        quantity: 6,
      },
      {
        id: "cheesecake",
        name: "Cheesecake Slice",
        imageUrl: "https://placehold.co/600x400/3d2013/FFF",
        price: 380,
        quantity: 4,
      },
    ],
  },
];
