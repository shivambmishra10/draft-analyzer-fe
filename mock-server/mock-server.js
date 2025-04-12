const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock user database
const mockUsers = [
    { email: 'user@gmail.com', password: 'a', token: 'mock-jwt-token-123' }
];

app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    if (mockUsers.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const token = `mock-token-${Date.now()}`;
    mockUsers.push({ email, password, token });
    res.json({ token });
});


// POST /api/login - mock login handler
app.get('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ token: user.token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// POST /api/analyze - mock policy analysis handler
app.post('/api/analyze', (req, res) => {
    res.json({
        criteriaScores: [
            { criterion: 'Justification', score: 4 },
            { criterion: 'Essential Elements', score: 5 },
            { criterion: 'Comprehension', score: 3 },
            { criterion: 'Problem Identification', score: 4 },
            { criterion: 'Cost-Benefit Analysis', score: 2 }
        ]
    });
});

app.listen(8080, () => {
    console.log('✅ Mock API server running at http://localhost:8080');
});
