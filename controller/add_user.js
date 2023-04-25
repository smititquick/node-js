const User = require("../model/user");
const DeliveryBoy = require("../model/delivery_boy");
const Employee = require("../model/employee");
const Franchise = require("../model/franchise");

const addFranchise = async (req, res, next) => {

    try {

        const { franchise_name, email, mobile, address, state, city } = req.body;

        if (!(franchise_name, email, mobile)) {
            res.status(400).send({ "status": 400, "message": "fill all required field" });
            return;
        }

        const isEmail = await Franchise.findOne({ email });
        const isMobile = await Franchise.findOne({ mobile });

        if (isEmail || isMobile) {
            res.status(400).send({ "status": 400, "message": "Email is already registered" });
            return;
        }

        const franchise = await Franchise.create({
            franchise_name,
            email: email.toLowerCase(),
            mobile,
            address,
            state,
            city,
        })

        res.status(200).send({ "status": 200, "message": "New Franchise added successfully", "data": franchise })
        return;

    } catch (err) {
        res.status(500).send("Internaml Server error");
        return;
    }

}

module.exports = { addFranchise };