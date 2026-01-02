import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SensorDetails from "./pages/SensorDetails";
import Alerts from "./pages/Alerts";
import Tickets from "./pages/Tickets";
import AuditLogs from "./pages/AuditLogs";
import Exports from "./pages/Exports";

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
