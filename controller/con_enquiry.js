const Enquiry = require('../model/employee');

const addEnquiry = async (req, res) => {
    try {

        const { name, email, subject, message, user_id, user_type } = req.body;

        if (!(name, email, subject, message, user_id, user_type)) {
            res.status(400).send({ "status": 400, "message": "fill all required field" });
            return;
        }

    } catch (err) {
        res.status(500).send("Internal Server error");
        return;
    }
}