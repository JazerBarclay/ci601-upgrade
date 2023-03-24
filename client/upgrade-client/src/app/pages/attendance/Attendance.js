import config from "../../../config";
import { useEffect, useState } from "react";
import UmaSelect from "../../../components/elements/select/UmaSelect";
import Table from "../../../components/tables/Table";
import "./Attendance.css";
import CardCollection from "../../../components/elements/card/CardCollection";
import Card from "../../../components/elements/card/Card";

const Attendance = ({ lessonTypes, purchaseTypes, lessonPricing }) => {
    const [lessons, setLessons] = useState(new Map());
    const [selectedType, setSelectedType] = useState(null);
    const [members, setMembers] = useState(new Map());
    const [attendance, setAttendance] = useState(new Map());
    const [memberTokens, setMemberTokens] = useState(new Map());

    const [activeLessonId, setActiveLessonId] = useState(null);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [purchaseType, setPurchaseType] = useState(null);
    const [lessonPrice, setLessonPrice] = useState(0);

    const [noPayment, setNoPayment] = useState(false);
    const [confirmPayment, setConfirmPayment] = useState(false);

    const getLessonsFromServer = async () => {
        if (lessonTypes.size === 0) return;

        await fetch(`${config.SERVER_IP}/lessons`)
            .then((data) => data.json())
            .then((data) => {
                data.lessons.map((lesson) => {
                    setLessons(new Map(lessons.set(lesson.id, lesson)));
                });
                setActiveLessonId(lessons.entries().next().value[0]);
                setSelectedType(lessons.entries().next().value[1].type_id);

                for (const [key, value] of lessonPricing) {
                    if (
                        value.lesson_type_id ===
                            lessons.entries().next().value[1].type_id &&
                        value.lesson_purchase_type_id === 1
                    ) {
                        setLessonPrice(value.price);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getMembersFromServer = () => {
        if (lessonTypes.size === 0) return;

        fetch(`${config.SERVER_IP}/members`)
            .then((data) => data.json())
            .then((data) => {
                data.members.map((member) => {
                    setMembers(new Map(members.set(member.id, member)));
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAttendanceForLessonId = (id) => {
        if (lessonTypes.size === 0 || id === null) return;

        fetch(`${config.SERVER_IP}/attendance/lesson/${id}`)
            .then((data) => data.json())
            .then((data) => {
                if (data.message) {
                    setAttendance(new Map());
                    return;
                }

                let map = new Map();
                data.attendees.map((att) => {
                    map = new Map(map.set(att.member_id, att));
                });
                setAttendance(map);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getMemberTokensById = () => {
        if (selectedMemberId === 0 || selectedMemberId === null) {
            return;
        }

        fetch(`${config.SERVER_IP}/tokens/member/${selectedMemberId}`)
            .then((data) => data.json())
            .then((data) => {
                if (data.message) {
                    setMemberTokens(new Map());
                    return;
                }

                let map = new Map();
                data.active_tokens.map((token) => {
                    map = new Map(map.set(token.id, token));
                });
                setMemberTokens(map);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const validateMemberTokenForLesson = () => {
        let validTokenId = null;

        for (const [key, data] of memberTokens) {
            if (
                data.lesson_type_id === null ||
                data.lesson_type_id ===
                    lessons.get(parseInt(activeLessonId)).type_id
            ) {
                validTokenId = key;
                continue;
            }
        }

        if (!validTokenId) return null;
        return validTokenId;
    };

    const purchaseLesson = async (
        memberId,
        lessonTypeId,
        purchaseTypeId,
        paymentMethodId,
        total
    ) => {
        let payload = {
            member_id: parseInt(memberId),
            lesson_type_id: lessonTypeId,
            purchase_type_id: 1,
            payment_method_id: paymentMethodId,
            total: total,
        };

        let requestURI = `${config.SERVER_IP}/lessonPurchases`;
        let requestMethod = "POST";

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

        if (responseStatus === 200 || responseStatus === 201) {
            getMemberTokensById(selectedMemberId);
        } else console.log(responseStatus);
    };

    const attendLesson = async (lesson, member, token) => {
        let payload = {
            member_id: member,
        };

        if (token) payload.token_id = token;

        let requestURI = `${config.SERVER_IP}/attendance/lesson/${lesson}`;
        let requestMethod = "POST";

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

        if (responseStatus == 200 || responseStatus == 201) {
            if (token) memberTokens.delete(token);
            getAttendanceForLessonId(lesson);
        } else 
            console.log(responseStatus);
    };

    const onAddClicked = (evt) => {
        evt.preventDefault();

        setNoPayment(false);
        setConfirmPayment(false);

        if (activeLessonId === null || activeLessonId === 0) return;
        if (selectedMemberId === null || selectedMemberId === 0) return;

        let token = validateMemberTokenForLesson();
        if (token) {
            // Attend (token)
            attendLesson(activeLessonId, selectedMemberId, token);
            return;
        }
        
        setNoPayment(true);
    };

    const onPayNowClicked = (evt) => {
        evt.preventDefault();

        setConfirmPayment(true);
        
        setNoPayment(false);
    };

    const onPayLaterClicked = (evt) => {
        evt.preventDefault();
        
        attendLesson(activeLessonId, selectedMemberId);
        
        setNoPayment(false);
    };

    const onFreeLessonClicked = (evt) => {
        evt.preventDefault();
        
        purchaseLesson(
            selectedMemberId,
            parseInt(selectedType),
            purchaseType,
            1,
            0
        );
        
        setNoPayment(false);
    };

    const onNoPaymentFoundCancelClicked = (evt) => {
        evt.preventDefault();
        setNoPayment(false);
    };

    const onPaidCashClicked = (evt) => {
        evt.preventDefault();
        purchaseLesson(
            selectedMemberId,
            parseInt(selectedType),
            purchaseType,
            1,
            lessonPrice
        );
        
        setConfirmPayment(false);
    };

    const onPaidCardClicked = (evt) => {
        evt.preventDefault();
        purchaseLesson(
            selectedMemberId,
            parseInt(selectedType),
            purchaseType,
            2,
            lessonPrice
        );

        setConfirmPayment(false);
    };

    const onConfirmPurchaseCancelClicked = (evt) => {
        evt.preventDefault();
        setConfirmPayment(false);
    };

    useEffect(() => {
        if (lessonTypes) getMembersFromServer();
    }, [lessonTypes]);

    useEffect(() => {
        if (members) getLessonsFromServer();
    }, [members])

    useEffect(() => {
        if (activeLessonId) getAttendanceForLessonId(activeLessonId);
    }, [activeLessonId]);

    useEffect(() => {
        if (selectedMemberId) getMemberTokensById();
    }, [selectedMemberId]);

    return (
        <main>
            <h1>Attendance</h1>

            {lessons && attendance && activeLessonId && (<CardCollection>
                <Card title={"Type"} info={`${lessonTypes.get(parseInt(lessons.get(activeLessonId).type_id)).name}`} />
                <Card title={"Date"} info={`${lessons.get(activeLessonId).date.split('T')[0]}`} />
                <Card title={"Time"} info={`${lessons.get(activeLessonId).start_time} - ${lessons.get(activeLessonId).end_time}`} />
                <Card title={"Attending"} info={`${attendance.size}`} />
            </CardCollection>)}

            <div>
                <form
                    id="attendanceForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <label>Lesson:</label>
                    {lessons.size > 0 && (
                        <UmaSelect
                            defaultId={lessons.entries().next().value[0]}
                            idKey={"id"}
                            valueKey={"display_text"}
                            values={lessons}
                            updateKey={(id) => {
                                setConfirmPayment(false);
                                setNoPayment(false);
                                setSelectedType(
                                    lessons.get(parseInt(id)).type_id
                                );
                                setActiveLessonId(parseInt(id));
                                for (const [key, value] of lessonPricing) {
                                    if (
                                        value.lesson_type_id ===
                                            lessons.get(parseInt(id)).type_id &&
                                        value.lesson_purchase_type_id === 1
                                    ) {
                                        setPurchaseType(parseInt(key));
                                        setLessonPrice(value.price);
                                    }
                                }
                            }}
                            required
                        />
                    )}

                    <label>Member:</label>
                    {members.size > 0 && (
                        <UmaSelect
                            defaultId={0}
                            idKey={"id"}
                            valueKey={"display_name"}
                            values={members}
                            updateKey={(id) => {
                                setConfirmPayment(false);
                                setNoPayment(false);
                                if (id !== 0) setSelectedMemberId(id);
                            }}
                        />
                    )}

                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={onAddClicked}
                        disabled={
                            selectedMemberId == 0 ||
                            selectedMemberId == null ||
                            attendance.has(parseInt(selectedMemberId))
                        }
                    >
                        Add Member
                    </button>

                    <UmaSelect defaultId={1} idKey={"id"} valueKey="name" />
                </form>

                {noPayment && (
                    <div id="attendance-payment-form">
                        <h2>No Payment Found</h2>
                        <button onClick={onPayNowClicked}>
                            Pay Now
                        </button>
                        <button onClick={onPayLaterClicked}>
                            Pay Later
                        </button>
                        <button onClick={onFreeLessonClicked}>
                            Free Lesson
                        </button>
                        <button onClick={onNoPaymentFoundCancelClicked}>
                            Cancel
                        </button>
                    </div>
                )}

                {confirmPayment && (
                    <div id="attendance-confirm-payment">
                        <h2>Purchase Lesson</h2>
                        <p>
                            Lesson:{" "}
                            {lessonTypes.get(parseInt(selectedType)).name}
                        </p>
                        <p>
                            Sessions:{" "}
                            {purchaseTypes.size > 0 &&
                                purchaseTypes.entries().next().value[1].name}
                        </p>
                        <p>Price: £{(lessonPrice / 100).toFixed(2)}</p>

                        <button onClick={onPaidCashClicked}>Paid Cash</button>
                        <button onClick={onPaidCardClicked}>Paid Card</button>
                        <button
                            onClick={onConfirmPurchaseCancelClicked}
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {attendance && activeLessonId && members && (
                    <Table
                        headings={["Member Name", "Time"]}
                        rows={Array.from(attendance, ([id, data]) => [
                            id,
                            members.get(data.member_id).display_name,
                            data.attendance_date.split("T")[1].split(".")[0],
                        ])}
                        recordCallback={(id) => {}}
                    />
                )}
            </div>
        </main>
    );
};
export default Attendance;
