import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import SensorDetails from "./pages/sensor/SensorDetails";
import Alerts from "./pages/alert/Alert";
import Tickets from "./pages/ticket/Tickets";
import AuditLogs from "./pages/audit/AuditLogs";
import Exports from "./pages/export/Exports";
import Layout from "./pages/layout/Layout";
import SensorList from "./components/sensor/SensorList";
import AddSensor from "./pages/admin/AddSensor";
import ProtectedRoute from "./routes/guardService";
import Login from "./pages/login/Login";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Page publique */}
                <Route path="/login" element={<Login />} />

                {/* Zone protégée */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    {/* Dashboard */}
                    <Route index element={<Dashboard />} />

                    {/* Autres pages */}
                    <Route path="sensors" element={<SensorList />} />
                    <Route path="sensors/:id" element={<SensorDetails />} />
                    <Route path="alerts" element={<Alerts />} />
                    <Route path="tickets" element={<Tickets />} />
                    <Route path="audit" element={<AuditLogs />} />
                    <Route path="exports" element={<Exports />} />
                    <Route path="admin/sensors/new" element={<AddSensor />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
};

export default App;
