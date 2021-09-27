import { useCallback, useRef, useState } from 'react';

export const useTimer = () => {
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const pause = useCallback(() => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((t) => t + 1);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);
    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
    }, []);
    const set = useCallback((set: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(set);
    }, []);
    return { time, pause, reset, set };
};
