// Import database connection
const db = require('../../database/dbConnection')

// Database CREATE, READ, UPDATE, DELETE (CRUD) operations
module.exports = {

    // Select all members
    selectAllMembers: (callBack) => {
        db.query(
            `SELECT * FROM members;`,
            [],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectMemberById: (memberId, callBack) => {
        db.query(
            `
            SELECT * FROM members WHERE id = $1;
            `,
            [ memberId ],
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
            OR middle_names LIKE $1
            OR last_name LIKE $1
            OR nickname LIKE $1;
            `,
            [ '%'+memberName+'%'],
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    insertMember: (
        firstName, middleNames, lastName, 
        nickname, dob, contactNumber, altNumber, 
        emailAddress, contactByEmail, callback) => 
    {
        db.query(
            `INSERT INTO members (
                first_name,
                middle_names,
                last_name,
                nickname,
                date_of_birth,
                contact_number,
                alt_number,
                email_address,
                contact_by_email
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            );`,
            [
                firstName, 
                middleNames, 
                lastName, 
                nickname,
                dob,
                contactNumber,
                altNumber,
                emailAddress,
                contactByEmail
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    updateMember: (
        firstName, middleNames, lastName, 
        nickname, dob, contactNumber, altNumber, 
        emailAddress, contactByEmail, member_id, callback) => 
    {
        db.query(
            `
            UPDATE members
            SET first_name = $1,
                middle_names = $2,
                last_name = $3,
                nickname = $4,
                date_of_birth = $5,
                contact_number = $6,
                alt_number = $7,
                email_address = $8,
                contact_by_email = $9
            WHERE id = $10;
            `,
            [
                firstName, 
                middleNames, 
                lastName, 
                nickname,
                dob,
                contactNumber,
                altNumber,
                emailAddress,
                contactByEmail,
                member_id
            ],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

}