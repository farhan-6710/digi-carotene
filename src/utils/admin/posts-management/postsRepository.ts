import { format, lastDayOfMonth, startOfMonth } from "date-fns";

import { supabase } from "@/lib/supabase";
import type {
  Post,
  Slot,
  SlotClient,
  StatusKey,
} from "@/types/admin/posts-management/types";
import { getDayLabel } from "@/utils/admin/posts-management/calendarUtils";

export function toScheduledDate(
  year: number,
  month: number,
  date: number,
): string {
  return format(new Date(year, month - 1, date), "yyyy-MM-dd");
}

function getMonthDateRange(year: number, month: number) {
  const monthStart = startOfMonth(new Date(year, month - 1, 1));
  const monthEnd = lastDayOfMonth(monthStart);

  return {
    start: format(monthStart, "yyyy-MM-dd"),
    end: format(monthEnd, "yyyy-MM-dd"),
  };
}

export function postToSlotClient(post: Post): SlotClient {
  return {
    id: post.id,
    name: post.client_name,
    time: post.scheduled_time,
    status: post.status,
  };
}

export function postsToSlots(posts: Post[], year: number, month: number): Slot[] {
  const clientsByDate = new Map<number, SlotClient[]>();

  for (const post of posts) {
    const [postYear, postMonth, postDay] = post.scheduled_date
      .split("-")
      .map(Number);

    if (postYear !== year || postMonth !== month) {
      continue;
    }

    const dayClients = clientsByDate.get(postDay) ?? [];
    dayClients.push(postToSlotClient(post));
    clientsByDate.set(postDay, dayClients);
  }

  return Array.from(clientsByDate.entries())
    .sort(([dayA], [dayB]) => dayA - dayB)
    .map(([date, clients]) => ({
      year,
      month,
      date,
      day: getDayLabel(year, month, date),
      clients: clients.sort((a, b) => a.time.localeCompare(b.time)),
    }));
}

export async function fetchPostsForMonth(
  year: number,
  month: number,
): Promise<Post[]> {
  const { start, end } = getMonthDateRange(year, month);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .gte("scheduled_date", start)
    .lte("scheduled_date", end)
    .order("scheduled_date", { ascending: true })
    .order("scheduled_time", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Post[];
}

type CreatePostInput = {
  clientName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: StatusKey;
};

type UpdatePostInput = {
  clientName: string;
  scheduledTime: string;
  status: StatusKey;
};

export async function createPost(input: CreatePostInput): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      client_name: input.clientName,
      scheduled_date: input.scheduledDate,
      scheduled_time: input.scheduledTime,
      status: input.status,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Post;
}

export async function updatePost(
  postId: string,
  input: UpdatePostInput,
): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update({
      client_name: input.clientName,
      scheduled_time: input.scheduledTime,
      status: input.status,
    })
    .eq("id", postId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Post;
}

export async function deletePost(postId: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    throw error;
  }
}
