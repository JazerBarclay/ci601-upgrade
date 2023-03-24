import { useState } from "react";
import config from "../../../config";
import UmaDate from "../../../components/elements/date/UmaDate";
import UmaSelect from "../../../components/elements/select/UmaSelect";

import "./LessonForm.css";

const LessonForm = ({
    onSubmitCallback,
    onCancelCallback,
    defaultValues,
    recordId,
    lessonTypes
}) => {

    // console.log(defaultValues)
    const [activeId, setActiveId] = useState(recordId);
    const [defaultType, setDefaultType] = useState(defaultValues.type_id || 1);
    const [lessonType, setLessonType] = useState(defaultValues.type_id || 1);
    const [lessonDate, setLessonDate] = useState(
        defaultValues.lesson_date ? defaultValues.lesson_date.substr(0,10) : new Date().toJSON().slice(0, 10)
    );
    const [lessonStartTime, setLessonStartTime] = useState(defaultValues.start_time ? defaultValues.start_time.substr(0,5) : "16:30");

    const [lessonEndTime, setLessonEndTime] = useState(defaultValues.end_time ? defaultValues.end_time.substr(0,5) : "17:30");


    const handleEnterPress = (e) => {
        e.key === "Enter" && e.preventDefault();
    };

    const onFormSubmit = async (evt) => {
        evt.preventDefault();

        const payload = {
            lesson_type: lessonType,
            date: lessonDate,
            start_time: lessonStartTime,
            end_time: lessonEndTime,
        };

        console.log(payload)

        let requestURI = `${config.SERVER_IP}/lessons`;
        let requestMethod = "POST";

        if (activeId) {
            console.log(activeId)
            requestURI = `${requestURI}/${activeId}`;
            requestMethod = "PATCH";
        }

        const request = new Request(requestURI, {
            method: requestMethod,
            body: JSON.stringify(payload),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        let responseStatus = null;
        try {
            const res = await fetch(request);
            responseStatus = res.status;
        } catch (error) {
            console.log(error);
        }

        if (responseStatus === 200 || responseStatus === 201)
            onSubmitCallback();

    };

    const onFormCancel = (evt) => {
        evt.preventDefault();
        setActiveId(null);
        onCancelCallback();
    };

    return (
        <form id="lessonsForm" onSubmit={onFormSubmit}>
            {activeId == null ? <h3>New Lesson</h3> : <h3>Update Lesson</h3>}

            <label>Lesson Type</label>
            
            <UmaSelect
                defaultId={defaultType}
                idKey={"id"}
                valueKey={"name"}
                values={lessonTypes}
                updateKey={(id) => {
                    setLessonType(id);
                }}
                required
            />

            <label>Start Time</label>
            <input
                type="time"
                defaultValue={lessonStartTime}
                onChange={e => setLessonStartTime(e.target.value)}
                onKeyDown={handleEnterPress}
            />

            <label>Date</label>
            <UmaDate
                defaultDate={lessonDate}
                updateDate={setLessonDate}
                onKeyDown={handleEnterPress}
            />

            <label>End Time</label>
            <input
                type="time"
                defaultValue={lessonEndTime}
                onChange={e => setLessonEndTime(e.target.value)}
                onKeyDown={handleEnterPress}
            />

            <div id="lessonsFormRibbon" className="ribbon-right">
                <button className="btn" onClick={onFormCancel}>
                    Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    {activeId ? "Update" : "Add"}
                </button>
            </div>
        </form>
    );
};

export default LessonForm;
