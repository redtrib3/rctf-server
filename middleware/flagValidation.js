/*
    Validates if flag match required format using regular expression.
*/

function flagValidationMWARE(req, res, next){
    const { chal_id, flag } = req.body;

    const re = new RegExp("^(rctf|glitch)\{[a-zA-Z0-9!@_$.]{1,45}\}$");
    const match = re.test(flag);

    if (match) {
        req.flag = flag;
        req.chal_id = chal_id;

        next();
        return
    }

    res.json({challenge_id: chal_id, success: false});
}

module.exports = flagValidationMWARE;
