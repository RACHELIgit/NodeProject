const jwt = require('jsonwebtoken')

module.exports = {
    checkAuth: ((req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.SECRET)
            next();
        }
        catch {
            res.status(401).send({message:'Auth failed!'})
        }
    })
}