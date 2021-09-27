import { useCallback, useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string, onPress?: () => void) => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);
    const downHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.code === targetKey) {
                e.preventDefault();
                setKeyPressed(true);
                if (onPress) onPress();
            }
        },
        [targetKey, onPress],
    );
    const upHandler = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();
            if (e.code === targetKey) setKeyPressed(false);
        },
        [targetKey],
    );
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [downHandler, upHandler]);
    return keyPressed;
};
