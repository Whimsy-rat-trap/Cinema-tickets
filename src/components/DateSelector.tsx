import React, { useEffect, useRef } from 'react';
import { getAvailableDates } from '../utils/dates';
import { brutalistEntrance, brutalistHover, brutalistHoverOut, brutalistClick } from '../utils/animations';

interface Props {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

const DateSelector: React.FC<Props> = ({ selectedDate, onDateChange }) => {
    const dates = getAvailableDates();
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        buttonsRef.current.forEach((btn, idx) => {
            if (btn) brutalistEntrance(btn, 300 + idx * 30);
        });
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        brutalistHover(e.currentTarget);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        brutalistHoverOut(e.currentTarget);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, date: string) => {
        brutalistClick(e.currentTarget);
        onDateChange(date);
    };

    return (
        <div className="date-selector">
            <h3>ВЫБЕРИТЕ ДАТУ</h3>
            <div className="date-buttons">
                {dates.map((date, i) => (
                    <button
                        key={date}
                        ref={el => buttonsRef.current[i] = el}
                        className={`brutalist-button ${date === selectedDate ? 'active' : ''}`}
                        onClick={(e) => handleClick(e, date)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {date}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DateSelector;