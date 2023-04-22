require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const fs = require("fs");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
var multer = require('multer');

const app = express();
// app.use(express.json());

/// for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }))


const storage = multer.diskStorage({
   
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

/// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('public'));


app.post("/register",upload.single('image'),  async (req, res) => {

    try {

        const fName = req.body.fName;
        const lName = req.body.lName;
        const email = req.body.email;
        const pass = req.body.pass;
        const image = fs.readFileSync(req.file.path,'base64');

        // console.log(req.body);


        if (!(fName && lName && email && pass && image)) {
            res.status(400).send({ "status": 400, "message": "All fields are required" });
            return;
        }
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            res.status(400).send({ "status": 400, "message": "User already found" })
            return;
        }

        encryptedPass = await bcrypt.hash(pass, 10);

        const user = await User.create({
            fName, lName, email: email.toLowerCase(), pass: encryptedPass, image
        })

        const token = jwt.sign({
            id: user.id, email
        }, process.env.TOKEN_KEY, {
            expiresIn: "2h"
        });

        user.token = token;
        res.status(200).send({ "status": 200, "message": "Successfully registered", "data": user });
        return;

    } catch (err) {
        res.status(500).send({ "status": 500, "message": "Internal Server error" });
        console.log(err);
        return;
    }

})

app.post("/login", upload.single('image'), async (req, res) => {

    try {
        /// get data from user
        const pass = req.body.pass;
        const email = req.body.email;

        /// required data condition
        if (!(email && pass)) {
            res.status(400).send({
                "status": 400, "message": "All fields are required"
            })
            return false;
        }

        /// find user from database
        const user = await User.findOne({ email });

        if (user) {
            jwtToken = jwt.sign(
                { id: user.id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
            user.token = jwtToken;
            if (await bcrypt.compare(pass, user.pass)) {
                res.status(200).json({ "status": 200, "message": "Successfully login", "data": user })
                return false;
            } else {
                res.status(200).send({
                    "status": 400, "message": "Please enter valid password"
                })
                return false;
            }
        } else {
            res.status(400).send({
                "status": 400, "message": "Email is not registered"
            })
            return false;
        }
    } catch (err) {
        res.status(500).send({ "status": 500, "message": "Internal Server error" });
        console.log(err)
    }

})

// Logic goes here

module.exports = app;