import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useKeyPress } from '../Functions';
import Style from '../style.module.scss';

const pages = [
    { title: '問1', link: 'Question1' },
    { title: '問2', link: 'Question2' },
    { title: '問3-1', link: 'Question3-1' },
    { title: '問3-2', link: 'Question3-2' },
    { title: '問3-3', link: 'Question3-3' },
    { title: '問3-4', link: 'Question3-4' },
    { title: '問4-1', link: 'Question4-1' },
    { title: '問4-2', link: 'Question4-2' },
    { title: '問4-3', link: 'Question4-3' },
    { title: '問4-4', link: 'Question4-4' },
    { title: '問4-5', link: 'Question4-5' },
    { title: '問6', link: 'Question6' },
    { title: '問7', link: 'Question7' },
    { title: '問8', link: 'Question8' },
];

const Switch = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);
    useEffect(() => {
        history.push(pages[page].link);
    }, [page, history]);
    useKeyPress('ArrowLeft', () => setPage((page) => (page > 0 ? page - 1 : pages.length - 1)));
    useKeyPress('ArrowRight', () => setPage((page) => (page < pages.length - 1 ? page + 1 : 0)));
    return (
        <ul className={Style.Tabs}>
            {pages.map((item, key) => (
                <li
                    className={Style.Tab}
                    key={key}
                    id={key === page ? Style.Tab_Active : undefined}
                >
                    <Link className={Style.TabLink} to={item.link} onClick={() => setPage(key)}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Switch;
