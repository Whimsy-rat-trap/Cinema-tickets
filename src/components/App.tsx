import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import DateSelector from './DateSelector';
import SessionSelector from './SessionSelector';
import SeatMap from './SeatMap';
import { getAvailableDates, SESSIONS } from '../utils/dates';
import { initDateSession } from '../store/slices/bookingsSlice';
import { brutalistEntrance } from '../utils/animations';
import '../styles.css';
import {SessionTime} from "../types";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = React.useState<string>(getAvailableDates()[7]);
    const [selectedSession, setSelectedSession] = React.useState<SessionTime>(SESSIONS[0]);

    const headerRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(initDateSession({ date: selectedDate, session: selectedSession }));
    }, [selectedDate, selectedSession, dispatch]);

    useEffect(() => {
        if (headerRef.current) brutalistEntrance(headerRef.current, 100);
        if (containerRef.current) brutalistEntrance(containerRef.current, 200);
    }, []);

    return (
        <div className="app" ref={containerRef}>
            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <SessionSelector
                selectedDate={selectedDate}
                selectedSession={selectedSession}
                onSessionChange={setSelectedSession}
            />
            <SeatMap date={selectedDate} session={selectedSession} />
        </div>
    );
};

export default App;