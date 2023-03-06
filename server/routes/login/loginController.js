// Import jwt
var jwt = require('jsonwebtoken');

// Import bcrypt for salt + hash
const bcrypt = require ('bcrypt');

// Import modules from register service
const { verifyLogin } = require('./loginService')

module.exports = {
    
    // Validate user input via post request
    validateParams: (req, res, next) => {
        // If any field is missing or blank return 400 error
        if (!req.body.username || !req.body.password)
            return res.status(400).json({ error: "missing params" })
        // else call next
        return next()
    },

    // Check if email and pass match in database
    login: (req, res, next) => {
        //bcrypt.hash(req.body.password, 5, function(err, hash){ if (!err) return res.status(200).json({pass: hash}) })
        verifyLogin(req.body.username, (err, response) => {
            if (err) return res.status(500).json({err})
            if (response.rows.length < 1) return res.status(401).json({ error: "incorrect username or password" })
            bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                if (err) return res.status(500).json({err})
                if (!result) return res.status(500).json({err})
                req.id = response.rows[0].user_id
                return next()
            });
            
        })
    },
    
    // Issue token to user
    issueLoginToken: (req, res) => {
        var token = jwt.sign(
            { id: req.id }, 
            'secret', 
            { expiresIn: '24h' });
        return res.status(200).json({ token })
    },

    // Takes in an encoded token and returns the decoded object
    verifyToken: (req, res) => {
        jwt.verify(req.headers.authorization.slice(7), 'secret', function(err, decoded) {
            if (err) return res.status(400).json({ message: "invalid" })
            return res.status(200).json()
        });
    },

    // Takes in an encoded token and returns the decoded object
    renewToken: (req, res) => {
        jwt.verify(req.headers.authorization.slice(7), 'secret', function(err, decoded) {
            if (err) return res.status(400).json({ message: "invalid" })
            req.id=decoded.id
            var token = jwt.sign(
                { id: req.id }, 
                'secret', 
                { expiresIn: '24h' });
            return res.status(200).json({ token })
        });
    },

    encryptPassword: (req, res) => {
        bcrypt.hash(req.body.password, 5, function(err, hash){
            if (!err) return res.status(200).json({pass: hash})
            else return res.status(400).json({err: 'error'});
        })

    }


}
