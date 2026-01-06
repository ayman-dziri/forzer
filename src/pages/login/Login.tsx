import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import styles from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const success = login(email, password);
        if (success) {
            navigate("/");
        } else {
            setError("Identifiants invalides ❌");
        }
    };

    return (
        <div className={styles.container}>
            <h2>🔐 Connexion</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Se connecter</button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
