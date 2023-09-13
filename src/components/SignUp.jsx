import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        role: [],
        permisos: {},
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

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        alert(`Enviando!! user: ${user.username}, password: ${user.password}`);
    };

    const handleQuit = () => {
        navigate("/login");
    };

    return (
        <>
            <form onSubmit={handleSubmitRegister}>
                <h2>Registro de Usuario</h2>
                <label>
                    Username:{" "}
                    <input type="text" onChange={handleUsername}></input>
                </label>
                <label>
                    Password:{" "}
                    <input type="password" onChange={handlePassword}></input>
                </label>

                <button type="submit">Registrar</button>

                <h1>Volver</h1>
                <button type="button" onClick={handleQuit}>D:</button>
            </form>
        </>
    );
}
