import {Measurement} from "../../models/Measurement";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import styles from "./SensorGraphs.module.css";
import { ResponsiveContainer } from "recharts";

interface Props {
    measurements: Measurement[];
}

export default function SensorGraphs({ measurements }: Props) {
    return (
        <div className={styles.graphsContainer}>
            {/* Graphique Température */}
            <div className={styles.graphCard}>
                <h4>🌡 Température (°C)</h4>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={measurements}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="captured_at"
                            tickFormatter={(tick: string | number) =>
                                new Date(tick).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                            }
                        />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(label: string | number) =>
                                `Heure: ${new Date(label).toLocaleTimeString()}`
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#ff7300"
                            name="Température"
                            dot={{ r: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Graphique Humidité */}
            <div className={styles.graphCard}>
                <h4>💧 Humidité (%)</h4>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={measurements}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="captured_at"
                            tickFormatter={(tick: string | number) =>
                                new Date(tick).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                            }
                        />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(label: string | number) =>
                                `Heure: ${new Date(label).toLocaleTimeString()}`
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="humidity"
                            stroke="#1f77b4"
                            name="Humidité"
                            dot={{ r: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
