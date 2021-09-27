import Style from '../style.module.scss';
const DebugTable = ({ options: obj }: { options: object }) => {
    return (
        <table className={Style.Debug}>
            <thead>
                <tr>
                    <th align='left'>key</th>
                    <th align='left'>value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(obj).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DebugTable;
