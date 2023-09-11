const { default: mongoose } = require("mongoose");

const dbConnect =  () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URl);
        console.log('Database Connected Successfully');
    } catch (error) {
        throw new Error({message : 'Database error'});
    }
};
module.exports = dbConnect;