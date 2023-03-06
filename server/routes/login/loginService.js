// Import database connection
const db = require('../../database/dbConnection')

module.exports = {

    // Return all rows where email and password match
    verifyLogin: (username, callBack) => {
        db.query(
            `SELECT * FROM users WHERE username = $1;`,
            [username],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }

}