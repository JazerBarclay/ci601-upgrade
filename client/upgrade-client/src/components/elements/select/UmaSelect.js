import { useEffect } from "react";
import "./UmaSelect.css";

const UmaSelect = ({
    defaultId,
    values,
    idKey,
    valueKey,
    required,
    updateKey,
}) => {
    useEffect(() => {
        if (
            required &&
            (defaultId === null || defaultId === 0 || defaultId === undefined)
        )
            updateKey(1);
    }, [defaultId, values, idKey, valueKey, required, updateKey]);

    const onUpdate = (e) => {
        const index = e.target.options.selectedIndex;
        const id = e.target.options[index].getAttribute("data-id");
        updateKey(id);
    };

    return (
        values && (
            <select
                className="umaSelect"
                defaultValue={
                    required && (defaultId === null || defaultId === 0)
                        ? 0
                        : values.get(defaultId)[valueKey]
                }
                onChange={onUpdate}
                required={required}
            >
                {required || <option value={""} data-id={null} key={0} />}
                {Array.from(values.entries()).map((entry) => {
                    const [key, obj] = entry;
                    return <option
                        value={obj[valueKey]}
                        data-id={obj[idKey]}
                        key={obj[idKey]}
                    >
                        {obj[valueKey]}
                    </option>;
                })}
            </select>
        )
    );
};

export default UmaSelect;
