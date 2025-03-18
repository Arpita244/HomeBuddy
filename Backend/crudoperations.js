const { User, Professional, Booking } = require("./schema.js");
const { checkPassword } = require("./Passencrypt.js");

// User Signup
async function signup(req, res) {
    try {
        const { fullName, email, phoneNumber, password } = req.body;
        const user = new User({ fullName, email, phoneNumber, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "User already exists" });
    }
}

// User Login
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await checkPassword(password, user.password);
        if (isMatch) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Add Professional
async function addProfessional(req, res) {
    try {
        const { name, service, contact } = req.body;
        const professional = new Professional({ name, service, contact });
        await professional.save();
        res.status(201).json(professional);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get List of Professionals
async function getProfessionals(req, res) {
    try {
        const professionals = await Professional.find();
        res.json(professionals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Book a Service
async function bookService(req, res) {
    try {
        const { userId, serviceName } = req.body;
        const booking = new Booking({ userId, serviceName });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get User's Bookings
async function getUserBookings(req, res) {
    try {
        const { userId } = req.body;
        const bookings = await Booking.find({ userId });
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    signup,
    login,
    addProfessional,
    getProfessionals,
    bookService,
    getUserBookings
};
