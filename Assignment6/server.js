const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let appointments = [];

// Home
app.get("/", (req, res) => {
    res.render("index");
});

// Booking page
app.get("/book", (req, res) => {
    res.render("book");
});

// Handle form
app.post("/book", (req, res) => {
    const { name, date, time } = req.body;
    appointments.push({ name, date, time });
    res.redirect("/appointments");
});

// Show appointments
app.get("/appointments", (req, res) => {
    res.render("appointments", { appointments });
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});