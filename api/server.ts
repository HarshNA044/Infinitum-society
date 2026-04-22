import express from 'express';

const app = express();
app.use(express.json());

// In-memory "database" (for demo/prototype)
let events = [
    {
      id: '1',
      title: 'Annual Tech Fest: Pulsar 2026',
      description: 'The flagship tech fest of ARSD College featuring coding, gaming, and workshops.',
      date: '2026-05-15',
      type: 'Fest',
      status: 'Upcoming',
      location: 'Main Auditorium',
      stats: { registrations: 345, attendance: 210 }
    },
    {
      id: '2',
      title: 'AI Ethics Seminar',
      description: 'A deep dive into the future of Artificial Intelligence and its ethical implications.',
      date: '2026-04-28',
      type: 'Seminar',
      status: 'Upcoming',
      location: 'Seminar Hall 1',
      stats: { registrations: 120, attendance: 88 }
    },
    {
      id: '3',
      title: 'UI/UX Design Workshop',
      description: 'Master the art of creating beautiful and functional user interfaces.',
      date: '2026-06-02',
      type: 'Workshop',
      status: 'Upcoming',
      location: 'Computer Lab 3',
      stats: { registrations: 85, attendance: 0 }
    }
];

let registrations = [];
let feedback = [];
let members = [
    { id: '1', name: 'Dr. Rajesh Kumar', role: 'Convenor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', linkedin: 'https://linkedin.com/in/rajeshkumar' },
    { id: '2', name: 'Sneha Sharma', role: 'President', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', linkedin: 'https://linkedin.com/in/snehasharma' },
    { id: '3', name: 'Rahul Verma', role: 'General Secretary', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', linkedin: 'https://linkedin.com/in/rahulverma' },
    { id: '4', name: 'Ananya Gupta', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', linkedin: 'https://linkedin.com/in/ananyagupta' },
    { id: '5', name: 'Vikram Singh', role: 'Event Coordinator', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', linkedin: 'https://linkedin.com/in/vikramsingh' },
    { id: '6', name: 'Priya Das', role: 'Marketing Head', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', linkedin: 'https://linkedin.com/in/priyadas' },
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
