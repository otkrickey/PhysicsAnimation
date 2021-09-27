import React, { useState } from 'react';
import { CommandTable } from '../CommandTable';
import { DebugTable } from '../DebugTable';
import { useKeyPress } from '../Functions';
import { useTimer } from '../Functions/useTimer';
import Style from '../style.module.scss';

const PPosition = (time: number): { cx: number; cy: number } => {
    const { sqrt } = Math;
    const base = { cx: 1488, cy: 1315 };
    const length = 600 + 600;
    const length1 = 600;
    const length2 = 480;
    const t = [0, 60, 100];
    const s = (time - t[0]) / (t[2] - t[0]);
    const _s = (t[1] - t[0]) / (t[2] - t[0]);
    if (time < t[0]) return base;
    else if (t[0] <= time && time < t[1])
        return {
            cx: base.cx + length * s - length1 * s ** 2,
            cy: base.cy,
        };
    else if (t[1] <= time && time < t[2])
        return {
            cx:
                base.cx +
                length * _s +
                (length2 * (time - t[1])) / (t[2] - t[1]) -
                length1 * _s ** 2 -
                (length1 * sqrt(2) * _s * (time - t[1])) / 100,
            cy: base.cy + 120 * ((time - t[1]) / (t[2] - t[1])) ** 2,
        };
    else
        return {
            cx:
                base.cx +
                length * _s +
                length2 -
                length1 * _s ** 2 -
                (length1 * sqrt(2) * _s * (t[2] - t[1])) / 100,
            cy: base.cy + 120,
        };
};

const display = (time: number, settime: number) => {
    if (time < settime) return 'none';
    else return undefined;
};

export const Question4_4 = () => {
    const [speed, setSpeed] = useState(0);
    const { time, pause, reset, set } = useTimer();
    useKeyPress('Space', pause);
    useKeyPress('KeyS', pause);
    useKeyPress('KeyR', reset);
    useKeyPress('KeyQ', () => setSpeed((s) => s + 1));
    useKeyPress('KeyA', () => setSpeed((s) => s - 1));
    useKeyPress('KeyZ', () => setSpeed(0));
    useKeyPress('Digit1', reset);
    useKeyPress('Digit2', () => {
        reset();
        pause();
    });
    useKeyPress('Digit3', () => set(175));
    return (
        <div className={Style.AnimationContainer}>
            <DebugTable
                options={{
                    time: time,
                    speed: (2 ** speed).toPrecision(5),
                }}
            />
            <CommandTable
                options={{
                    '1': '初期状態',
                    '2': '小物体Pの運動',
                    '3': '小物体Pの運動後',
                    q: 'スピードアップ',
                    a: 'スピードダウン',
                    z: 'スピードリセット',
                    r: 'タイマーリセット',
                    s: 'タイマースタート',
                }}
            />
            <h1 className={Style.Title}>問4-4</h1>
            <svg
                className={Style.SVG}
                viewBox='0 0 4096 2755'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g opacity='0.3'>
                    <rect
                        x='1488'
                        y='1345'
                        width='480'
                        height='120'
                        fill='#222222'
                        stroke='white'
                        strokeWidth='3'
                    />
                    <circle
                        {...PPosition(time * 2 ** speed)}
                        r='30'
                        stroke='white'
                        strokeWidth='3'
                        fill='#FF0000'
                    />
                </g>
                <g display={display(time * 2 ** speed, 55)}>
                    <circle
                        {...PPosition(55)}
                        r='30'
                        stroke='white'
                        strokeWidth='3'
                        fill='#FF0000'
                    />
                </g>
                <g display={display(time * 2 ** speed, 55)}>
                    <path
                        d='M1966.5 1313C1965.4 1313 1964.5 1313.9 1964.5 1315C1964.5 1316.1 1965.4 1317 1966.5 1317V1313ZM2117.91 1316.41C2118.7 1315.63 2118.7 1314.37 2117.91 1313.59L2105.19 1300.86C2104.41 1300.08 2103.14 1300.08 2102.36 1300.86C2101.58 1301.64 2101.58 1302.91 2102.36 1303.69L2113.67 1315L2102.36 1326.31C2101.58 1327.09 2101.58 1328.36 2102.36 1329.14C2103.14 1329.92 2104.41 1329.92 2105.19 1329.14L2117.91 1316.41ZM1966.5 1317H2116.5V1313H1966.5V1317Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );
};
