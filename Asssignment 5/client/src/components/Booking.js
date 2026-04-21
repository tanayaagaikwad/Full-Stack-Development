import React, { useState } from 'react';
import api from '../api';
import content, { labTimeslots } from '../constants';

const defaultForm = {
  labID: 'Lab-A1',
  timeslot: labTimeslots[0],
  date: '',
};

const Booking = ({ lang }) => {
  const copy = content[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState({ message: '', error: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/bookings', form);
      setStatus({ message: copy.bookingSuccess, error: '' });
      setForm(defaultForm);
      setIsOpen(false);
    } catch (error) {
      setStatus({ message: '', error: error.response?.data?.error || copy.fetchError });
    }
  };

  return (
    <div className="page-grid">
      <section className="page-intro">
        <p className="section-kicker">{copy.booking}</p>
        <h2>{copy.bookingTitle}</h2>
        <p>{copy.bookingCopy}</p>
        <button className="primary-button" type="button" onClick={() => setIsOpen(true)}>
          {copy.openBooking}
        </button>
      </section>

      {status.message ? <p className="status success">{status.message}</p> : null}
      {status.error ? <p className="status error">{status.error}</p> : null}

      <section className="panel">
        <div className="booking-preview">
          <div>
            <h3>{copy.labId}</h3>
            <p>{form.labID}</p>
          </div>
          <div>
            <h3>{copy.timeslot}</h3>
            <p>{form.timeslot}</p>
          </div>
          <div>
            <h3>{copy.date}</h3>
            <p>{form.date || '--'}</p>
          </div>
        </div>
      </section>

      {isOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsOpen(false)}>
          <div className="modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>{copy.bookingTitle}</h3>
              <button className="ghost-button" type="button" onClick={() => setIsOpen(false)}>
                {copy.close}
              </button>
            </div>
            <form className="stack-form" onSubmit={handleSubmit}>
              <input
                name="labID"
                placeholder={copy.labId}
                value={form.labID}
                onChange={(event) => setForm((current) => ({ ...current, labID: event.target.value }))}
                required
              />
              <select
                name="timeslot"
                value={form.timeslot}
                onChange={(event) => setForm((current) => ({ ...current, timeslot: event.target.value }))}
              >
                {labTimeslots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                required
              />
              <button className="primary-button" type="submit">{copy.bookSlot}</button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Booking;
