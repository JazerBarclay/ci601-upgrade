import { useState } from "react";
import Table from "../../../components/tables/Table";

const LessonList = () => {
    const [lessonTypes, setLessonTypes] = useState(new Map());
    const [lessons, setLessons] = useState(new Map());
    const [activeId, setActiveId] = useState(null);

    return (
        <main>
            <h1>Attendance - Lessons</h1>
            {lessons && (
                <Table
                    headings={["Lesson Type", "Date", "Start Time", "End Time"]}
                    rows={Array.from(lessons, ([id, data]) => [
                        id,
                        lessonTypes.get(data.type).type_name,
                        data.lesson_date.split("T")[0],
                        data.start_time.split(".")[0],
                        data.end_time.split(".")[0],
                    ])}
                    recordCallback={(id) => {
                        if (
                            activeId === 0 ||
                            activeId === null ||
                            activeId === undefined
                        ) {
                            // setFormDefaultValues(lessons.get(id));
                            setActiveId(id);
                        }
                    }}
                />
            )}
        </main>
    );
};

export default LessonList;
