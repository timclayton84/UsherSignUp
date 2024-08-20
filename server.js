const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for form submissions
const signups = [];

// Route to handle form submissions
app.post('/signup', (req, res) => {
    const { name, date, serviceTime, section, position } = req.body;
    const newSignup = { name, date, serviceTime, section, position };
    
    // Check if the aisle is already selected for the given service time
    const existingSignup = signups.find(signup => signup.serviceTime === serviceTime && signup.section === section && signup.position === position);
    //Check if volunteer already signed up for a service
    const existingVolunteer = signups.find(signup => signup.name === name && signup.serviceTime === serviceTime);
    
    if (existingSignup) {
        return res.status(400).json({ message: 'This aisle is already taken for the selected service time.' });
    }
    if (existingVolunteer){
        return res.status(400).json({ message: 'You already signed up for this selected service time.' });
    // Store the signup
    signups.push(newSignup);
    res.status(201).json({ message: 'Signup successful!', data: newSignup });
}});

// Route to get all signups (for testing or admin view)
app.get('/signups', (req, res) => {
    res.json(signups);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
