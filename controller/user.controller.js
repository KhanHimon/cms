const UserSchema = require('../models/user.model');

class UserController {
    postUser(req,res){
        const user = new UserSchema({
            username: req.body.username,
            password: req.body.password
        });
        user.save();
        res.json(user);
    }
}

module.exports = new UserController