import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "database" for the prototype
  // In a real app, this would be a real DB or Google AppScript/Excel connection
  let events = [
    {
      id: '1',
      title: 'Annual Tech Fest: Pulsar 2026',
      description: 'The flagship tech fest of ARSD College featuring coding, gaming, and workshops.',
      date: '2026-05-15',
      type: 'Fest',
      status: 'Upcoming',
      location: 'Main Auditorium',
      stats: { registrations: 45, attendance: 0 }
    },
    {
      id: '2',
      title: 'AI Ethics Seminar',
      description: 'A deep dive into the future of Artificial Intelligence and its ethical implications.',
      date: '2026-04-28',
      type: 'Seminar',
      status: 'Upcoming',
      location: 'Seminar Hall',
      stats: { registrations: 120, attendance: 0 }
    }
  ];

  let registrations = [];
  let feedback = [];
  let members = [
    { id: '1', name: 'Dr. Rajesh Kumar', role: 'Convenor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { id: '2', name: 'Sneha Sharma', role: 'President', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { id: '3', name: 'Rahul Verma', role: 'General Secretary', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  ];

  let achievements = [
    { id: '1', title: 'Best Society Award 2025', date: '2025-12-10', description: 'Recognized as the best technical society in University of Delhi.' },
    { id: '2', title: 'Hackathon Winners', date: '2026-02-15', description: 'Our team won the Inter-College Hackathon at DTU.' }
  ];

  // API Routes
  app.get('/api/events', (req, res) => res.json(events));
  
  app.post('/api/events', (req, res) => {
    const newEvent = { ...req.body, id: Date.now().toString(), stats: { registrations: 0, attendance: 0 } };
    events.push(newEvent);
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
    // Basic stats for dashboard
    const totalRegistrations = registrations.length;
    const totalAttendance = registrations.filter(r => r.attended).length;
    res.json({ totalRegistrations, totalAttendance, eventsCount: events.length });
  });

  app.get('/api/members', (req, res) => res.json(members));
  app.get('/api/achievements', (req, res) => res.json(achievements));
  
  app.post('/api/feedback', (req, res) => {
    feedback.push({ ...req.body, id: Date.now(), date: new Date() });
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
