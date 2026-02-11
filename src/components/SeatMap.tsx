import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { RootState } from '../store';
import { toggleSeat } from '../store/slices/bookingsSlice';
import { SessionTime, Seat } from '../types';
import { isPastDateTime } from '../utils/dates';
import { brutalistSeatEntrance, brutalistSeatClick } from '../utils/animations';

interface Props {
    date: string;
    session: SessionTime;
}

const SeatMap: React.FC<Props> = ({ date, session }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const seats = useSelector((state: RootState) => state.bookings[date]?.[session]) || [];
    const isPast = isPastDateTime(date, session);
    const seatsRef = useRef(seats);

    useEffect(() => {
        seatsRef.current = seats;
    }, [seats]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const rows = ['A', 'B', 'C', 'D', 'E'];
        const cols = 8;

        // Формируем полный набор мест (A1..E8)
        const fullSeats: Seat[] = [];
        rows.forEach(row => {
            for (let i = 1; i <= cols; i++) {
                const id = `${row}${i}`;
                const existing = seatsRef.current.find(s => s.id === id);
                fullSeats.push(existing || { id, status: 'free' });
            }
        });

        // Группировка по рядам
        const seatsByRow: Record<string, Seat[]> = {};
        rows.forEach(row => (seatsByRow[row] = []));
        fullSeats.forEach(seat => seatsByRow[seat.id[0]].push(seat));

        // Полная очистка контейнера
        d3.select(container).html('');

        // Построение сетки через D3
        rows.forEach(rowLetter => {
            const rowDiv = d3.select(container)
                .append('div')
                .attr('class', 'seat-row');

            const rowSeats = seatsByRow[rowLetter];
            rowSeats.forEach(seat => {
                const seatDiv = rowDiv
                    .append('div')
                    .attr('class', `seat ${seat.status}`)
                    .attr('data-id', seat.id)
                    .text(seat.id);

                if (!isPast) {
                    seatDiv.on('click', function(event) {
                        event.stopPropagation();
                        const target = event.currentTarget;
                        const seatId = target.getAttribute('data-id')!;
                        const newStatus = target.classList.contains('free') ? 'booked' : 'free';

                        // Анимация клика
                        brutalistSeatClick(target);

                        // Меняем классы — цвет подхватится из CSS
                        target.classList.remove('free', 'booked');
                        target.classList.add(newStatus);

                        dispatch(toggleSeat({ date, session, seatId }));
                    });
                }
            });
        });

        // Анимация появления мест
        const seatElements = container.querySelectorAll('.seat');
        brutalistSeatEntrance(seatElements);

    }, [date, session]); // только дата и сессия

    return (
        <div className="seat-map">
            <h3>СХЕМА ЗАЛА</h3>
            {isPast && (
                <p style={{
                    color: '#fff',
                    background: '#333',
                    padding: '8px',
                    border: '4px solid black',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}>
                    🚫 АРХИВ — ТОЛЬКО ПРОСМОТР
                </p>
            )}
            <div ref={containerRef} className="seat-grid-container" />
        </div>
    );
};

export default SeatMap;