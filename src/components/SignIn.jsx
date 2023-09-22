import { useEffect, useState } from "react";
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

    const redirectSucessfully = () => {
        navigate("/dashboard");
    }

    const handleSignin = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/login/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                Accept: "Application/json",
                "Accept-version": "1.0.0"
            },
            body: JSON.stringify(user)
        });
        const response = await res.json();
        if (res.ok) {
            redirectSucessfully();
        } else {
            if (await response.message === "Contraseña incorrecta") {
                alert("Contraseña incorrecta")
            } else {
                alert(response)
            }
        }
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
