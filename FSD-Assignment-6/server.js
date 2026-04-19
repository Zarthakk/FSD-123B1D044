const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Appointment = require("./models/Appointment");

const app = express();
const PORT = 3001;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/appointment_booking_db";

// Connect MongoDB so appointments are stored permanently.
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Set EJS as view engine for rendering dynamic pages.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Parse form data from POST requests.
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS.
app.use(express.static(path.join(__dirname, "public")));

// GET /
// Home page dashboard.
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Appointment Dashboard",
  });
});

// GET /book
// Show booking form.
app.get("/book", (req, res) => {
  res.render("book", {
    pageTitle: "Book Appointment",
    appointment: null,
    formAction: "/book",
    formTitle: "Schedule a New Appointment",
    submitLabel: "Confirm Booking",
    error: req.query.error || "",
    helperText:
      "Choose a date and time that works best, then save it to your appointment board.",
  });
});

// POST /book
// Save new appointment into MongoDB.
app.post("/book", async (req, res) => {
  try {
    const { name, date, time } = req.body;

    await Appointment.create({
      name,
      date,
      time,
    });

    res.redirect("/appointments?success=Appointment booked successfully.");
  } catch (error) {
    console.error("Error saving appointment:", error.message);
    res.redirect("/book?error=Unable to save appointment. Please try again.");
  }
});

// GET /appointments
// Fetch and display all appointments.
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.render("appointments", {
      pageTitle: "All Appointments",
      appointments,
      successMessage: req.query.success || "",
    });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.render("appointments", {
      pageTitle: "All Appointments",
      appointments: [],
      successMessage: "",
    });
  }
});

// GET /delete/:id
// Delete selected appointment.
app.get("/delete/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.redirect("/appointments?success=Appointment deleted successfully.");
  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    res.redirect("/appointments");
  }
});

// GET /edit/:id
// Load appointment data into edit form.
app.get("/edit/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.redirect("/appointments");
    }

    res.render("book", {
      pageTitle: "Edit Appointment",
      appointment,
      formAction: `/update/${appointment._id}`,
      formTitle: "Update Appointment Details",
      submitLabel: "Save Changes",
      error: "",
      helperText:
        "Refine the schedule details below and keep your booking list up to date.",
    });
  } catch (error) {
    console.error("Error loading appointment for editing:", error.message);
    res.redirect("/appointments");
  }
});

// POST /update/:id
// Update appointment in MongoDB.
app.post("/update/:id", async (req, res) => {
  try {
    const { name, date, time } = req.body;

    await Appointment.findByIdAndUpdate(req.params.id, {
      name,
      date,
      time,
    });

    res.redirect("/appointments?success=Appointment updated successfully.");
  } catch (error) {
    console.error("Error updating appointment:", error.message);
    res.redirect("/appointments");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
