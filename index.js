//Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const userRoute = require('./routes/userRoutes')


//Creating a Server
const app = express();

//Creating a port
const PORT = process.env.PORT || 5000

//Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/adduser', async (req, res) => {
    const { username,  password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide username, email, and password" });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create user (assuming beforeCreate hooks handle password hashing)
        const newUser = await User.create({ username, password });

        res.status(201).json({ success: true, message: "Registration successful", data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});


app.post('/login', (req, res) => {
    res.send("Welcome to the web page");
});



app.use('/users', userRoute);



//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})

