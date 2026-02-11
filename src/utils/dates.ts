import {Seat, SessionTime} from "../types";

export const SESSIONS: SessionTime[] = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

export const getAvailableDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = -7; i <= 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
    }
    return dates;
};

export const isPastDateTime = (date: string, session: SessionTime): boolean => {
    const now = new Date();
    const [hours, minutes] = session.split(':').map(Number);
    const sessionDateTime = new Date(date);
    sessionDateTime.setHours(hours, minutes, 0, 0);
    return sessionDateTime < now;
};

export const getDefaultSeats = (): Seat[] => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const seatsPerRow = 8;
    const seats: Seat[] = [];
    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            seats.push({ id: `${row}${i}`, status: 'free' });
        }
    });
    return seats;
};