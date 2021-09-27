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
    const t = [0, 100];
    if (time < t[0]) return base;
    else if (t[0] <= time && time < t[1])
        return {
            cx: base.cx + radius * (1 - cos(((time - t[0]) * PI) / ((t[1] - t[0]) * 2))),
            cy: base.cy + radius * sin(((time - t[0]) * PI) / ((t[1] - t[0]) * 2)),
        };
    else
        return {
            cx: base.cx + radius,
            cy: base.cy + radius * sin(PI / 2),
        };
};

const display = (time: number, settime: number) => {
    if (time < settime) return 'none';
    else return undefined;
};

export const Question7 = () => {
    const [speed, setSpeed] = useState(0);
    const { time, pause, reset } = useTimer();
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
                    q: 'スピードアップ',
                    a: 'スピードダウン',
                    z: 'スピードリセット',
                    r: 'タイマーリセット',
                    s: 'タイマースタート',
                }}
            />
            <h1 className={Style.Title}>問7</h1>
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
                <circle
                    {...PPosition(time * 2 ** speed)}
                    r='30'
                    stroke='white'
                    strokeWidth='3'
                    fill='#FF0000'
                />
                <g display={display(time * 2 ** speed, 100)}>
                    <path
                        d='M1488 1313C1486.9 1313 1486 1313.9 1486 1315C1486 1316.1 1486.9 1317 1488 1317V1313ZM1639.41 1316.41C1640.2 1315.63 1640.2 1314.37 1639.41 1313.59L1626.69 1300.86C1625.91 1300.08 1624.64 1300.08 1623.86 1300.86C1623.08 1301.64 1623.08 1302.91 1623.86 1303.69L1635.17 1315L1623.86 1326.31C1623.08 1327.09 1623.08 1328.36 1623.86 1329.14C1624.64 1329.92 1625.91 1329.92 1626.69 1329.14L1639.41 1316.41ZM1488 1317H1638V1313H1488V1317Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );
};
