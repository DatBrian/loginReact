import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        roles: [],
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

    const handleRoleChange = (e) => {
        const roleName = e.target.value;
        const isChecked = e.target.checked;

        const updatedRoles = isChecked
        ? [...user.roles, roleName]
        : user.roles.filter((role) => role !== roleName);

        setUser({
            ...user,
            roles: updatedRoles,
        });
    };

    const handleSubmitRegister = async(e) => {
        e.preventDefault();

        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/login/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                Accept: "Application/json",
                "Accept-Version": "1.0.0"
            },
            body: JSON.stringify(user)
        });
        const response = await res.json();
        alert("Revisa la consola :DD")
        console.log(await response);
        if (response.status === 200) {
            await handleQuit();
        }
    };

    const handleQuit = async() => {
        navigate("/Dashboard");
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
                <h2>Selecciona tus roles</h2>
                <label>
                    Usuario
                    <input type="checkbox" value={"user"} checked={user.roles.includes("user")} onChange={handleRoleChange} />
                </label>
                <label>
                    Administrador
                    <input type="checkbox" value={"admin"} checked={user.roles.includes("admin")} onChange={handleRoleChange}/>
                </label>

                <br></br>
                <br></br>

                <button type="submit">Registrar</button>

                <h1>Volver</h1>
                <button type="button" onClick={handleQuit} >D:</button>
            </form>
        </>
    );
}
