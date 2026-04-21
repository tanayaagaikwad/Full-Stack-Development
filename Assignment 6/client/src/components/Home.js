import React, { useEffect, useState } from 'react';
import api from '../api';
import content from '../constants';

const Home = ({ lang }) => {
  const copy = content[lang];
  const [collegeInfo, setCollegeInfo] = useState({ faculty: [], academicCalendar: [] });
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const response = await api.get('/college/info');
        setCollegeInfo(response.data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: copy.fetchError });
      }
    };

    loadInfo();
  }, [copy.fetchError]);

  return (
    <div className="page-grid">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="section-kicker">{copy.home}</p>
          <h2>{copy.welcome}</h2>
          <p>{copy.heroCopy}</p>
        </div>
        <div className="highlight-grid">
          <article className="mini-panel">
            <h3>{copy.departmentHighlights}</h3>
            <p>{collegeInfo.department?.about || copy.loading}</p>
          </article>
          <article className="mini-panel">
            <h3>Vision</h3>
            <p>{collegeInfo.department?.vision || copy.loading}</p>
          </article>
        </div>
      </section>

      {status.error ? <p className="status error">{status.error}</p> : null}

      <section className="content-grid">
        <article className="panel">
          <h3>{collegeInfo.department?.name || copy.loading}</h3>
          <p>{collegeInfo.department?.location}</p>
          <p>{collegeInfo.department?.contactEmail}</p>
        </article>

        <article className="panel">
          <h3>{copy.academicCalendar}</h3>
          <div className="calendar-list">
            {collegeInfo.academicCalendar?.map((entry) => (
              <div key={entry.date} className="calendar-row">
                <strong>{entry.title}</strong>
                <span>{new Date(entry.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="faculty-section">
        <div className="section-heading">
          <h3>{copy.faculty}</h3>
        </div>
        <div className="card-grid">
          {collegeInfo.faculty?.map((member) => (
            <article key={member.email} className="profile-card">
              <div className="avatar">{member.name.charAt(0)}</div>
              <h4>{member.name}</h4>
              <p>{member.designation}</p>
              <p>{member.specialization}</p>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
