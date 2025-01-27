import { CiShop } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { MdDashboard, MdOutlineEventSeat } from "react-icons/md";
import { PiFlagBannerFold } from "react-icons/pi";

export const SidebarLink = [
  {
    path: "/",
    label: "Dashboard",
    icon: <LuCalendarClock size={24} />,
  },
  // {
  //     path: '/users',
  //     label: 'User Management',
  //     icon: <LuUser2 size={24} />,
  // },
  {
    path: "/vendors",
    label: "Vendor Management",
    icon: <CiShop size={24} />,
  },
  {
    path: "/events",
    label: "Event Management",
    icon: <MdOutlineEventSeat size={24} />,
  },
  {
    path: "/vendor-request",
    label: "Vendor Request",
    icon: <PiFlagBannerFold size={24} />,
  },
  {
    path: "/management",
    label: "Management",
    icon: <MdDashboard size={24} />,
  },
];

export const SettingLinks = [
  {
    path: "/profile",
    label: "Profile",
  },
  {
    path: "/faq",
    label: "FAQ",
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    path: "/about-us",
    label: "About Us",
  },
  {
    path: "/terms-&-condition",
    label: "Terms & Condition",
  },
];
