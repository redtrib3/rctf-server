const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs');
const crypto = require('crypto');

const router = express.Router();

const { FlagsTbl, ChallengesTbl, ProjectsTbl } = require('../models');

const validateFlag = require('../middleware/flagValidation');

function sha256sum(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
}

function filePathExists(filepath) {
    const absPath = path.resolve(filepath);
    return fs.existsSync(absPath);
}


router.get('/download/:fileName', (req, res) => {
    const fileName = path.basename(req.params.fileName);
    const reqFile = path.join(__dirname, '../files/', fileName);

    // Check if the requested file is within the intended directory
    const relative = path.relative(path.join(__dirname, '../files/'), reqFile);
    if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
        if (fs.existsSync(reqFile)) {
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.sendFile(reqFile);
        } else {
            res.status(404).json({ success: false });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid file path' });
    }
});


router.get('/challenges', async (req, res) => {
    try {
        const challs = await ChallengesTbl.find();
        res.status(200).json(challs);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Database error'});
    }
});


router.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectsTbl.find({});
        res.status(200).json(projects);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Database error'});
    }
});


router.post('/submit-flag', validateFlag, async (req, res) => {

    const flagSign = sha256sum(req.flag);

    try {

        const flagExists = await FlagsTbl.findOne({ ch_id: req.chal_id, flag_sign: flagSign });

        if (flagExists) {
            return res.json({ challenge_id: req.chal_id, success: true});
        }

        return res.json({ challenge_id: req.chal_id, success: false});

    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error, check back later' , success: false});
    }
});

module.exports = router;
