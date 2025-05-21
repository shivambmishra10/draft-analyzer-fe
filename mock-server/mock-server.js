const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock user database
const mockUsers = [
    { email: 'user@gmail.com', name: 'Bhagwan', password: 'a', token: 'mock-jwt-token-123' }
];

// Add this mock route to your mock-server.js
const assessments = [
    {
        id: 1,
        title: "Does the Draft Clearly Explain Why and What?",
        description:
            "This area evaluates how well the policy document explains its purpose, objectives, and structure.",
        criteria: [
            {
                title: "Justification",
                description:
                    "Is the need for the policy well-founded? Does the policy provide relevant context, data, or rationale for why it is needed?",
            },
            {
                title: "Essential Elements",
                description:
                    "Are the main objectives, provisions, or changes the policy introduces clearly stated? Does it specify what the policy aims to achieve?",
            },
            {
                title: "Comprehension",
                description:
                    "Is the policy text accessible, logically structured, and free of contradictions? Does it use clear language, headings, or summaries that aid understanding?",
            },
        ],
    },
    {
        id: 2,
        title: "Does the Draft Thoroughly Assess the Impact?",
        description:
            "This area evaluates the depth and breadth of impact analysis in the policy document.",
        criteria: [
            {
                title: "Problem Identification",
                description:
                    "Does the policy define the root cause or specific issue it aims to address? Are challenges or market failures clearly outlined?",
            },
            {
                title: "Evidence for the Problem",
                description:
                    "Does the policy provide data, research, or statistics to illustrate the problem? Are references or external studies cited?",
            },
            {
                title: "Cost-Benefit Analysis",
                description:
                    "Does the policy include an economic or financial appraisal of its measures? Does it weigh potential benefits against costs or risks?",
            },
            {
                title: "Alternatives",
                description:
                    "Does the draft discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
            },
            {
                title: "Stakeholder Impacts",
                description:
                    "How does the policy affect regulated entities, intended beneficiaries, and indirect stakeholders like communities or supply-chain actors?",
            },
            {
                title: "Environmental Considerations",
                description:
                    "Does the policy mention potential environmental impacts? Does it provide mitigation measures?",
            },
            {
                title: "Time Frames",
                description:
                    "Are there clear timelines for implementation or achieving policy goals? Does it distinguish between short-, medium-, and long-term impacts?",
            },
            {
                title: "Continuous Evaluation",
                description:
                    "Is there a mechanism for ongoing monitoring or iterative review? Are oversight committees or annual reporting procedures mentioned?",
            },
            {
                title: "Territorial Impact",
                description:
                    "Does the policy address geographic considerations (rural vs. urban, different zones or clusters)? Are regional disparities or localized impacts accounted for?",
            },
        ],
    },
];

app.get('/api/assessments', (req, res) => {
    res.json(assessments);
});


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
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({
            email: user.email,
            name: user.name,
            token: user.token,
            avatarUrl: 'https://github.com/shadcn.png'
          });
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
