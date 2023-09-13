import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView/>} />
                <Route path="/login/" element={<LoginView />}>
                    <Route path="signin" element={<SignIn/>} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App;