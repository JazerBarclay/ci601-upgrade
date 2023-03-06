import { useState, useEffect } from "react";
import Table from "../../../components/tables/Table";
import LessonForm from "../../../components/forms/LessonForm";
import config from "../../../config";

const Lessons = () => {
    const [lessonTypes, setLessonTypes] = useState(new Map());
    const [lessons, setLessons] = useState(new Map());
    const [activeId, setActiveId] = useState(null);
    const [formDefaultValues, setFormDefaultValues] = useState({});

    const getLessonTypesFromServer = async () => {
        let lessonsTable = new Map();

        await fetch(`${config.SERVER_IP}/lessonTypes`)
            .then((data) => data.json())
            .then((data) => {
                data.lesson_types.map((lessonType) => {
                    lessonsTable = new Map(lessonsTable).set(
                        lessonType.id,
                        lessonType
                    );
                    setLessonTypes(lessonsTable);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getLessonsFromServer = async () => {
        let lessonsTable = [];

        if (lessonTypes.size === 0) return;

        await fetch(`${config.SERVER_IP}/lessons`)
            .then((data) => data.json())
            .then((data) => {
                data.lessons.map((lesson) => {
                    setLessons(new Map(lessons.set(lesson.id, lesson)));
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getLessonTypesFromServer();
    }, []);

    useEffect(() => {
        getLessonsFromServer();
    }, [lessonTypes]);

    return (
        <main>
            <h1>Lessons</h1>

            {activeId === null && (
                <div className="ribbon-right">
                    <button
                        className="btn"
                        onClick={() => {
                            setActiveId(0);
                            setFormDefaultValues({});
                        }}
                    >
                        Add Lesson
                    </button>
                </div>
            )}

            {activeId !== null && (
                <>
                    <LessonForm
                        onSubmitCallback={async () => {
                            setActiveId(null);
                            getLessonsFromServer();
                        }}
                        onCancelCallback={() => {
                            setActiveId(null);
                        }}
                        defaultValues={formDefaultValues}
                        recordId={activeId}
                        lessonTypes={lessonTypes}
                    />
                    <hr />
                    <br />
                </>
            )}

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
                            setFormDefaultValues(lessons.get(id));
                            setActiveId(id);
                        }
                    }}
                />
            )}
        </main>
    );
};

export default Lessons;
