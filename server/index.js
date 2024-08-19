const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const dotENV= require('dotenv');
dotENV.config();

const dbConnection = require('./dbConnection');
dbConnection();

const path = require('path');



const PORT= process.env.PORT;
const userRouter=require("./router/user.routes");
app.use('/user',userRouter);


const ownerRouter=require("./router/owner.routes");
app.use('/owner',ownerRouter);


const orderRouter=require("./router/order.routes");
app.use('/order',orderRouter);

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT,()=>{
    try {
        console.log(`Server is running on ${PORT}`);
    } catch (error) {
       console.log("Server is not RUNNING. SOMETHING WRONG"); 
    }
})