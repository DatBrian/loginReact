import { useNavigate } from "react-router-dom";

export default function LoginOptions({ onHide }) {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/login/signup");
        onHide();
    };

    const handleSignIn = () => {
        navigate("/login/signin");
        onHide();
    };

    return (
        <div>
            <h1>Si eres nuevo click aqui</h1>
            <button onClick={handleSignUp}>:D</button>

            <h1>Si ya estas registrado click aqui</h1>
            <button onClick={handleSignIn}>:D</button>

        </div>
    );
}
