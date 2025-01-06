import { ProfileOptions } from "@/types/types";
import ChangeEmailSection from "./changeEmailSection";
import ChangePasswordSection from "./ChangePasswordSection";
import ChangeNameSection from "./ChangeNameSection";

export const profileOptions: ProfileOptions[] = [
  {
    title: "Password",
    component: <ChangePasswordSection />,
  },
  {
    title: "Email",
    component: <ChangeEmailSection />,
  },
  {
    title: "Name",
    component: <ChangeNameSection />,
  },
];
