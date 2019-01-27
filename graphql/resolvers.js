// the logic

module.exports = {
    // args is a object
    createAccount(args, req){
        const name = args.createAccount.name;
        const password = args.createAccount.password;
        const bio = args.createAccount.args;

        console.log(name, password, bio);
    }
}