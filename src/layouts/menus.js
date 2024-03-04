import { RxDashboard } from "react-icons/rx";
import { PiBarbell } from "react-icons/pi";

const menus = [
  {
    path: "/dashboard/",
    name: "Dashboard",
    icon: RxDashboard,
  },
  {
    path: "/codes/",
    name: "Work Out",
    icon: PiBarbell,
  },
];

export function getMenus() {
  return menus;
}
