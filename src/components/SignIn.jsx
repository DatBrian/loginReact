import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleUsername = (e) => {
        setUser({
            ...user,
            username: e.target.value,
        });
    };

    const handlePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value,
        });
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/login/signin", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                Accept: "Application/json"
            },
            body: JSON.stringify(user)
        });
        const response = await res.json();
        console.log(response);
    }

    const handleQuit = () => {
        navigate("/login");
    };

    return (
        <>
            <form onSubmit={handleSignin}>
                <h2>Inicio de sesión</h2>
                <label>
                    Username:{" "}
                    <input type="text" onChange={handleUsername}></input>
                </label>
                <label>
                    Password:{" "}
                    <input type="password" onChange={handlePassword}></input>
                </label>

                <button type="submit">Iniciar</button>

                <h1>Volver</h1>
                <button type="button" onClick={handleQuit}>
                    D:
                </button>
            </form>
        </>
    );
}
