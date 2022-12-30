import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  { useNewUrlParser: true, useUnifiedTopology: true },

  () => {
    console.log("DB connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User =  new mongoose.model("User", userSchema);

// Routes

app.post("/login", (req, res) => {
  
  const { email, password } = req.body;
  User.findOne({email:email} , (err, user)=>{
          if(user){
             if(password === user.password){
                res.send({message: "Login Successfull!" , user : user}); 
             }
             else {
                res.send({message: " Password Did not match."})
             }

          }else{
             res.send({message: "user not registered"}); 
          }
  })
});




// This is all fine// setting the working of register button 

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  
   
  User.findOne({email:email} , (err , user)=>{
    
      if(user){
        res.send({ message: "User already regisetered"});
      }else{

         const user = new User({
           name,
           email,
           password
      })
     
          user.save((err) => {
             if(err){
                res.send({message: "err"}); 
            }else{
              res.send({message: "Successfully registered! Please Login now"}); 
             }
          });
        
       }
  })


});

app.listen(9005, () => {
  console.log("BE started at port 9005");
});
