const express = require('express');
const mongoDB = require("./db");
mongoDB();
const app = express();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/',(req,res) => {
    res.send("Hello World");
})

app.listen(5000,() => {
    console.log("Server responding on http://localhost:5000");
})