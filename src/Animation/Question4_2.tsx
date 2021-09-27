import React, { useState } from 'react';
import { CommandTable } from '../CommandTable';
import { DebugTable } from '../DebugTable';
import { useKeyPress } from '../Functions';
import { useTimer } from '../Functions/useTimer';
import Style from '../style.module.scss';

const PPosition = (time: number): { cx: number; cy: number } => {
    const { sin, cos, PI } = Math;
    const base = { cx: 1038, cy: 865 };
    const radius = 450;
    const length = 600;
    const t = [0, 100, 175];
    if (time < t[0]) return base;
    else if (t[0] <= time && time < t[1])
        return {
            cx: base.cx + radius * (1 - cos(((time - t[0]) * PI) / ((t[1] - t[0]) * 2))),
            cy: base.cy + radius * sin(((time - t[0]) * PI) / ((t[1] - t[0]) * 2)),
        };
    else if (t[1] <= time && time < t[2])
        return {
            cx: base.cx + radius + (length * (time - t[1])) / (t[2] - t[1]),
            cy: base.cy + radius,
        };
    else
        return {
            cx: base.cx + radius + length,
            cy: base.cy + radius,
        };
};
const BPosition = (time: number): { x: number; y: number } => {
    const base = { x: 1488, y: 1345 };
    const length = 120;
    const t = [0, 100, 175];
    if (time < t[1]) return base;
    else if (t[1] <= time && time < t[2])
        return {
            x: base.x + (length * (time - t[1])) / (t[2] - t[1]),
            y: base.y,
        };
    else
        return {
            x: base.x + length,
            y: base.y,
        };
};

const display = (time: number, settime: number) => {
    if (time < settime) return 'none';
    else return undefined;
};

export const Question4_2 = () => {
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
            <h1 className={Style.Title}>問4-2</h1>
            <svg
                className={Style.SVG}
                viewBox='0 0 4096 2755'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <rect
                    y='1825'
                    width='4096'
                    height='200'
                    fill='#222222'
                    stroke='white'
                    strokeWidth='3'
                />
                <text
                    x='2048'
                    y='1925'
                    fill='white'
                    fontSize='100'
                    textAnchor='middle'
                    dominantBaseline='central'
                >
                    床
                </text>
                <circle
                    cx='3012'
                    cy='1765'
                    r='59.5'
                    fill='#222222'
                    stroke='white'
                    strokeWidth='3'
                />
                <path
                    d='M1143.5 1765C1143.5 1797.86 1116.86 1824.5 1084 1824.5C1051.14 1824.5 1024.5 1797.86 1024.5 1765C1024.5 1732.14 1051.14 1705.5 1084 1705.5C1116.86 1705.5 1143.5 1732.14 1143.5 1765Z'
                    fill='#222222'
                    stroke='white'
                    strokeWidth='3'
                />
                <path
                    d='M3328 1705V1465H768V1705H3328Z'
                    fill='#222222'
                    stroke='white'
                    strokeWidth='3'
                />
                <path
                    d='M1008 865H888V1465H1488V1345C1424.97 1345 1362.55 1332.58 1304.31 1308.46C1246.08 1284.34 1193.16 1248.98 1148.59 1204.41C1104.02 1159.84 1068.66 1106.92 1044.54 1048.69C1020.42 990.452 1008 928.035 1008 865Z'
                    fill='#222222'
                    stroke='white'
                    strokeWidth='3'
                />
                <rect
                    {...BPosition(time * 2 ** speed)}
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
                <g display={display(time * 2 ** speed, 175)}>
                    <path
                        d='M2088 1313C2086.9 1313 2086 1313.9 2086 1315C2086 1316.1 2086.9 1317 2088 1317V1313ZM2239.41 1316.41C2240.2 1315.63 2240.2 1314.37 2239.41 1313.59L2226.69 1300.86C2225.91 1300.08 2224.64 1300.08 2223.86 1300.86C2223.08 1301.64 2223.08 1302.91 2223.86 1303.69L2235.17 1315L2223.86 1326.31C2223.08 1327.09 2223.08 1328.36 2223.86 1329.14C2224.64 1329.92 2225.91 1329.92 2226.69 1329.14L2239.41 1316.41ZM2088 1317H2238V1313H2088V1317Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );
};
