import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoginOptions from "../components/LoginOptions";

export default function LoginView() {
    const [showOptions, setShowOptions] = useState(true);
    
    const handleOptions = () => {
        setShowOptions(false);
    }

    return (
        <div>
            {showOptions && (
                <LoginOptions onHide={handleOptions}/>
            )}

            <Outlet/>
       </div>
   )
}
