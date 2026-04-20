import { useState } from "react";

const API_URL = "http://localhost:5000/api/feedback";

function FeedbackForm({ onFeedbackAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "rating" ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed.");
      }

      setSuccessMessage("Feedback submitted successfully.");
      setFormData({
        name: "",
        message: "",
        rating: 5
      });
      onFeedbackAdded();
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-panel">
      <div className="panel-header">
        <h2>Submit Feedback</h2>
        <span className="count-badge">Live Form</span>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Student Name
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-label">
          Feedback Message
          <textarea
            className="form-input form-textarea"
            name="message"
            placeholder="Write your experience or review here"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label className="form-label">
          Rating
          <select
            className="form-input"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </label>

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {successMessage && <p className="status-message success-message">{successMessage}</p>}
        {errorMessage && <p className="status-message error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}

export default FeedbackForm;
