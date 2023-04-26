const Employee = require("../model/employee");
const Franchise = require("../model/franchise");
const SubFranchise = require("../model/sub_franchise");
const Delivery = require("../model/delivery_boy");
const User = require("../model/user");

const getProfile = async (req, res) => {

    try {

        const { id, user_type } = req.body;

        if (!(id, user_type)) {
            res.status(400).send({ "status": 400, "message": "User Id & user type is required" });
            return;
        }

        const user = await Franchise.findOne({ "_id": id });

        if (user) {
            res.status(400).send({ "status": 400, "message": "Email is already registered" });
            return;
        }

        if (user_type === "Sub Franchise") {

            const sub_franchise = await SubFranchise.find({ '_id': id });
            res.status(200).send({ "status": 200, "message": "Enquiry fetch successfully", "data": sub_franchise });
            return;

        } else if (user_type === "Franchise") {

            const data = await Franchise.find({ "_id": id });
            res.status(200).send({ "status": 200, "message": "Enquiry fetch successfully", "data": data });
            return;

        } else if (user_type === "Employee") {

            const employee = await Employee.find({ "_id": id });
            res.status(200).send({ "status": 200, "message": "Enquiry fetch successfully", "data": employee });
            return;

        } else if (user_type === "User") {
            const allData = await User.find({ "_id": id });
            res.status(200).send({ "status": 200, "message": "Enquiry fetch successfully", "data": allData });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internaml Server error");
        return;
    }

}

module.exports = { getProfile };