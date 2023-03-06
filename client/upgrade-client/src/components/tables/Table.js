import "./Table.css";

const Table = ({ headings, rows, recordCallback }) => {
    return (
        <table className="contentTable">
            <thead>
                <tr>
                    {headings &&
                        headings.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {rows &&
                    Array.from(rows.entries()).map((entry) => {
                        const [key, row] = entry;
                        return (
                            <tr key={row[0]} onClick={() => recordCallback(row[0])}>
                            {row.slice(1).map((item, itemIndex) => (
                                <td key={itemIndex}>{item}</td>
                            ))}
                        </tr>
                        )
                    })}

 
            </tbody>
        </table>
    );
};

export default Table;
