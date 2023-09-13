import { useNavigate } from "react-router-dom";

export default function Welcome(){
    const navigate = useNavigate();

    const login = () => {
        navigate("/login");
    }

    return(
        <div>
            <h1>Hola! :D</h1>
            <br></br>
        <button onClick={login}>Acceder</button>
    </div>
    )

}