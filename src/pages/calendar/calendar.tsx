import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { useState } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import BookingModal from "./BookingModal";

// CONFIG REACT BIG CALENDAR
const locales = { es };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const availableHoursByDay: Record<number, string[]> = {
    1: ["10:00", "11:00", "12:00", "13:00"],
    2: ["08:00", "09:00", "10:00", "11:00"],
    3: ["15:00", "16:00"],
    4: [], // no atiende
    5: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    6: [],
    0: [],
};

function isOverlapping(start: Date, end: Date, events: any[]) {
    return events.some((ev) => start < new Date(ev.end) && end > new Date(ev.start));
}

export default function CalendarView() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState(Views.MONTH);

    const handleSelectSlot = (slotInfo: any) => {
        console.log
        if (currentView === Views.MONTH) {
            const day = slotInfo.start;
            setSelectedSlot({ start: new Date(day), end: new Date(day) });
        } else {
            setSelectedSlot({
                start: slotInfo.start,
                end: slotInfo.end,
            });
        }
        setModalOpen(true);
    };

    const handleConfirm = (slot: any) => {
        if (isOverlapping(slot.start, slot.end, events)) {
            alert("El turno se superpone con otro ya reservado.");
            return;
        }

        setEvents((prev) => [
            ...prev,
            {
                start: slot.start,
                end: slot.end,
                title: slot.description || "Turno reservado",
            },
        ]);
    };

    const availableHours =
        selectedSlot?.start ? availableHoursByDay[selectedSlot.start.getDay()] : [];

    return (
        <div className="p-4">
            <Calendar
                localizer={localizer}
                events={events}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                defaultView={Views.MONTH}
                selectable
                onView={(v) => setCurrentView(v)}
                onSelectSlot={handleSelectSlot}
                style={{ height: "80vh" }}
            />

            <BookingModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                slot={selectedSlot}
                onConfirm={handleConfirm}
                availableHours={availableHours}
            />
        </div>
    );
}
