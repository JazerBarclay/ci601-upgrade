// Import database connection
const db = require("../../database/dbConnection");

// Database CREATE, READ, UPDATE, DELETE (CRUD) operations
module.exports = {
    // Select all members
    selectAllMembers: (callBack) => {
        db.query(`SELECT * FROM members;`, [], (error, results, fields) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },

    selectMemberById: (memberId, callBack) => {
        db.query(
            `
            SELECT * FROM members WHERE id = $1;
            `,
            [memberId],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectMemberByName: (memberName, callBack) => {
        db.query(
            `
            SELECT * FROM members
            WHERE first_name LIKE $1
            OR last_name LIKE $1
            `,
            ["%" + memberName + "%"],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    insertMember: (
        firstName,
        lastName,
        contactNumber,
        emailAddress,
        grade,
        licensed,
        outstanding,
        contactByEmail,
        primaryContact,
        primaryContactNumber,
        secondaryContact,
        secondaryContactNumber,
        notes,
        callback
    ) => {
        db.query(
            `INSERT INTO members (
                first_name,
                last_name,
                contact_number,
                email_address,
                grade,
                licensed,
                outstanding,
                contact_by_email,
                primary_contact,
                primary_contact_number,
                secondary_contact,
                secondary_contact_number,
                notes
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
            );`,
            [
                firstName,
                lastName,
                contactNumber,
                emailAddress,
                grade,
                licensed,
                outstanding,
                contactByEmail,
                primaryContact,
                primaryContactNumber,
                secondaryContact,
                secondaryContactNumber,
                notes,
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    updateMember: (
        firstName,
        lastName,
        contactNumber,
        emailAddress,
        grade,
        licensed,
        outstanding,
        contactByEmail,
        primaryContact,
        primaryContactNumber,
        secondaryContact,
        secondaryContactNumber,
        notes,
        id,
        callback
    ) => {
        db.query(
            `
            UPDATE members
            SET first_name = $1,
                last_name = $2,
                contact_number = $3,
                email_address = $4,
                grade = $5,
                licensed = $6,
                outstanding = $7,
                contact_by_email = $8,
                primary_contact = $9,
                primary_contact_number = $10,
                secondary_contact = $11,
                secondary_contact_number = $12,
                notes = $13
            WHERE id = $14;
            `,
            [
                firstName,
                lastName,
                contactNumber,
                emailAddress,
                grade,
                licensed,
                outstanding,
                contactByEmail,
                primaryContact,
                primaryContactNumber,
                secondaryContact,
                secondaryContactNumber,
                notes,
                id
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
};
