const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    packageName: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// Dummy Packages
const packages = [
    { id: 1, name: "Goa", price: 5000 },
    { id: 2, name: "Manali", price: 8000 },
    { id: 3, name: "Kerala", price: 10000 }
];

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/packages", (req, res) => {
    res.render("packages", { packages });
});

app.get("/book/:id", (req, res) => {
    const pkg = packages.find(p => p.id == req.params.id);
    res.render("book", { pkg });
});

app.post("/book", async (req, res) => {
    const { name, packageName } = req.body;
    await Booking.create({ name, packageName });
    res.redirect("/bookings");
});

app.get("/bookings", async (req, res) => {
    const bookings = await Booking.find();
    res.render("bookings", { bookings });
});

app.listen(3002, () => {
    console.log("Server running on http://localhost:3002");
});