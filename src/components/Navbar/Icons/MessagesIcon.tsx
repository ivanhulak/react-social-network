import { useTheme } from "styled-components";
import { ThemeType } from "../../../theme";

export const MessagesIcon = () => {
   const theme = useTheme() as ThemeType
   return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M5.66563 13.6667C5.66563 7.77563 10.4413 3 16.3323 3C22.2233 3 26.999 7.77563 26.999 13.6667C26.999 15.2 26.6754 16.6578 26.0929 17.9755L27.001 24.3323L21.5533 22.9704C20.01 23.8383 18.229 24.3333 16.3323 24.3333M3.00023 20.3333C3.00023 21.2917 3.20242 22.2028 3.56648 23.0264L2.99896 26.9994L6.40345 26.1482C7.3679 26.6906 8.48095 27 9.66626 27C13.3478 27 16.3323 24.0152 16.3323 20.3333C16.3323 16.6514 13.3478 13.6667 9.66626 13.6667C5.98471 13.6667 3.00023 16.6514 3.00023 20.3333Z" stroke={theme.navlink_icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

   );
}