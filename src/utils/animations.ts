import anime from 'animejs';

// entrance
export const brutalistEntrance = (
    targets: anime.AnimeParams['targets'],
    delay = 0
) => {
    anime({
        targets,
        opacity: [0, 1],
        translateY: [-50, 0],
        rotate: ['-5deg', '0deg'],
        boxShadow: [
            '0 0 0 rgba(0,0,0,0)',
            '8px 8px 0 rgba(0,0,0,0.25)',
        ],
        delay,
        duration: 800,
        easing: 'easeOutElastic(1, .5)',
    });
};

// hover
export const brutalistHover = (target: HTMLElement) => {
    anime({
        targets: target,
        scale: 1.05,
        translateX: -2,
        translateY: -2,
        boxShadow: '12px 12px 0 rgba(0,0,0,0.3)',
        duration: 200,
        easing: 'easeOutQuad',
    });
};

export const brutalistHoverOut = (target: HTMLElement) => {
    anime({
        targets: target,
        scale: 1,
        translateX: 0,
        translateY: 0,
        boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
        duration: 200,
        easing: 'easeOutQuad',
    });
};

// Клик (click) вдавливание
export const brutalistClick = (target: HTMLElement) => {
    anime({
        targets: target,
        scale: 0.95,
        translateX: 2,
        translateY: 2,
        boxShadow: '4px 4px 0 rgba(0,0,0,0.4)',
        duration: 100,
        easing: 'easeOutQuad',
        complete: () => {
            anime({
                targets: target,
                scale: 1,
                translateX: 0,
                translateY: 0,
                boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
                duration: 100,
                easing: 'easeOutQuad',
            });
        },
    });
};

// Анимация для мест
export const brutalistSeatEntrance = (targets: anime.AnimeParams['targets']) => {
    anime({
        targets,
        opacity: [0, 1],
        scale: [0.7, 1],
        rotate: ['-10deg', '0deg'],
        boxShadow: [
            '0 0 0 rgba(0,0,0,0)',
            '4px 4px 0 rgba(0,0,0,0.3)',
        ],
        delay: anime.stagger(15),
        duration: 600,
        easing: 'easeOutBack(1.2)',
    });
};

export const brutalistSeatClick = (target: HTMLElement) => {
    anime({
        targets: target,
        scale: [1, 0.9, 1],
        rotate: ['0deg', '-3deg', '0deg'],
        boxShadow: [
            '4px 4px 0 rgba(0,0,0,0.3)',
            '2px 2px 0 rgba(0,0,0,0.5)',
            '4px 4px 0 rgba(0,0,0,0.3)',
        ],
        duration: 300,
        easing: 'easeOutQuad',
    });
};