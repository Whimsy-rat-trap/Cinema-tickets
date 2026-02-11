import React, { useEffect, useRef } from 'react';
import { SESSIONS, isPastDateTime } from '../utils/dates';
import { SessionTime } from '../types';
import { brutalistEntrance, brutalistHover, brutalistHoverOut, brutalistClick } from '../utils/animations';

interface Props {
    selectedDate: string;
    selectedSession: SessionTime;
    onSessionChange: (session: SessionTime) => void;
}

const SessionSelector: React.FC<Props> = ({
                                              selectedDate,
                                              selectedSession,
                                              onSessionChange,
                                          }) => {
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    // Анимация появления кнопок
    useEffect(() => {
        buttonsRef.current.forEach((btn, idx) => {
            if (btn) brutalistEntrance(btn, 500 + idx * 50);
        });
    }, [selectedDate]); // перезапуск анимации при смене даты

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        brutalistHover(e.currentTarget);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        brutalistHoverOut(e.currentTarget);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, session: SessionTime) => {
        brutalistClick(e.currentTarget);
        onSessionChange(session); // Всегда вызываем даже для архивных
    };

    return (
        <div className="session-selector">
            <h3>ВЫБЕРИТЕ СЕАНС</h3>
            <div className="session-buttons">
                {SESSIONS.map((session, i) => {
                    const isPast = isPastDateTime(selectedDate, session);
                    return (
                        <button
                            key={session}
                            ref={el => buttonsRef.current[i] = el}
                            className={`brutalist-button ${session === selectedSession ? 'active' : ''} ${isPast ? 'archived' : ''}`}
                            onClick={(e) => handleClick(e, session)}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {session}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SessionSelector;