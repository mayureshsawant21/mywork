const express = require('express');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

/* ── DATA FILES ── */
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

[DATA_DIR, UPLOADS_DIR].forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });
if (!fs.existsSync(LEADS_FILE)) fs.writeFileSync(LEADS_FILE, '[]');
if (!fs.existsSync(SETTINGS_FILE)) fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ ga4: '', gtm: '' }));

function readLeads() { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); }
function writeLeads(data) { fs.writeFileSync(LEADS_FILE, JSON.stringify(data, null, 2)); }
function readSettings() { return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')); }
function writeSettings(data) { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2)); }

/* ── MULTER ── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_'))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

/* ── MIDDLEWARE ── */
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mayur-portfolio-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

/* ── AUTH MIDDLEWARE ── */
const CREDS = { username: 'Mayur', password: 'Mayur787898' };
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

/* ── ROUTES ── */

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Auth
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === CREDS.username && password === CREDS.password) {
    req.session.authenticated = true;
    req.session.user = username;
    return res.json({ success: true, message: 'Logged in successfully' });
  }
  return res.status(401).json({ success: false, error: 'Invalid credentials' });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/admin/me', requireAuth, (req, res) => {
  res.json({ authenticated: true, user: req.session.user });
});

// Contact form submission (public)
app.post('/api/contact', upload.single('jdFile'), (req, res) => {
  try {
    const { name, phone, email, company, designation } = req.body;
    if (!name || !phone || !email || !company || !designation) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    const leads = readLeads();
    const lead = {
      id: uuidv4(),
      name, phone, email, company, designation,
      jdFileName: req.file ? req.file.filename : '',
      jdOriginalName: req.file ? req.file.originalname : '',
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    leads.unshift(lead);
    writeLeads(leads);
    res.json({ success: true, message: 'Thank you! Your enquiry has been received.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// Leads CRUD (admin)
app.get('/api/admin/leads', requireAuth, (req, res) => {
  const leads = readLeads();
  const { status, q } = req.query;
  let filtered = leads;
  if (status) filtered = filtered.filter(l => l.status === status);
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(l =>
      (l.name + l.email + l.company + l.designation).toLowerCase().includes(query)
    );
  }
  res.json({ leads: filtered, total: leads.length, filtered: filtered.length });
});

app.get('/api/admin/leads/:id', requireAuth, (req, res) => {
  const lead = readLeads().find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json(lead);
});

app.put('/api/admin/leads/:id', requireAuth, (req, res) => {
  const leads = readLeads();
  const idx = leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found' });
  leads[idx] = { ...leads[idx], ...req.body, id: leads[idx].id };
  writeLeads(leads);
  res.json({ success: true, lead: leads[idx] });
});

app.delete('/api/admin/leads/:id', requireAuth, (req, res) => {
  const leads = readLeads();
  const idx = leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found' });
  const [removed] = leads.splice(idx, 1);
  if (removed.jdFileName) {
    const filePath = path.join(UPLOADS_DIR, removed.jdFileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  writeLeads(leads);
  res.json({ success: true });
});

app.delete('/api/admin/leads', requireAuth, (req, res) => {
  writeLeads([]);
  res.json({ success: true, message: 'All leads deleted' });
});

// JD file download (admin)
app.get('/api/admin/leads/:id/jd', requireAuth, (req, res) => {
  const lead = readLeads().find(l => l.id === req.params.id);
  if (!lead || !lead.jdFileName) return res.status(404).json({ error: 'No JD file for this lead' });
  const filePath = path.join(UPLOADS_DIR, lead.jdFileName);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found on server' });
  res.download(filePath, lead.jdOriginalName || lead.jdFileName);
});

// Settings (admin)
app.get('/api/admin/settings', requireAuth, (req, res) => {
  res.json(readSettings());
});

app.put('/api/admin/settings', requireAuth, (req, res) => {
  const current = readSettings();
  const updated = { ...current, ...req.body };
  writeSettings(updated);
  res.json({ success: true, settings: updated });
});

// CSV Export
app.get('/api/admin/leads/export/csv', requireAuth, (req, res) => {
  const leads = readLeads();
  const headers = ['#', 'Name', 'Phone', 'Email', 'Company', 'Role', 'JD File', 'Date', 'Status'];
  const rows = leads.map((l, i) => [
    i + 1, l.name, l.phone, l.email, l.company, l.designation,
    l.jdOriginalName || '',
    new Date(l.timestamp).toLocaleDateString('en-IN'),
    l.status
  ]);
  const csv = [headers, ...rows]
    .map(row => row.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(','))
    .join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="portfolio_leads_' + new Date().toISOString().split('T')[0] + '.csv"');
  res.send(csv);
});

/* ── START ── */
app.listen(PORT, () => {
  console.log('');
  console.log('  Portfolio Backend running at http://localhost:' + PORT);
  console.log('  Admin credentials: Mayur / Mayur787898');
  console.log('  Leads stored at: ' + LEADS_FILE);
  console.log('');
});
