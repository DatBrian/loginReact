import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DashboardView from "./views/DashboardView";

function App (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView/>} />
                <Route path="/login/" element={<LoginView />}>
                    <Route path="signin" element={<SignIn/>} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/dashboard" element={<DashboardView/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App;