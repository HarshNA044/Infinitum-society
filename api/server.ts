import express from 'express';

const app = express();
app.use(express.json());

// In-memory "database" (for demo/prototype)
let events = [
    {
      id: '1',
      title: 'Exploromania: Motivational Seminar',
      description: 'A seminar by Dr. Lajjaram Bishnoi (DGP of Meghalaya) on mental health and cracking civil services.',
      date: '2024-02-10',
      type: 'Seminar',
      status: 'Past',
      location: 'Main Auditorium',
      stats: { registrations: 450, attendance: 420 }
    },
    {
      id: '2',
      title: 'Beyond the Veil: Supernatural Science',
      description: 'Exploring the science behind supernatural beliefs with Mr. Waqar Raj (Indian Paranormal Society).',
      date: '2024-03-15',
      type: 'Seminar',
      status: 'Past',
      location: 'Seminar Hall 1',
      stats: { registrations: 380, attendance: 350 }
    },
    {
      id: '3',
      title: 'Socio-Sync: Science Museum Visit',
      description: 'Exploring the intertwined nature of Physics, Chemistry, Biology and Technology at National Science Museum.',
      date: '2024-04-20',
      type: 'Field Trip',
      status: 'Past',
      location: 'National Science Museum',
      stats: { registrations: 120, attendance: 115 }
    }
];

let registrations = [];
let feedback = [];
let members = [
    { id: '1', name: 'Saksham Raj', role: 'President', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '2', name: 'Ritik', role: 'Vice-President', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '3', name: 'Vaishanvi Shukla', role: 'Vice-President', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '4', name: 'Sarthak Jiswal', role: 'Secretary', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '5', name: 'Ayush Kumar Garg', role: 'Joint Secretary', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '6', name: 'Mritunjay Yadav', role: 'Academic Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '7', name: 'Divyansh Pratap Singh', role: 'Content Head', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '8', name: 'Pragya Saxena', role: 'Content Sub-head', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '9', name: 'Atul Singh', role: 'Digital Head', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '10', name: 'Nishant', role: 'Digital Sub-head', image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '11', name: 'Niranjan Tripathi', role: 'Event Head', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '12', name: 'Raunak Kumar', role: 'Event Sub-head', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '13', name: 'Vikas Yadav', role: 'PR Head', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '14', name: 'Keshav Agrawal', role: 'PR Sub-head', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', linkedin: '#' },
    { id: '15', name: 'Shrishti Singh', role: 'Sponsorship Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', linkedin: '#' },
];

let achievements = [
    { id: '1', title: 'Best Society Award 2025', date: '2025-12-10', description: 'Recognized as the best technical society in University of Delhi.' },
    { id: '2', title: 'Inter-College Hackathon Winners', date: '2026-02-15', description: 'Our team won the Inter-College Hackathon at DTU, competing against 50+ colleges.' },
    { id: '3', title: 'Research Grant', date: '2026-01-20', description: 'Received a grant for our project on Sustainable Computing from the Ministry of IT.' },
    { id: '4', title: 'Community Outreach', date: '2025-11-05', description: 'Successfully trained 200+ school students in basic web development.' }
];

app.get('/api/events', (req, res) => res.json(events));

app.post('/api/events', (req, res) => {
    const newEvent = { ...req.body, id: Date.now().toString(), stats: { registrations: 0, attendance: 0 } };
    events.unshift(newEvent); // Add to beginning (most recent)
    res.json(newEvent);
});

app.post('/api/register', (req, res) => {
    const { eventId, studentName, rollNo, email } = req.body;
    const ticketId = `INF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const registration = { eventId, studentName, rollNo, email, ticketId, attended: false, timestamp: new Date() };
    registrations.push(registration);
    
    // Update event stats
    const event = events.find(e => e.id === eventId);
    if (event) event.stats.registrations++;
    
    res.json(registration);
});

app.post('/api/mark-attendance', (req, res) => {
    const { ticketId } = req.body;
    const registration = registrations.find(r => r.ticketId === ticketId);
    if (!registration) return res.status(404).json({ error: 'Invalid Ticket' });
    
    if (registration.attended) return res.json({ message: 'Already marked', registration });
    
    registration.attended = true;
    const event = events.find(e => e.id === registration.eventId);
    if (event) event.stats.attendance++;
    
    res.json({ message: 'Attendance marked successfully', registration });
});

app.get('/api/stats', (req, res) => {
    const totalRegistrations = registrations.length;
    const totalAttendance = registrations.filter(r => r.attended).length;
    res.json({ totalRegistrations, totalAttendance, eventsCount: events.length });
});

app.get('/api/members', (req, res) => res.json(members));

app.post('/api/members', (req, res) => {
  const newMember = { ...req.body, id: Date.now().toString() };
  members.push(newMember);
  res.json(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const index = members.findIndex(m => m.id === id);
  if (index !== -1) {
    members[index] = { ...members[index], ...req.body };
    res.json(members[index]);
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  members = members.filter(m => m.id !== id);
  res.json({ success: true });
});

app.get('/api/achievements', (req, res) => res.json(achievements));

app.post('/api/feedback', (req, res) => {
    feedback.push({ ...req.body, id: Date.now(), date: new Date() });
    res.json({ success: true });
});

export default app;
