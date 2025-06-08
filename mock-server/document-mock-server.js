const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { documentTypes, assessmentPrompts } = require('./document-types');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

// Use multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'File is required' });

  const fileName = `${Date.now()}-${file.originalname}`;
  const docId = `${Date.now()}-${file.originalname}`;
  const warning = file.originalname.toLowerCase().includes("test")
    ? "This document has already been uploaded."
    : null;

  // Optional delay
  setTimeout(() => {
    res.json({ fileName, docId, warning });
  }, 100); // 1 sec delay
});

// Summarize Endpoint
app.post('/summarize', (req, res) => {
  const { docId } = req.body;
  if (!docId) return res.status(400).json({ error: "docId is required" });

  setTimeout(() => {
    // if (Math.random() < 0.2) {
    //   return res.status(500).json({ error: "Summarization failed. Try again later." });
    // }

    res.json({
      summaryPoints: [
        "Reducing carbon emissions by 40% by 2035",
        "Implementing green building standards",
        "Expanding public transportation networks",
        "Creating community green spaces near residential areas",
        "Developing water conservation infrastructure"
      ],
      summaryText:
        "This mock summary shows key goals and implementation phases. It emphasizes inclusiveness, equity, and infrastructure development phased over time.",
    });
  }, 2000); // 2 sec delay
});

app.post('/evaluations', (req, res) => {
  const { docId } = req.body;

  // Simulate delay
  setTimeout(() => {
    if (!docId || docId === "invalid.doc") {
      return res.status(400).json({ error: "Invalid or missing docId" });
    }

    res.json({
      evaluations: [
        {
          question: 'What are the main policy objectives?',
          answer: 'Carbon reduction, green buildings, public transit, green space, and water conservation.',
          score: 9.5,
        },
        {
          question: 'How does this policy address equity concerns?',
          answer: 'Focus on equitable benefit distribution and community involvement.',
          score: 7.8,
        },
        {
          question: 'What is the implementation timeline?',
          answer: 'Phased: regulation (1–2), investment (3–7), monitoring (8–10).',
          score: 9.0,
        },
        {
          question: 'What funding mechanisms are proposed?',
          answer: 'Public-private partnerships and federal grants are mentioned, but lacking detail.',
          score: 5.2,
        },
      ],
    });
  }, 1500);
});

app.post('/score', (req, res) => {
  const { docId } = req.body;

  setTimeout(() => {
    if (!docId) {
      return res.status(400).json({ error: 'Missing docId' });
    }

    res.json({
      overallScore: "8.4",
      clarityRating: "93%",
      implementationDetail: "87%",
      stakeholderEngagement: "76%",
      policyElementScores: [
        { name: "Objectives", value: 25 },
        { name: "Implementation", value: 20 },
        { name: "Clarity", value: 20 },
        { name: "Equity", value: 15 },
        { name: "Funding", value: 20 },
      ],
      performanceByCategory: [
        { name: "Environmental", score: 88 },
        { name: "Economic", score: 65 },
        { name: "Social", score: 78 },
        { name: "Governance", score: 80 },
        { name: "Technology", score: 70 },
      ],
    });
  }, 1500);
});

// Document type endpoints
app.get('/document-types', (req, res) => {
  res.json(documentTypes);
});

app.get('/document-types/:typeId/assessments', (req, res) => {
  const { typeId } = req.params;
  //const typeAssessments = assessmentPrompts[typeId] || [];
  res.json(assessmentPrompts);
});

// Get prompts for a specific assessment
app.get('/assessments/:assessmentId/prompts', (req, res) => {
  const { assessmentId } = req.params;
  let prompts = [];
  
  // Search through all document types for the assessment
  Object.values(assessmentPrompts).forEach(assessments => {
    const assessment = assessments.find(a => a.id === parseInt(assessmentId));
    if (assessment) {
      prompts = assessment.prompts;
    }
  });
  
  res.json(prompts);
});

app.listen(PORT, () => {
  console.log(`✅ Mock server running at http://localhost:${PORT}`);
});
