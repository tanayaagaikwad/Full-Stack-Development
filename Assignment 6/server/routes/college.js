const express = require('express');
const router = express.Router();

const collegeInfo = {
  department: {
    name: 'Computer Engineering Department',
    about: 'CampusConnect showcases departmental academics, student services, and peer-to-peer campus utilities in one place.',
    vision: 'To foster practical computing skills, collaborative research, and industry-ready innovation.',
    location: 'A Wing, Innovation Block',
    contactEmail: 'cse.department@campusconnect.edu',
  },
  faculty: [
    {
      name: 'Dr. Ananya Kulkarni',
      designation: 'Head of Department',
      specialization: 'Artificial Intelligence and Data Systems',
      email: 'ananya.kulkarni@campusconnect.edu',
    },
    {
      name: 'Prof. Rohan Patil',
      designation: 'Assistant Professor',
      specialization: 'Cloud Computing and DevOps',
      email: 'rohan.patil@campusconnect.edu',
    },
    {
      name: 'Prof. Sneha Joshi',
      designation: 'Assistant Professor',
      specialization: 'Cybersecurity and Computer Networks',
      email: 'sneha.joshi@campusconnect.edu',
    },
  ],
  academicCalendar: [
    { title: 'Semester Orientation', date: '2026-06-15' },
    { title: 'Internal Assessment I', date: '2026-07-20' },
    { title: 'Mini Project Expo', date: '2026-08-28' },
    { title: 'Industry Expert Lecture', date: '2026-09-12' },
  ],
};

router.get('/info', (req, res) => {
  res.json(collegeInfo);
});

module.exports = router;
