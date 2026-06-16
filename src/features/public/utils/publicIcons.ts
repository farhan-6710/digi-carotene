import {
  Activity,
  CheckCircle2,
  Clock,
  Flame,
  Heart,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

import type { PortalFeatureIcon, ServiceIconName } from "@/features/public/types/types";

export function getServiceIcon(iconName: ServiceIconName) {
  switch (iconName) {
    case "Users":
      return Users;
    case "Layers":
      return Layers;
    case "Activity":
      return Activity;
    case "Flame":
      return Flame;
    default:
      return Sparkles;
  }
}

export function getPortalFeatureIcon(icon: PortalFeatureIcon) {
  switch (icon) {
    case "Clock":
      return Clock;
    case "CheckCircle2":
      return CheckCircle2;
    case "Activity":
      return Activity;
    case "Layers":
      return Layers;
    case "UserRound":
      return UserRound;
    case "Flame":
      return Flame;
  }
}

export function getValueIcon(title: string) {
  if (title.includes("Client")) return Heart;
  if (title.includes("Data")) return Activity;
  return ShieldCheck;
}

export function getSectionIcon(title: string) {
  if (title.includes("approach")) return Sparkles;
  if (title.includes("Who")) return Users;
  return Layers;
}

export function getDashboardStatIcon(icon: "UserRound" | "Users") {
  return icon === "UserRound" ? UserRound : Users;
}

export function getContactDetailIcon(icon: "Mail" | "Phone" | "MapPin") {
  switch (icon) {
    case "Mail":
      return Mail;
    case "Phone":
      return Phone;
    case "MapPin":
      return MapPin;
  }
}
