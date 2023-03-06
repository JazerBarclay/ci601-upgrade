import { useState } from "react";
import config from "../../config";

import "./MemberForm.css";

const MemberForm = ({
    onSubmitCallback,
    onCancelCallback,
    defaultValues,
    recordId,
}) => {
    const [activeId, setActiveId] = useState(recordId);
    const [firstName, setFirstName] = useState(defaultValues.first_name || "");
    const [lastName, setLastName] = useState(defaultValues.last_name || "");
    const [contactNumber, setContactNumber] = useState(
        defaultValues.contact_number || ""
    );
    const [emailAddress, setEmailAddress] = useState(
        defaultValues.email_address || ""
    );
    const [grade, setGrade] = useState(defaultValues.grade || "");
    const [licensed, setLicensed] = useState(defaultValues.licensed || false);
    const [outstanding, setOutstanding] = useState(
        defaultValues.outstanding || 0
    );
    const [contactByEmail, setContactByEmail] = useState(
        defaultValues.contact_by_email || false
    );
    const [primaryContact, setPrimaryContact] = useState(
        defaultValues.primary_contact || ""
    );
    const [primaryContactNumber, setPrimaryContactNumber] = useState(
        defaultValues.primary_contact_number || ""
    );
    const [secondaryContact, setSecondaryContact] = useState(
        defaultValues.secondary_contact || ""
    );
    const [secondaryContactNumber, setSecondaryContactNumber] = useState(
        defaultValues.secondary_contact_number || ""
    );
    const [notes, setNotes] = useState(defaultValues.notes || "");

    const handleEnterPress = (e) => {
        e.key === "Enter" && e.preventDefault();
    };

    const onFormSubmit = async (evt) => {
        evt.preventDefault();

        const payload = {
            first_name: firstName,
            last_name: lastName,
            contact_number: contactNumber,
            email_address: emailAddress,
            grade: grade,
            licensed: licensed,
            outstanding: outstanding,
            contact_by_email: contactByEmail,
            primary_contact: primaryContact,
            primary_contact_number: primaryContactNumber,
            secondary_contact: secondaryContact,
            secondary_contact_number: secondaryContactNumber,
            notes: notes,
        };

        let requestURI = `${config.SERVER_IP}/members`;
        let requestMethod = "POST";

        if (activeId) {
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
        <form id="membersForm" onSubmit={onFormSubmit}>
            {activeId == null ? (
                <h3>New Member</h3>
            ) : (
                <h3>
                    Update {firstName} {lastName}
                </h3>
            )}

            <label>First Name</label>
            <input
                id="memberFirstName"
                type={"text"}
                required
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Last Name</label>
            <input
                id="memberLastName"
                type={"text"}
                required
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Phone No.</label>
            <input
                id="memberContactNumber"
                type={"text"}
                value={contactNumber}
                onChange={(evt) => setContactNumber(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Grade</label>
            <input
                id="memberGrade"
                type={"text"}
                required
                value={grade}
                onChange={(evt) => setGrade(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Email</label>
            <input
                id="memberEmailAddress"
                type={"text"}
                value={emailAddress}
                onChange={(evt) => setEmailAddress(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Contact by Email</label>
            <input
                id="memberContactByEmail"
                type={"checkbox"}
                defaultChecked={contactByEmail}
                onChange={(evt) => setContactByEmail(evt.target.checked)}
            ></input>

            <label>Outstanding</label>
            <input
                id="memberOutstanding"
                type={"text"}
                disabled
                value={outstanding}
                onChange={(evt) => setOutstanding(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>License?</label>
            <input
                id="memberLicensed"
                type={"checkbox"}
                defaultChecked={licensed}
                onChange={(evt) => setLicensed(evt.target.checked)}
            ></input>

            <h3>Emergency Contacts</h3>

            <label>Primary</label>
            <input
                id="memberFirstName"
                type={"text"}
                value={primaryContact}
                onChange={(evt) => setPrimaryContact(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Number</label>
            <input
                id="memberNumber"
                type={"text"}
                value={primaryContactNumber}
                onChange={(evt) => setPrimaryContactNumber(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Secondary</label>
            <input
                id="memberFirstName"
                type={"text"}
                value={secondaryContact}
                onChange={(evt) => setSecondaryContact(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <label>Number</label>
            <input
                id="memberNumber"
                type={"text"}
                value={secondaryContactNumber}
                onChange={(evt) => setSecondaryContactNumber(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></input>

            <h3 id="notesHeader">Additional Notes</h3>

            <textarea
                id="memberNotes"
                value={notes}
                onChange={(evt) => setNotes(evt.target.value)}
                onKeyDown={handleEnterPress}
            ></textarea>

            <div id="membersFormRibbon" className="ribbon-right">
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

export default MemberForm;
