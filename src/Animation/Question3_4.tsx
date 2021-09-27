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
    const length = 300;
    const t = [0, 100, 137.5];
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
    const length = 60;
    const t = [0, 100, 137.5];
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

export const Question3_4 = () => {
    const [speed, setSpeed] = useState(0);
    const { time, pause, reset, set } = useTimer();
    const [display2, setDisplay2] = useState(false);
    useKeyPress('Space', pause);
    useKeyPress('KeyS', pause);
    useKeyPress('KeyR', reset);
    useKeyPress('KeyQ', () => setSpeed((s) => s + 1));
    useKeyPress('KeyA', () => setSpeed((s) => s - 1));
    useKeyPress('KeyZ', () => setSpeed(0));
    useKeyPress('Digit1', () => {
        reset();
        setDisplay2(false);
    });
    useKeyPress('Digit2', () => {
        reset();
        pause();
        setDisplay2(false);
    });
    useKeyPress('Digit3', () => {
        set(137.5);
        setDisplay2(false);
    });
    useKeyPress('Digit4', () => {
        set(137.5);
        setDisplay2(true);
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
                    '3': '台B上での摩擦力',
                    '4': '台Bにかかる合計の力',
                    q: 'スピードアップ',
                    a: 'スピードダウン',
                    z: 'スピードリセット',
                    r: 'タイマーリセット',
                    s: 'タイマースタート',
                }}
            />
            <h1 className={Style.Title}>問3-4</h1>
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
                <g display={display(time * 2 ** speed, 137.5)}>
                    <path
                        d='M1786 1344C1786 1345.1 1786.9 1346 1788 1346C1789.1 1346 1790 1345.1 1790 1344H1786ZM1789.41 1252.59C1788.63 1251.8 1787.37 1251.8 1786.59 1252.59L1773.86 1265.31C1773.08 1266.09 1773.08 1267.36 1773.86 1268.14C1774.64 1268.92 1775.91 1268.92 1776.69 1268.14L1788 1256.83L1799.31 1268.14C1800.09 1268.92 1801.36 1268.92 1802.14 1268.14C1802.92 1267.36 1802.92 1266.09 1802.14 1265.31L1789.41 1252.59ZM1790 1344V1254H1786V1344H1790Z'
                        fill='white'
                    />
                    <path
                        d='M1788 1339.99C1789.1 1339.99 1790 1339.1 1790 1337.99C1790 1336.89 1789.1 1335.99 1788 1335.99V1339.99ZM1726.59 1336.58C1725.8 1337.36 1725.8 1338.63 1726.59 1339.41L1739.31 1352.14C1740.09 1352.92 1741.36 1352.92 1742.14 1352.14C1742.92 1351.35 1742.92 1350.09 1742.14 1349.31L1730.83 1337.99L1742.14 1326.68C1742.92 1325.9 1742.92 1324.63 1742.14 1323.85C1741.36 1323.07 1740.09 1323.07 1739.31 1323.85L1726.59 1336.58ZM1788 1335.99H1728V1339.99H1788V1335.99Z'
                        fill='white'
                    />
                    <path
                        d='M1788 1347.99C1786.9 1347.99 1786 1348.89 1786 1349.99C1786 1351.1 1786.9 1351.99 1788 1351.99V1347.99ZM1849.41 1351.41C1850.2 1350.63 1850.2 1349.36 1849.41 1348.58L1836.69 1335.85C1835.91 1335.07 1834.64 1335.07 1833.86 1335.85C1833.08 1336.63 1833.08 1337.9 1833.86 1338.68L1845.17 1349.99L1833.86 1361.31C1833.08 1362.09 1833.08 1363.35 1833.86 1364.14C1834.64 1364.92 1835.91 1364.92 1836.69 1364.14L1849.41 1351.41ZM1788 1351.99H1848V1347.99H1788V1351.99Z'
                        fill='white'
                    />
                    <path
                        d='M1883 1465C1883 1466.1 1883.9 1467 1885 1467C1886.1 1467 1887 1466.1 1887 1465H1883ZM1886.41 1313.59C1885.63 1312.8 1884.37 1312.8 1883.59 1313.59L1870.86 1326.31C1870.08 1327.09 1870.08 1328.36 1870.86 1329.14C1871.64 1329.92 1872.91 1329.92 1873.69 1329.14L1885 1317.83L1896.31 1329.14C1897.09 1329.92 1898.36 1329.92 1899.14 1329.14C1899.92 1328.36 1899.92 1327.09 1899.14 1326.31L1886.41 1313.59ZM1887 1465V1315H1883V1465H1887Z'
                        fill='white'
                    />
                    <path
                        d='M1885 1467C1886.1 1467 1887 1466.1 1887 1465C1887 1463.9 1886.1 1463 1885 1463V1467ZM1823.59 1463.59C1822.8 1464.37 1822.8 1465.63 1823.59 1466.41L1836.31 1479.14C1837.09 1479.92 1838.36 1479.92 1839.14 1479.14C1839.92 1478.36 1839.92 1477.09 1839.14 1476.31L1827.83 1465L1839.14 1453.69C1839.92 1452.91 1839.92 1451.64 1839.14 1450.86C1838.36 1450.08 1837.09 1450.08 1836.31 1450.86L1823.59 1463.59ZM1885 1463H1825V1467H1885V1463Z'
                        fill='white'
                    />
                </g>
                <g display={display2 ? undefined : 'none'}>
                    <path
                        d='M1951 1402.5C1949.62 1402.5 1948.5 1403.62 1948.5 1405C1948.5 1406.38 1949.62 1407.5 1951 1407.5V1402.5ZM2132.77 1406.77C2133.74 1405.79 2133.74 1404.21 2132.77 1403.23L2116.86 1387.32C2115.88 1386.35 2114.3 1386.35 2113.32 1387.32C2112.35 1388.3 2112.35 1389.88 2113.32 1390.86L2127.46 1405L2113.32 1419.14C2112.35 1420.12 2112.35 1421.7 2113.32 1422.68C2114.3 1423.65 2115.88 1423.65 2116.86 1422.68L2132.77 1406.77ZM1951 1407.5H2131V1402.5H1951V1407.5Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );
};
