const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const { userModel } = require('./mongo');


mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('connected to database') })
    .catch(err => { console.log(err) });
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello User Welcome to our site!')
})
app.post('/register', (req, res) => {
    const user = req.body;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send('server error')
        }
        else {
            userModel.find({ email: user.email }, (err, data) => {
                if (err) { console.log(err) }
                else if (data.length === 0) {
                    userModel.create({ ...user, password: hash }, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('server error')
                        }
                    })
                } else {
                    res.status(401).send('user exist')
                }
            })
        }
    })

})

app.post('/login', (req, res) => {
    const user = req.body;
    userModel.find({ email: user.email }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err.message)
        }
        else if (data.length === 0) {
            res.status(401).send('user not found please register')
        }
        else {
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if (err) { console.log(err) }
                else if (result) {
                    console.log(data[0])
                    const userInfo = {
                        email: data[0].email,
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        Address: data[0].Address,
                        phone: data[0].phone
                    }
                    jwt.sign(userInfo, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, resp) => {
                        if (err) { console.log(err) }
                        else {
                            res.status(200).send(resp)
                        }
                    })
                }
            })
        }
    })

})
const checkToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}
app.get('/profile', checkToken, (req, res) => {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})