const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');

//Middleware Function for Authorization
const isLoggedIn = async (req,res,next) => {
    try{
        if(req.cookies.jwt) {
            //Verify Cookie
            const token = req.cookies.jwt;
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //Find user with the correct username who has that authentication token still stored
            const employee = await Employee.findOne({e_username:decoded.e_username, 'tokens.token':token})
            if(!employee){
                return next();
            }
            req.locals.employee = employee;
            req.employee = employee;
            req.token = token;
            return next();
        }
    }catch(e){
        return next();
    }
    next();
};

module.exports = isLoggedIn;