const jwt = require('jsonwebtoken');
const conf = require('../config/config');

module.exports = function (req, resp, next) {
    if (req.method === 'OPTIONS') return resp.send(200);
    const token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];
    if (!token)  return resp.status(200).send({auth: false, token: null});
    jwt.verify(token, conf.token.secret, function (err, decode) {
        //типо если просрочился
        if (err) return resp.status(403).send({auth: false, message: 'authenticate token has expired' });
        req.id = decode.id;
        req.token = token;
        next();
    });
};