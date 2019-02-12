const validator = require('validator');

const Account = require('../models/account');

// the logic
module.exports = {
    // args is a object
    createAccount: async function({ accountData }, req){
        const errors = [];
        if(validator.isEmpty(accountData.username)){
            errors.push({ message: "Username cannot be empty"})
        }
        if(validator.isEmpty(accountData.password) || !validator.isLength(accountData.password, { min: 6 })){
            errors.push({ message: "Password must be at least 6 characters long"})
        }
        if(validator.isEmpty(accountData.bio) || !validator.isLength(accountData.bio, { min: 5 })){
            errors.push({ message: "Bio must be at least 5 characters long"})
        }

        if(errors.length > 0){
            const error = new Error("Error alert");
            error.data = errors;
            throw error;
        }

        const checkUsername = await Account.findOne({username: accountData.username});
        // check if that username exist
        if(checkUsername){
            const error = new Error("This username already exist");
            throw error;
        }
        const account = new Account({
            username: accountData.username,
            password: accountData.password,
            bio: accountData.bio
        });
        const saveAccount = await account.save();
        return{ ...saveAccount._doc, _id: saveAccount._id.toString() }
    },

    login: async function({ username, password }){
        const account = await Account.findOne({ username: username });
        
        // check if the user exist
        if(!account){
            const error = new Error('This username does not exist');
            throw error;
        }
        if(password !== account.password){
            const error = new Error('Password does not match');
            throw error;
        }
        const token = '12321';
        const accountId = '123912vjd'
        return{ token: token, accountId: accountId }
    }
}