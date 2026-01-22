import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./Contexts/UserContext.jsx";
import RouteComponent from "./Routes/index.jsx";
import {ThemeProvider} from "./Contexts/ThemeContext.jsx";
import {AlertProvider} from "@/Contexts/AlertContext/AlertContext.jsx";

function App() {
    return (

            <ThemeProvider>
                <AlertProvider>
                    <BrowserRouter>
                        <UserProvider>
                            <RouteComponent/>
                        </UserProvider>
                    </BrowserRouter>
                </AlertProvider>
            </ThemeProvider>
    );
}

export default App;
