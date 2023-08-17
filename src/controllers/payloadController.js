
const createPayload = async function (req, res) {
    try {
        const data = req.body
        let { str } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Object must not be empty" });
        }

        if (!str) return res.status(400).send({ status: false, message: "str is required" })

        const regex = str.match(/\b\w+\b/g);

        if (regex && regex.length >= 8) {
            res.status(200).send('200 OK');
        } else {
            res.status(406).send('Not Acceptable');
        }


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createPayload = createPayload