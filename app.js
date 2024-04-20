// const express = require("express");
// const app=express();
// const mongoose = require("mongoose");
// const path = require("path");
// const signup=require("./models/signup.js");
// const methodOverride=require("method-override");




// app.set("views",path.join(__dirname,"views"));
// app.set("view engine","ejs");
// app.use(express.static(path.join(__dirname,"public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

// main().then(()=>{
//     console.log("Connection Successful");
//   }).catch(err => console.log(err));
  
//   async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/hackthone');
  
//   }



// app.get("/",(req,res)=>{
//     res.send("hackthone project in making");
// })

// app.get("/universe",(req,res)=>{
//     res.render("index.ejs");
// })
// // let sign=new signup({
// //     name: "Vasu Garg",
// //     collegename:"jaypee",
// //     username:"vasugarg924",
// //     password:"12456"

// // });
// // sign.save().then((res)=>{
// //     console.log(res);
// // });

// app.get("/signupnew",(req,res)=>{
//     res.render("signup2.ejs");
// })

// app.post("/signupnew",(req,res)=>{
//     let { fullname, college, newusername, newpassword } = req.body;
//     let newsignup= new signup({
//         fullname: fullname,
//         college: college,
//         newusername: newusername,
//         newpassword: newpassword
//       })
//     //   newsignup.save()
//     //     .then(res => {
//     //       console.log("chat was saved")
//     //     })
//     //     .catch((err) => {
//     //       console.log(err);
//     //     });
    
//     console.log(newsignup);
//     // res.redirect("/universe");
// })


// app.listen("8080",()=>{
//     console.log("Server is listening to port 8080");
//   });




const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const signup = require("./models/signup.js");
const methodOverride = require("method-override");

// Set up view engine and static files
app.set('scripts', path.join(__dirname, 'scripts'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/hackthone');
        console.log("Connection Successful");
    } catch (error) {
        console.error("Connection error:", error);
    }
}
main();

// Routes
app.get("/", (req, res) => {
    res.send("hackthone project in making");
});

app.get("/universe", (req, res) => {
    res.render("index.ejs");
});
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await signup.findOne({ username });
        if (!user) {
            return res.status(404).send("Username not found");
        }
        // Check password
        if (user.password !== password) {
            return res.status(400).send("Incorrect password");
        }
        // Redirect to another page after successful login
        res.render("main.ejs");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});

app.get("/signupnew", (req, res) => {
    res.render("signup2.ejs");
});

// signup route
app.post("/signupnew", async (req, res) => {
    const { fullname, college, newusername, newpassword } = req.body;
    try {
        // Check if username already exists
        const existingUser = await signup.findOne({ username: newusername });
        if (existingUser) {
            return res.status(400).send("Username already taken");
        }

        // If username is not taken, proceed with signup
        const newsignup = new signup({
            name: fullname,
            collegename: college,
            username: newusername,
            password: newpassword
        });
        const savedSignup = await newsignup.save();
        console.log("Signup saved:", savedSignup);
        // Redirect to another page after saving
        res.redirect("/universe");
    } catch (error) {
        console.error("Error saving signup:", error);
        // Handle the error appropriately, such as rendering an error page
        res.status(500).send("Error saving signup: " + error.message);
    }
});


// elearning path
app.get("/elearning",(req,res)=>{
    res.render("elearning.ejs");
});

// publish path
app.get("/publish",(req,res)=>{
    res.render("publish.ejs")
})

// Youtube path
app.get("/youtube",(req,res)=>{
    res.render("youtube.ejs");
})
app.get("/profile",(req,res)=>{
    res.render("profile.ejs");
})

// Start server
app.listen("8080", () => {
    console.log("Server is listening to port 8080");
});

