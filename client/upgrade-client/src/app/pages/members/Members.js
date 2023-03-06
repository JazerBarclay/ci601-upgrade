import { useEffect, useState } from "react";
import config from "../../../config";
import MemberForm from "../../../components/forms/MemberForm";
import Table from "../../../components/tables/Table";

import "./Members.css";

const Members = () => {
    const [membersMap, setMembersMap] = useState(new Map());
    const [activeId, setActiveId] = useState(null);
    const [formDefaultValues, setFormDefaultValues] = useState({});

    const getMembersFromServer = async () => {
        await fetch(`${config.SERVER_IP}/members`)
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
    };

    // Get members from server on component load
    useEffect(() => {
        getMembersFromServer();
    }, []);

    return (
        <main className="membersPage">
            <h1>Members</h1>
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
