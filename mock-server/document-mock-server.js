const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 8000;

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
  const warning = file.originalname.toLowerCase().includes("test")
    ? "This document has already been uploaded."
    : null;

  // Optional delay
  setTimeout(() => {
    res.json({ fileName, warning });
  }, 1000); // 1 sec delay
});

// Summarize Endpoint
app.post('/summarize', (req, res) => {
  const { fileName } = req.body;
  if (!fileName) return res.status(400).json({ error: "fileName is required" });

  setTimeout(() => {
    if (Math.random() < 0.2) {
      return res.status(500).json({ error: "Summarization failed. Try again later." });
    }

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

app.listen(PORT, () => {
  console.log(`✅ Mock server running at http://localhost:${PORT}`);
});
