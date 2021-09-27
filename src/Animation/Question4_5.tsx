import React, { useState } from 'react';
import { CommandTable } from '../CommandTable';
import { DebugTable } from '../DebugTable';
import { useKeyPress } from '../Functions';
import { useTimer } from '../Functions/useTimer';
import Style from '../style.module.scss';

const PPosition = (time: number): { cx: number; cy: number } => {
    const base = { cx: 1488, cy: 1315 };
    const length = 600 + 600;
    const length1 = 600;
    const t = [0, 20, 100];
    const s = (time - t[0]) / (t[2] - t[0]);
    const _s = (t[1] - t[0]) / (t[2] - t[0]);
    if (time < t[0]) return base;
    else if (t[0] <= time && time < t[1])
        return {
            cx: base.cx + length * s - length1 * s ** 2,
            cy: base.cy,
        };
    else
        return {
            cx: base.cx + length * _s + length1 * _s ** 2,
            cy: base.cy,
        };
};

const display = (time: number, settime: number) => {
    if (time < settime) return 'none';
    else return undefined;
};

export const Question4_5 = () => {
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
            <h1 className={Style.Title}>問4-5</h1>
            <svg
                className={Style.SVG}
                viewBox='0 0 4096 2755'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g>
                    <circle
                        {...PPosition(time * 2 ** speed)}
                        r='30'
                        stroke='white'
                        strokeWidth='3'
                        fill='#FF0000'
                    />
                </g>
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
                        {...PPosition(0)}
                        r='30'
                        stroke='white'
                        strokeWidth='3'
                        fill='#FF0000'
                    />
                </g>
                <g display={display(time * 2 ** speed, 20)}>
                    <path
                        d='M1750 1344C1750 1345.1 1750.9 1346 1752 1346C1753.1 1346 1754 1345.1 1754 1344H1750ZM1753.41 1252.59C1752.63 1251.8 1751.37 1251.8 1750.59 1252.59L1737.86 1265.31C1737.08 1266.09 1737.08 1267.36 1737.86 1268.14C1738.64 1268.92 1739.91 1268.92 1740.69 1268.14L1752 1256.83L1763.31 1268.14C1764.09 1268.92 1765.36 1268.92 1766.14 1268.14C1766.92 1267.36 1766.92 1266.09 1766.14 1265.31L1753.41 1252.59ZM1754 1344V1254H1750V1344H1754Z'
                        fill='white'
                    />
                    <path
                        d='M1752 1339.99C1753.1 1339.99 1754 1339.1 1754 1337.99C1754 1336.89 1753.1 1335.99 1752 1335.99V1339.99ZM1690.59 1336.58C1689.8 1337.36 1689.8 1338.63 1690.59 1339.41L1703.31 1352.14C1704.09 1352.92 1705.36 1352.92 1706.14 1352.14C1706.92 1351.35 1706.92 1350.09 1706.14 1349.31L1694.83 1337.99L1706.14 1326.68C1706.92 1325.9 1706.92 1324.63 1706.14 1323.85C1705.36 1323.07 1704.09 1323.07 1703.31 1323.85L1690.59 1336.58ZM1752 1335.99H1692V1339.99H1752V1335.99Z'
                        fill='white'
                    />
                    <path
                        d='M1752 1317C1753.1 1317 1754 1316.1 1754 1315C1754 1313.9 1753.1 1313 1752 1313V1317ZM1600.59 1313.59C1599.8 1314.37 1599.8 1315.63 1600.59 1316.41L1613.31 1329.14C1614.09 1329.92 1615.36 1329.92 1616.14 1329.14C1616.92 1328.36 1616.92 1327.09 1616.14 1326.31L1604.83 1315L1616.14 1303.69C1616.92 1302.91 1616.92 1301.64 1616.14 1300.86C1615.36 1300.08 1614.09 1300.08 1613.31 1300.86L1600.59 1313.59ZM1752 1313H1602V1317H1752V1313Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );
};
