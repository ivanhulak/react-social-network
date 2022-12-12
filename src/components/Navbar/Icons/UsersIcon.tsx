import { useTheme } from "styled-components";
import { ThemeType } from "../../../theme";

export const UsersIcon = () => {
   const theme = useTheme() as ThemeType
   return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.45 13.5875C11.325 13.575 11.175 13.575 11.0375 13.5875C8.06251 13.4875 5.70001 11.05 5.70001 8.05C5.70001 4.9875 8.17501 2.5 11.25 2.5C14.3125 2.5 16.8 4.9875 16.8 8.05C16.7875 11.05 14.425 13.4875 11.45 13.5875Z" stroke={theme.navlink_icon} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         <path d="M20.5125 5C22.9375 5 24.8875 6.9625 24.8875 9.375C24.8875 11.7375 23.0125 13.6625 20.675 13.75C20.575 13.7375 20.4625 13.7375 20.35 13.75" stroke={theme.navlink_icon} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         <path d="M5.20002 18.2C2.17502 20.225 2.17502 23.525 5.20002 25.5375C8.63752 27.8375 14.275 27.8375 17.7125 25.5375C20.7375 23.5125 20.7375 20.2125 17.7125 18.2C14.2875 15.9125 8.65002 15.9125 5.20002 18.2Z" stroke={theme.navlink_icon}stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         <path d="M22.925 25C23.825 24.8125 24.675 24.45 25.375 23.9125C27.325 22.45 27.325 20.0375 25.375 18.575C24.6875 18.05 23.85 17.7 22.9625 17.5" stroke={theme.navlink_icon} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
   );
}