/*
    Route to define redirects to new path for old paths.
*/

const express = require('express');
const router = express.Router();

const redirections = [
  { oldPath: '/static/writeups/annie.html', newPath: '/annie-tryhackme' },
  { oldPath: '/static/writeups/committed.html', newPath: '/committed-tryhackme' },
  { oldPath: '/static/writeups/capture.html', newPath: '/capture-writeup' },
  { oldPath: '/static/writeups/creative.html', newPath: '/creative-writeup' },
  { oldPath: '/static/writeups/jeff.html', newPath: '/jeff-tryhackme' },
  { oldPath: '/static/writeups/hijack.html', newPath: '/hijack-writeup' }
];

redirections.forEach(({ oldPath, newPath }) => {
  router.get(oldPath, (req, res) => {
    res.redirect(301, 'https://blog.redtrib3.me' + newPath);
  });
});

module.exports = router;
