/*  Extra endpoints to be used for challenges if needed:
    Flag validation for Reversing challenge: Obsecurity
*/

const express = require('express');
const app = express();

const router = express.Router();

const OBSECURITY_FLAG = process.env.OBSECURITY_FLAG; // REV CHALLENGE


// Obsecurity chall - password validation endpoint /extras/obsecurity?p=
router.get('/obsecurity', async (req, res) => {
    const user_pass = req.query.p;

    try {
        if (user_pass === process.env.OBSECURITY_PASS) {
            return res.json({ success: true, flag: FLAG });
        }

        return res.json({ success: false });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Cannot validate flags right now."})
    }


});


module.exports = router;
