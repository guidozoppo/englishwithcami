import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
    const [events, setEvents] = useState([]);

    const handleSelectSlot = ({ start }) => {
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        setEvents((prev) => [...prev, { title: "Turno", start, end }]);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Calendario de Turnos</h1>

            <Calendar
                localizer={localizer}
                events={events}
                selectable
                onSelectSlot={handleSelectSlot}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                defaultView={Views.MONTH}
                step={30}
                timeslots={2}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
            />
        </div>
    );
}
