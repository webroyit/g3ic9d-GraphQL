const Account = require('../models/account');

// the logic
module.exports = {
    // args is a object
    createAccount: async function({ accountData }, req){
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
    }
}