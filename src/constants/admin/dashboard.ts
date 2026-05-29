export type StatCard = {
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
};

export const dashboardStats: StatCard[] = [
  {
    label: "Posts Published This Month",
    value: "186",
    delta: "+12.4%",
    deltaLabel: "vs last month",
  },
  {
    label: "Posts Scheduled",
    value: "52",
    delta: "+6",
    deltaLabel: "since last week",
  },
  {
    label: "Active Clients This Month",
    value: "34",
    delta: "+9",
    deltaLabel: "new this month",
  },
  {
    label: "Missed Posts This Month",
    value: "7",
    delta: "-2",
    deltaLabel: "from last month",
  },
];

export type NeedsAttentionItem = {
  time: string;
  from: string;
  status: "Missed" | "Due Today" | "Needs Review";
};

export const needsAttentionItems: NeedsAttentionItem[] = [
  {
    time: "09:00 AM",
    from: "Bloom Skincare - Instagram carousel",
    status: "Missed",
  },
  {
    time: "10:30 AM",
    from: "Northwind Apparel - Product launch post",
    status: "Due Today",
  },
  {
    time: "11:15 AM",
    from: "Urban Eats Co. - Weekend promo",
    status: "Needs Review",
  },
  {
    time: "01:00 PM",
    from: "Peak Fitness - Reels campaign",
    status: "Due Today",
  },
  {
    time: "03:30 PM",
    from: "Luxe Interiors - Before/after showcase",
    status: "Needs Review",
  },
  {
    time: "04:45 PM",
    from: "GreenLeaf Organics - Story series",
    status: "Missed",
  },
  {
    time: "05:20 PM",
    from: "Swift Logistics - LinkedIn update",
    status: "Due Today",
  },
  {
    time: "06:15 PM",
    from: "Nova Tech - Feature announcement",
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
  { name: "Bloom Skincare", posts: 24, scheduled: 6, missed: 1 },
  { name: "Northwind Apparel", posts: 21, scheduled: 5, missed: 0 },
  { name: "Urban Eats Co.", posts: 18, scheduled: 4, missed: 2 },
  { name: "Peak Fitness", posts: 16, scheduled: 3, missed: 1 },
  { name: "Luxe Interiors", posts: 14, scheduled: 2, missed: 1 },
  { name: "GreenLeaf Organics", posts: 13, scheduled: 3, missed: 0 },
  { name: "Swift Logistics", posts: 12, scheduled: 2, missed: 1 },
  { name: "Nova Tech", posts: 11, scheduled: 2, missed: 0 },
  { name: "Bright Dental", posts: 10, scheduled: 1, missed: 1 },
  { name: "Coastal Realty", posts: 9, scheduled: 1, missed: 0 },
];

export type RecentPost = {
  time: string;
  client: string;
  id: string;
  postType: string;
  status: "Scheduled" | "Posted" | "Missed";
};

export const recentPosts: RecentPost[] = [
  {
    time: "09:00 AM",
    client: "Bloom Skincare",
    id: "DC-728",
    postType: "Instagram carousel",
    status: "Posted",
  },
  {
    time: "09:45 AM",
    client: "Northwind Apparel",
    id: "DC-727",
    postType: "Product launch",
    status: "Scheduled",
  },
  {
    time: "10:30 AM",
    client: "Urban Eats Co.",
    id: "DC-726",
    postType: "Weekend promo",
    status: "Posted",
  },
  {
    time: "11:15 AM",
    client: "Peak Fitness",
    id: "DC-725",
    postType: "Reels campaign",
    status: "Missed",
  },
  {
    time: "12:00 PM",
    client: "Luxe Interiors",
    id: "DC-724",
    postType: "Before/after",
    status: "Scheduled",
  },
  {
    time: "01:30 PM",
    client: "GreenLeaf Organics",
    id: "DC-723",
    postType: "Story series",
    status: "Posted",
  },
  {
    time: "02:15 PM",
    client: "Swift Logistics",
    id: "DC-722",
    postType: "LinkedIn update",
    status: "Scheduled",
  },
  {
    time: "03:00 PM",
    client: "Nova Tech",
    id: "DC-721",
    postType: "Feature announcement",
    status: "Posted",
  },
];
