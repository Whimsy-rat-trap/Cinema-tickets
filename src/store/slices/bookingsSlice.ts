import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingData, SessionTime } from '../../types';
import { loadBookings, saveBookings } from '../../utils/localStorage';
import { getDefaultSeats } from '../../utils/dates';

const initialState: BookingData = loadBookings();

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        toggleSeat: (
            state,
            action: PayloadAction<{
                date: string;
                session: SessionTime;
                seatId: string;
            }>
        ) => {
            const { date, session, seatId } = action.payload;
            // Проверка на архивность выполняется на уровне компонента, здесь только изменение
            if (state[date] && state[date][session]) {
                const seats = state[date][session]!;
                const seat = seats.find(s => s.id === seatId);
                if (seat && seat.status === 'free') {
                    seat.status = 'booked';
                } else if (seat && seat.status === 'booked') {
                    seat.status = 'free';
                }
                // Сохраняем в localStorage после каждого изменения
                saveBookings(state);
            }
        },

        initDateSession: (
            state,
            action: PayloadAction<{ date: string; session: SessionTime }>
        ) => {
            const { date, session } = action.payload;
            if (!state[date]) {
                state[date] = {};
            }
            if (!state[date][session]) {
                state[date][session] = getDefaultSeats();
                saveBookings(state);
            }
        },
    },
});

export const { toggleSeat, initDateSession } = bookingsSlice.actions;
export default bookingsSlice.reducer;