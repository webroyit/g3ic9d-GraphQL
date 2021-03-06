const validator = require('validator');
const jwt = require('jsonwebtoken');

const Account = require('../models/account');
const Food = require('../models/food');

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

        // create the token
        const token = jwt.sign({
            accountId: account._id.toString(),
            username: account.username
        }, 'practiceGraphql', { expiresIn: '1h' });

        return { token: token, accountId: account._id.toString() }
    },
    addFood: async function({ foodData }, req){
        if(!req.isLogin){
            const error = new Error('You need to login first');
            throw error;
        }

        const account = await Account.findById(req.accountId);

        if(!account){
            const error = new Error('This account does not exist');
            throw error;
        }

        const food = new Food({
            name: foodData.name,
            price: foodData.price,
            origin: account
        });

        const makeFood = await food.save();
        account.foods.push(makeFood);
        await account.save();

        return {...makeFood._doc, _id: makeFood._id.toString() }
    },
    // get all foods
    foods: async function(req){
        if(!req.isLogin){
            const error = new Error('You need to login first');
            throw error;
        }

        const foods = await Food.find().populate('origin');
        const result = foods.map(food => {
            return {
                ...food._doc,
                _id: food._id.toString()
            };
        })

        return { foods: result };
    }
}