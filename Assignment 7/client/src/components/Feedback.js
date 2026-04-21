import React, { useEffect, useState } from 'react';
import api from '../api';
import content from '../constants';

const defaultForm = {
  subject: 'Data Structures',
  rating: 5,
  comment: '',
};

const StarRating = ({ rating, onChange }) => (
  <div className="star-row">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        type="button"
        className={value <= rating ? 'star active' : 'star'}
        onClick={() => onChange(value)}
      >
        {'\u2605'}
      </button>
    ))}
  </div>
);

const Feedback = ({ lang }) => {
  const copy = content[lang];
  const [subjectFilter, setSubjectFilter] = useState('Data Structures');
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState({ message: '', error: '' });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get(`/feedback?subject=${encodeURIComponent(subjectFilter)}`);
        setFeedbacks(response.data);
      } catch (error) {
        setStatus({ message: '', error: copy.fetchError });
      }
    };

    fetchFeedbacks();
  }, [subjectFilter, copy.fetchError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/feedback', form);
      setStatus({ message: copy.feedbackSuccess, error: '' });
      setFeedbacks((current) => {
        if (subjectFilter !== form.subject) {
          return current;
        }

        return [response.data.feedback, ...current];
      });
      setSubjectFilter(form.subject);
      setForm((current) => ({ ...current, comment: '', rating: 5 }));
    } catch (error) {
      setStatus({ message: '', error: error.response?.data?.error || copy.fetchError });
    }
  };

  return (
    <div className="page-grid">
      <section className="page-intro">
        <p className="section-kicker">{copy.feedback}</p>
        <h2>{copy.reviewsTitle}</h2>
        <p>{copy.feedbackCopy}</p>
        <p className="muted-text">{copy.instantUpdate}</p>
      </section>

      {status.message ? <p className="status success">{status.message}</p> : null}
      {status.error ? <p className="status error">{status.error}</p> : null}

      <section className="dashboard-grid">
        <article className="panel">
          <h3>{copy.submit}</h3>
          <form className="stack-form" onSubmit={handleSubmit}>
            <input
              name="subject"
              placeholder={copy.subject}
              value={form.subject}
              onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
              required
            />
            <label className="field-label">{copy.rating}</label>
            <StarRating rating={form.rating} onChange={(rating) => setForm((current) => ({ ...current, rating }))} />
            <textarea
              name="comment"
              placeholder={copy.comment}
              value={form.comment}
              onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))}
              required
            />
            <button className="primary-button" type="submit">{copy.submit}</button>
          </form>
        </article>

        <article className="panel">
          <div className="review-header">
            <h3>{copy.reviewsTitle}</h3>
            <input value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} placeholder={copy.subject} />
          </div>

          <div className="review-list">
            {feedbacks.length === 0 ? <p>{copy.noReviews}</p> : null}
            {feedbacks.map((feedback) => (
              <article key={feedback._id} className="review-card">
                <div className="review-topline">
                  <strong>{feedback.subject}</strong>
                  <span>{feedback.rating}/5</span>
                </div>
                <p>{feedback.comment}</p>
                <small>{new Date(feedback.timestamp).toLocaleString()}</small>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Feedback;
