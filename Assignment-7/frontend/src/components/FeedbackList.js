function FeedbackList({ feedbackList, loading, deletingId, onDeleteFeedback }) {
  if (loading) {
    return <div className="empty-state">Loading feedback...</div>;
  }

  if (feedbackList.length === 0) {
    return <div className="empty-state">No feedback available yet. Be the first to submit one.</div>;
  }

  return (
    <div className="feedback-list">
      {feedbackList.map((feedback) => (
        <article className="feedback-card" key={feedback._id}>
          <div className="feedback-top-row">
            <div>
              <h3>{feedback.name}</h3>
              <p className="rating-badge">Rating: {feedback.rating}/5</p>
            </div>

            <button
              className="delete-button"
              onClick={() => onDeleteFeedback(feedback._id)}
              disabled={deletingId === feedback._id}
            >
              {deletingId === feedback._id ? "Deleting..." : "Delete"}
            </button>
          </div>

          <p className="feedback-message">{feedback.message}</p>
        </article>
      ))}
    </div>
  );
}

export default FeedbackList;
