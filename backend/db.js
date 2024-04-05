const mongoose = require("mongoose");

const mongoUrl = 'mongodb+srv://meharyumyum:YumYumExpress@cluster0.h29ruor.mongodb.net/YumYumExpressMern?retryWrites=true&w=majority';

const mongoDB = async (req,res) => {
    try {
        await mongoose.connect(mongoUrl).then(async()=>{
            console.log("Connected to MongoDB");
            const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
                global.food_items = fetched_data; 
            const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
                global.foodCategory = foodCategory;
        });  
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = mongoDB;
