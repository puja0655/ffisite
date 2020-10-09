const app = require('express')()
const cors = require('cors')
const razorpayRouter = require('./routers/razorpayRouter')
const contactRouter = require('./routers/contactusRouter')

const mongoose = require('mongoose');


const url = MONGODB_URL;          //url of mongodb server
const connect = mongoose.connect(url);  
 
connect.then((db)=>{
  console.log('connected corectly to the server');
},(err)=>{console.log(err);});


app.use(cors())



// Routers 
app.use('/razorpay',razorpayRouter); 
app.use('/contactus',contactRouter);






 


app.get('/',(req,res)=>{
    res.json({hello:"hello"})
  })
  

  
 app.listen(5000,()=>{
    console.log("listening at 5000")
  })
  
  
  module.exports = app;
   