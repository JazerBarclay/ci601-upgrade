import { useEffect } from "react";
import "./UmaDate.css";

const UmaDate = ({ defaultDate, updateDate }) => {
    useEffect(() => {
        if (defaultDate === null || defaultDate === undefined)
            updateDate(new Date().toJSON().slice(0, 10));
    }, [defaultDate, updateDate]);

    const handleEnterPress = (e) => {
        e.key === "Enter" && e.preventDefault();
    };

    return (
        <input
            type="date"
            defaultValue={defaultDate || new Date().toJSON().slice(0, 10)}
            onChange={(e) => {
                updateDate(e.target.value);
            }}
            onKeyDown={handleEnterPress}
        />
    );
};

export default UmaDate;
