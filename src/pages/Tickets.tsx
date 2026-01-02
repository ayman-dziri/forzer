import React from "react";

import TicketList from "../components/ticket/TicketList";

const Tickets: React.FC = () => {
    return (
        <div>
            <h1>Tickets ouverts</h1>
            <TicketList /> {/* PAS DE tickets={tickets} */}
        </div>
    );
};

export default Tickets;
