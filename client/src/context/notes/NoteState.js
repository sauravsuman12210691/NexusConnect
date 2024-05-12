import { useEffect, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const [userData, setUserData] = useState(null);

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/getuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('awthToken')
                    
                }
            });
            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        handleLogin();
    }, []); // Empty dependency array to ensure it only runs once after initial render

    return (
        <NoteContext.Provider value={userData}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
