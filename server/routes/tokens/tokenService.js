// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all tokens
    selectAllActiveTokens: (callback) => {
        db.query(
            `SELECT * FROM tokens_view LIMIT 1000;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all active tokens
    selectAllActiveTokens: (callback) => {
        db.query(
            `SELECT * FROM tokens_active_view LIMIT 1000;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all active tokens
    selectAllActiveTokensByUser: (id, callback) => {
        db.query(
            `SELECT * FROM tokens_active_view WHERE member_id = $1;`,
            [id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all active tokens
    selectNextActiveTokensByUser: (id, callback) => {
        db.query(
            `SELECT * FROM tokens_active_view WHERE activation_date <= $1 AND expiration_date >= $1 AND member_id = $2 LIMIT 1;`,
            [new Date().toISOString().split('T')[0], id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select token by id
    selectTokenById: (id, callback) => {
        db.query(
            `SELECT * FROM tokens_active_view WHERE id = $1;`,
            [id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Insert new token
    insertToken: (
        member_id,
        lesson_type_id,
        lesson_purchase_id,
        activation_date,
        expiration_date,
        callback
    ) => {
        db.query(
            `INSERT INTO tokens (
                member_id,
                lesson_type_id,
                lesson_purchase_id,
                activation_date,
                expiration_date
            ) VALUES (
                $1, $2, $3, $4, $5
            ) RETURNING id;`,
            [
                member_id,
                lesson_type_id,
                lesson_purchase_id,
                activation_date,
                expiration_date,
            ],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Insert free signup token
    insertFreeToken: (member_id, callback) => {
        let nextYear = new Date();
        nextYear.setDate(new Date().getDate() + 365);
        let strNextYear = nextYear.toISOString().split('T')[0];
        db.query(
            `INSERT INTO tokens (
                member_id,
                expiration_date
            ) VALUES (
                $1, $2
            ) RETURNING id;`,
            [member_id, strNextYear],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Insert deferred token
    insertDeferToken: (
        member_id,
        lesson_type_id,
        activation_date,
        expiration_date,
        callback
    ) => {
        db.query(
            `INSERT INTO tokens (
                member_id,
                lesson_type_id,
                activation_date,
                expiration_date
            ) VALUES (
                $1, $2, $3, $4
            ) RETURNING id;`,
            [
                member_id,
                lesson_type_id,
                activation_date,
                expiration_date,
            ],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    spendToken: (token_id, callback) => {
        db.query(
            `UPDATE tokens
            SET used = true
            WHERE id = $1;`,
            [
                token_id
            ],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

};
