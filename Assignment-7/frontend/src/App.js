import { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

const API_URL = "http://localhost:5000/api/feedback";

function App() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const fetchFeedback = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch feedback.");
      }

      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      setErrorMessage("Could not connect to the backend. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      setDeletingId(feedbackId);

      const response = await fetch(`${API_URL}/${feedbackId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Unable to delete feedback.");
      }

      setFeedbackList((previousFeedback) =>
        previousFeedback.filter((item) => item._id !== feedbackId)
      );
    } catch (error) {
      setErrorMessage("Delete failed. Please try again.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="app-shell">
      <div className="background-glow background-glow-left"></div>
      <div className="background-glow background-glow-right"></div>

      <main className="container">
        <section className="hero-card">
          <p className="eyebrow">Assignment 7 • MERN Style Project</p>
          <h1>Student Feedback Review System</h1>
          <p className="hero-text">
            A beginner-friendly full-stack application using React.js, Express.js,
            and MongoDB. Students can submit feedback, view all responses, and delete
            entries dynamically.
          </p>
        </section>

        <section className="content-grid">
          <FeedbackForm onFeedbackAdded={fetchFeedback} />

          <div className="list-panel">
            <div className="panel-header">
              <h2>Student Feedback</h2>
              <span className="count-badge">{feedbackList.length} Total</span>
            </div>

            {errorMessage && <p className="status-message error-message">{errorMessage}</p>}

            <FeedbackList
              feedbackList={feedbackList}
              loading={loading}
              deletingId={deletingId}
              onDeleteFeedback={handleDeleteFeedback}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
