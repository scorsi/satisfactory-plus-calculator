import {
  AdjustmentsVerticalIcon,
  CircleStackIcon,
  // Cog8ToothIcon,
  // FolderIcon,
  HomeIcon,
  IdentificationIcon,
  MapIcon
} from "@heroicons/react/24/outline";

export const mainNavigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Wiki", href: "/wiki", icon: CircleStackIcon },
  { name: "Map", href: "/map", icon: MapIcon },
  // { name: "Planner", href: "#", icon: Cog8ToothIcon },
  // { name: "Guides", href: "#", icon: FolderIcon }
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
