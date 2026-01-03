import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import SensorDetails from "../src/pages/SensorDetails";
import Alerts from "./pages/Alert";
import Tickets from "../src/pages/Tickets";
import AuditLogs from "../src/pages/AuditLogs";
import Exports from "../src/pages/Exports";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sensors/:id" element={<SensorDetails />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/audit" element={<AuditLogs />} />
                <Route path="/exports" element={<Exports />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
