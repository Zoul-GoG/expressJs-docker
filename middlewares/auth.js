const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const Token = require('../models/userToken')
// module.exports = (req, res, next) => {
const auth = async (req, res, next) => {
    try{
        if(req.header('Authorization') != null && req.header('Authorization') != ''){
            const token = req.header('Authorization').replace('Bearer ', '');
            // const authorizationToken = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

            // const user = User.findOne({_id: decoded._id, 'tokens.token': token})
            const user = User.findOne({_id: decoded.user_id})
            .then((user) => {
                if(!user) {
                    res.status(401).json({
                        error: 'User not found !'
                        // error: new Error('User not found !')
                    })
                }
                else {
                    Token.findOne({
                        token : token
                    })
                    .then((token) => {
                        if(!token){
                            res.status(401).json({
                                error: 'Inexisting token !'
                                // error: new Error('Inexisting token !')
                            })
                        } else {
                            if(Date.now() > token.expireIn) {
                                res.status(401).json({
                                    error: 'Invalid token !'
                                    // error: new Error('Invalid token !')
                                })    
                            } else {
                                // Tout est OK peut passer
                                req.token = token
                                req.auth = user
                                next()
                            }
                        }
                    })
                    .catch ((e) => {
                        res.status(401).send({
                            error: 'Authentication problem!!'
                        })
                    })
                }
                // req.token
            });

            // const user_id = token.user_id;
        } else {
            res.status(401).json({
                error: "No token"
                // error: new Error('Unauthorized')
            })
    
        }

    } catch {
        res.status(401).json({
            error: "An error occurred"
            // error: new Error('Unauthorized')
        })
    }
}

module.exports = {auth};