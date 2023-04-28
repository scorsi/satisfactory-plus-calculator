import {
  AdjustmentsVerticalIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  FolderIcon,
  HomeIcon,
  IdentificationIcon,
  MapIcon
} from "@heroicons/react/24/outline";

export const mainNavigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Wiki", href: "#", icon: CircleStackIcon, current: false },
  { name: "Map", href: "#", icon: MapIcon, current: false },
  { name: "Planner", href: "#", icon: Cog8ToothIcon, current: false },
  { name: "Guides", href: "#", icon: FolderIcon, current: false }
];

export const userNavigation = [
  { name: "Your Profile", icon: IdentificationIcon, href: "#" },
  { name: "Settings", icon: AdjustmentsVerticalIcon, href: "#" }
];

export const authNavitation = {
  login: "/login",
  register: "/register",
  logout: "/logout"
};
