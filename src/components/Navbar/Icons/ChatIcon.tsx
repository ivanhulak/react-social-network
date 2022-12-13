import { useTheme } from "styled-components";
import { ThemeType } from "../../../theme";

export const ChatIcon = () => {
   const theme = useTheme() as ThemeType
   return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M15 27L18.2609 20.7391H25C26.1046 20.7391 27 19.8437 27 18.7391V5C27 3.89543 26.1046 3 25 3H5C3.89543 3 3 3.89543 3 5V18.7391C3 19.8437 3.89543 20.7391 5 20.7391H12L15 27Z" stroke={theme.navlink_icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   );
}