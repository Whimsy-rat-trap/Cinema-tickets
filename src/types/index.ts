export type SeatId = string; // "A1", "B5"
export type SeatStatus = 'free' | 'booked';

export interface Seat {
    id: SeatId;
    status: SeatStatus;
}

export type SessionTime = '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00';

export interface BookingData {
    [date: string]: { // "YYYY-MM-DD"
        [session in SessionTime]?: Seat[];
    };
}

export interface AppState {
    bookings: BookingData;
    selectedDate: string | null;
    selectedSession: SessionTime | null;
}