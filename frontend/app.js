const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const URL = process.env.BACKEND_URL || 'http://localhost:8000/submit';

// Parse form URL-encoded data and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index', { response: null, error: null });
});

// Handle form submission and forward data to the backend
app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const result = await response.json();

    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.json(result);
    }

    res.render('index', { response: result, error: null });
  } catch (error) {
    console.error('Could not post data to backend:', error);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(502).json({ error: 'Could not post data to the backend.', details: error.message });
    }
    res.status(502).render('index', { response: null, error: 'Could not connect or post data to the backend.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
