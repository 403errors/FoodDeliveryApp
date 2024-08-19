const mongoose = require('mongoose');


 const dbConnect=async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_URL)
  .then(() => console.log('Connected to Database!'));
    } catch (error) {
        console.log("DB not Connected"+error);
    }
}
module.exports= dbConnect;