import { useTheme } from "styled-components";
import { ThemeType } from "../../../theme";


export const DeleteProductIcon = () => {
   const theme = useTheme() as ThemeType
   return (
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M15.5293 9.1263L12.1352 12.5204M12.1352 12.5204L8.74104 15.9145M12.1352 12.5204L15.5293 15.9145M12.1352 12.5204L8.74104 9.1263M21.7352 6.52041L21.7352 18.5205C21.7352 20.5087 20.1234 22.1205 18.1352 22.1205H6.13516C4.14693 22.1205 2.53516 20.5087 2.53516 18.5205V6.52041C2.53516 4.53219 4.14693 2.92041 6.13516 2.92041H18.1352C20.1234 2.92041 21.7352 4.53218 21.7352 6.52041Z" stroke={theme.switch_icon} stroke-width="2" stroke-linecap="round" />
      </svg>
   );
}