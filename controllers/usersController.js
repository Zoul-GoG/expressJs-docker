const Token = require('../models/userToken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken')

exports.store = (req, res) => {
    // console.log(req)
    const user = new User(req.body)

    user.password = bcrypt.hashSync(user.password)

    user.save().then((user) => {


        const retour = {
            // message : 'Connected succesfully',
            token : jwt.sign(
                {
                    user_id : user._id
                },
                'RANDOM_TOKEN_SECRET'
                , {
                    expiresIn : '168h'  //  Une semaine
                }
            )
        }

        // registrement du token en bdd
        const token = new Token({
            token : retour.token,
            user_id : user._id,
        })

        token.save().then((user) => {
            res.status(200).send(retour)
        })
        .catch((error) => {
            res.send(error.message)
        })


        // res.status(200).send({
        //     user : user
        //     // token : jwt.sign({user_id : user_})
        // })

    }).catch((err) => {
        res.send(err.message)
    })
}

exports.login = (req, res) => {
    User.findOne({email : req.body.email})
    .then((user) => {
        if(!user){
            res.status(404).send({message : 'Not found'})
        }
        else {
            if(bcrypt.compareSync(req.body.password, user.password))
            {
                // res.status(200).send({
                //     message : 'Connected succesfully',
                //     token : jwt.sign(
                //         {
                //             user_id : user._id
                //         },
                //         'RANDOM_TOKEN_SECRET'
                //         , {
                //             expiresIn : '10s'
                //         }
                //     )
                // })
                const retour = {
                    // message : 'Connected succesfully',
                    token : jwt.sign(
                        {
                            user_id : user._id
                        },
                        'RANDOM_TOKEN_SECRET'
                        , {
                            expiresIn : '168h'  //  Une semaine
                        }
                    )
                }
                const token = new Token({
                    token : retour.token,
                    user_id : user._id,
                })

                token.save().then((user) => {
                    res.status(200).send(retour)
                })
                .catch((error) => {
                    res.send(error.message)
                })

            } else {
                res.status(401).send({message : 'Wrong password'})
            }
        }
    })
}

exports.index = (req, res) => {
    User.find()
    .then(users => {
        res.send(users)
    })
    .catch(err => {
        res.status(500).send('Error : ' + err.message)
    })
}

exports.show = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send('Error ' + err.message)
    })
}

exports.delete = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(user != null) {
            user.delete()
            res.send(user)    
        } else {
            res.status(404).send('Not found')
        }
    })
    .catch(err => {
        res.status(500).send('Error ' + err.message)
    })
}

exports.update = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(user != null) {
            if(req.body.password){
                req.body.password = bcrypt.hashSync(req.body.password)
            }
            user.update(req.body)
            .then(() => {
                User.findById(req.params.id)
                .then(user => {
                    res.send(user)
                })
            })
            .catch(err => {
                res.status(500).send('Error ' + err.message)
            })
        } else {
            res.status(404).send('Not found')
        }
    })
    .catch(err => {
        res.status(500).send('Error ' + err.message)
    })
}