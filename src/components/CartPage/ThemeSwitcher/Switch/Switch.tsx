import React, { useState } from 'react';
import "./Switch.css";

export const Switch: React.FC = () => {
   const [isToggled, setIsToggled] = useState(false)

   const onToggle = () => {
      setIsToggled(!isToggled)
   }

   return (
      <label className="toggle-switch">
         <input type="checkbox" checked={isToggled} onChange={onToggle} />
         <span className="switch" />
      </label>
   );
}