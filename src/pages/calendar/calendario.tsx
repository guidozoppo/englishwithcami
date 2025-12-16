import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import './calendar.css';
import { useEffect, useState } from 'react';

export default function CalendarView() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div className='calendar-wrapper'>
            <FullCalendar
                plugins={[timeGridPlugin, googleCalendarPlugin]}
                initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}

                googleCalendarApiKey="AIzaSyCXGTmKPdrnHRsrcA_tEU9jUeray23iWM0"
                events={{
                    googleCalendarId: '528fd9554ec162c3b7cd3399ed4cb4849922a07b310ac109b1a8017a2dc1621f@group.calendar.google.com',
                }}

                slotMinTime="07:00:00"
                slotMaxTime="20:00:00"
                slotDuration="01:00:00"
                slotLabelInterval="01:00"

                allDaySlot={false}
                locale="es"
                height={600}
                expandRows={true}
                editable={false}
                selectable={false}
                eventDisplay="block"

                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                }}

                eventClick={(info) => {
                    info.jsEvent.preventDefault();
                }}

                eventContent={(e) => {
                    const isMobile = window.innerWidth < 768;
                    console.log(e)

                    if (isMobile) {
                        return (
                            <div style={{ fontSize: '11px', textAlign: 'center' }}>
                                Ocupado
                            </div>
                        );
                    }

                    return (
                        <div style={{ fontSize: '12px', textAlign: 'center' }}>
                            {e.timeText && (
                                <>
                                    {e.timeText}
                                    <br />
                                </>
                            )}
                            <span>Ocupado</span>
                            {/*  Ocupado */}
                        </div>
                    );
                }}

                titleFormat={isMobile ? { year: 'numeric', month: 'short', day: 'numeric' } : { year: 'numeric', month: 'long' }}
                dayHeaderFormat={isMobile ? { weekday: 'long' } : { weekday: 'long', day: 'numeric' }}



                eventColor="#e53935"
                eventTextColor="#ffffff"
                eventBackgroundColor="#e53935"

                hiddenDays={[0, 6]}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}



            />
            <p style={{ marginTop: 8, fontSize: 14, textAlign: 'center', fontWeight: 'bolder' }}>
                Los espacios en blanco indican horarios disponibles.
            </p>
        </div>

    );
}
