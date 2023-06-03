const  jwt = require("jsonwebtoken")

const checkLogin = (req, res, next)=>{
    const {authorization} = req.headers;
    try {
        const token  = authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const {phone, id } = decode;
        req.phone = phone;
        req.id = id;

        next();

    } catch (error) {
        res.status(404).json({
            code: 404,
            "message": "UnAuthenticated"
        })
        next();
    }
}

module.exports = checkLogin;
