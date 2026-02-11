import { BookingData } from '../types';
import {getAvailableDates, getDefaultSeats, SESSIONS} from './dates';

const STORAGE_KEY = 'cinema_bookings';

export const loadBookings = (): BookingData => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse stored bookings', e);
        }
    }
    // Если ничего нет – создаём пустую структуру для всех дат и сеансов
    const initial: BookingData = {};
    const dates = getAvailableDates();
    dates.forEach(date => {
        initial[date] = {};
        SESSIONS.forEach(session => {
            initial[date][session] = getDefaultSeats();
        });
    });
    return initial;
};

export const saveBookings = (bookings: BookingData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};