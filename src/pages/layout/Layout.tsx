import {ReactNode} from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "./Layout.module.css";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
    return (
        <div className={styles.layout}>
            {/* Sidebar Fixe */}
            <aside className={styles.sidebar}>
                <h2>Frozer</h2>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/sensors">Capteurs</Link></li>
                        <li><Link to="/alerts">Alertes</Link></li>
                        <li><Link to="/tickets">Tickets</Link></li>
                        <li><Link to="/audit">Audit Logs</Link></li>
                        <li><Link to="/exports">Exports</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className={styles.main}>
                <header className={styles.navbar}>
                    <h1>Frozer Dziri Aouissi</h1>
                </header>

                {/* Wrapper pour le contenu défilant */}
                <div className={styles.contentWrapper}>
                    <main className={styles.content}>
                        <Outlet /> {/* Ici s'affichent les pages */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
