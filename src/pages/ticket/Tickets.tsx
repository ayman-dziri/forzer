import React from "react";
import TicketList from "../../components/ticket/TicketList";
import styles from "./Tickets.module.css";

const Tickets: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Tickets ouverts</h1>
            <div>
                <TicketList />
            </div>
        </div>
    );
};

export default Tickets;
