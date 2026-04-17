const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// Dummy data
const packages = [
    { name: "Goa Trip", price: 5000 },
    { name: "Manali Tour", price: 8000 },
    { name: "Kerala Backwaters", price: 10000 }
];

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/packages", (req, res) => {
    res.render("packages", { packages });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});