import { useEffect, useState } from "react";
import config from "../../../config";
import MemberForm from "./MemberForm";
import Table from "../../../components/tables/Table";

import "./Members.css";
import CardCollection from "../../../components/elements/card/CardCollection";
import Card from "../../../components/elements/card/Card";

const Members = () => {
    const [membersMap, setMembersMap] = useState(new Map());
    const [newMembersCountWeek, setNewMembersCountWeek] = useState(0);
    const [newMembersCountMonth, setNewMembersCountMonth] = useState(0);
    const [newMembersCountYear, setNewMembersCountYear] = useState(0);
    const [activeId, setActiveId] = useState(null);
    const [formDefaultValues, setFormDefaultValues] = useState({});

    const getMembersFromServer = () => {
        fetch(`${config.SERVER_IP}/members`)
            .then((data) => data.json())
            .then((data) => {
                data.members.map((member) => {
                    setMembersMap(new Map(membersMap.set(member.id, member)));
                });
            })
            .catch((err) => {
                setMembersMap(new Map());
                console.err(err);
            });

        fetch(`${config.SERVER_IP}/members/total/week`)
            .then((data) => data.json())
            .then((data) => {
                setNewMembersCountWeek(data.total);
            })
            .catch((err) => {
                setMembersMap(new Map());
                console.err(err);
            });

        fetch(`${config.SERVER_IP}/members/total/month`)
            .then((data) => data.json())
            .then((data) => {
                setNewMembersCountMonth(data.total);
            })
            .catch((err) => {
                setMembersMap(new Map());
                console.err(err);
            });

        fetch(`${config.SERVER_IP}/members/total/year`)
            .then((data) => data.json())
            .then((data) => {
                setNewMembersCountYear(data.total);
            })
            .catch((err) => {
                setMembersMap(new Map());
                console.err(err);
            });
    };

    // Get members from server on component load
    useEffect(() => {
        getMembersFromServer();
    }, []);

    return (
        <main className="membersPage">
            <h1>Members</h1>

            <CardCollection>
                <Card title={"New This Week"} info={`${newMembersCountWeek}`} />
                <Card
                    title={"New This Month"}
                    info={`${newMembersCountMonth}`}
                />
                <Card title={"New This Year"} info={`${newMembersCountYear}`} />
                <Card title={"Total Members"} info={`${membersMap.size}`} />
            </CardCollection>

            {activeId === null && (
                <div className="ribbon-right">
                    <button
                        className="btn"
                        onClick={() => {
                            setActiveId(0);
                            setFormDefaultValues({});
                        }}
                    >
                        Add Member
                    </button>
                </div>
            )}
            {activeId !== null && (
                <>
                    <MemberForm
                        onSubmitCallback={async () => {
                            setActiveId(null);
                            getMembersFromServer();
                        }}
                        onCancelCallback={() => {
                            setActiveId(null);
                        }}
                        defaultValues={formDefaultValues}
                        recordId={activeId}
                    />
                    <hr />
                    <br />
                </>
            )}
            <div className="h-scroll-container">
                <Table
                    headings={[
                        "Full Name",
                        "Licensed",
                        "Grade",
                        "Outstanding",
                        "Contact",
                        "Number",
                    ]}
                    rows={Array.from(membersMap, ([id, data]) => [
                        id,
                        `${data.first_name} ${data.last_name}`,
                        data.licensed ? "Yes" : "No",
                        data.grade,
                        `£ ${data.outstanding}.00`,
                        data.primary_contact,
                        data.primary_contact_number,
                    ])}
                    recordCallback={(id) => {
                        if (
                            activeId === 0 ||
                            activeId === null ||
                            activeId === undefined
                        ) {
                            setActiveId(id);
                            setFormDefaultValues(membersMap.get(id));
                        }
                    }}
                />
            </div>
        </main>
    );
};

export default Members;
