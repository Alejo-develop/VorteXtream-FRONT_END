export const fadeIn = (position: string) => {
    return {
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: 1,
                delay: 0.1,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
        hidden: {
            y: position === 'bottom' ? -80 : 0,
            x: position === 'right' ? 80 : (position === 'left' ? -80 : 0),
            opacity: 0,
            transition: {
                type: "tween",
                duration: 0.2,
                delay: 0.5,
                ease: [0.25, 0.25, 0.25, 0.25],
            },
        },

    };
}