// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all members
    selectAllMembers: (callBack) => {
        db.query(`SELECT * FROM members_view;`, [], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },

    selectMemberById: (id, callBack) => {
        db.query(
            `
            SELECT * FROM members_view WHERE id = $1;
            `,
            [id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectMemberByName: (member_name, callBack) => {
        db.query(
            `
            SELECT * FROM members_view
            WHERE first_name LIKE $1
            OR last_name LIKE $1
            `,
            ["%" + member_name + "%"],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectTotalMembers: (callBack) => {
        db.query(
            `
            SELECT COUNT(*) as members FROM members;
            `,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectTotalSignupsToday: (callBack) => {
        db.query(
            `
            SELECT COUNT(*) as signups 
            FROM members 
            WHERE signup_date = current_date + INTERVAL '1 day';
            `,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectTotalSignupsWeek: (callBack) => {
        // Today's offset from Monday
        let dayOfWeek = new Date().getDay();

        // Fix for Sunday which is 0
        dayOfWeek = (dayOfWeek === 0 ? 7 : dayOfWeek);

        // Offset => Mon 1, Tue, 2 ... Sun 7

        // Set start of week date
        const startOfWeekDate = new Date(
            new Date().setDate(new Date().getDate() - dayOfWeek + 1))
                .toISOString()
                .split("T")[0];

        db.query(
            `
            SELECT COUNT(*) as signups 
            FROM members 
            WHERE signup_date >= $1 
            AND signup_date <= current_date + INTERVAL '1 day';
            `,
            [startOfWeekDate],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectTotalSignupsMonth: (callBack) => {

        // Get todays date
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // Split year, month and day
        const arr = today.split('-');

        // Reconstruct with 1st of month
        const beginningOfMonth = `${arr[0]}-${arr[1]}-01`;

        db.query(
            `
            SELECT COUNT(*) as signups 
            FROM members 
            WHERE signup_date >= $1 
            AND signup_date <= current_date + INTERVAL '1 day';
            `,
            [beginningOfMonth],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    selectTotalSignupsYear: (callBack) => {

        // Get todays date
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // Split year, month and day
        const arr = today.split('-');

        // Reconstruct with 1st of year
        const beginningOfYear = `${arr[0]}-01-01`;

        db.query(
            `
            SELECT COUNT(*) as signups 
            FROM members 
            WHERE signup_date >= $1 
            AND signup_date <= current_date + INTERVAL '1 day';
            `,
            [beginningOfYear],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    insertMember: (
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
            ) RETURNING id;`,
            [
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
                notes,
            ],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    updateMember: (
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
                notes,
                id,
            ],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
};
