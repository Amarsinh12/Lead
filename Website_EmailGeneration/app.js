// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./mongo'); // Import the User model correctly
require('dotenv').config(); // To load environment variables from .env

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nodemailer = require('nodemailer');
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


// Function to send email to the customer
function sendServiceRequestEmail(email) {
    const mailOptions = {
        from: 'glead7103@gmail.com', // Sender address
        to: email,            // Customer's email
        subject: 'Transform your business with E-Zest Solutions',
        text: `Dear Customer, \n\nThank you for your interest in e-Zest Software Solutions!\n\nWe provide cutting-edge IT services, including custom software development, cloud solutions, AI-driven data analytics, and digital transformation. We’re also at the forefront of Generative AI technology, delivering next-gen solutions to enhance productivity, creativity, and decision-making.\n\nWhether it’s tailored software, seamless cloud integration, smarter data insights, or innovative AI-powered solutions, we’re here to support your business growth.\n\nIf you'd like to learn more, please feel free to contact us at contact@e-zest.com.\n\nLet’s explore how we can work together to achieve your business goals.\n\nBest regards,\nSales & Marketing Team,\nE-Zest Software Solutions`
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Routes

app.get("/",cors(),(req,res)=>{

})



app.get("/signup", (req, res) => {
    res.render("signup");
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            // Send email to the user
            sendServiceRequestEmail(email);

            // Return success response
            return res.status(200).json({
                message: "exist",
                user: { email: user.email, name: user.name },
            });
        } else {
            return res.status(401).json("notexist");
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json("An error occurred during login.");
    }
});


app.post("/signup", async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("exist"); // User already exists
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json("An error occurred during signup.");
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
