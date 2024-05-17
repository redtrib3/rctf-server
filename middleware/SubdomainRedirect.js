const express = require('express');
const app = express();

const hostname = process.env.HOSTNAME

function redirectChallenges(req, res, next) {
    if (req.hostname === `challenges.${hostname}`) {
        return res.redirect(301, `https://${hostname}/challenges`);
    }
    next();
}


module.exports = redirectChallenges;
