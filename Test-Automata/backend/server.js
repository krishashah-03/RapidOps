// import express from "express";
// import multer from "multer";
// import cors from "cors";
// import fs from "fs";
// import axios from "axios";

// const app = express();
// const port = 8080;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: "GET,POST",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // File upload setup
// const upload = multer({ dest: "uploads/" });

// // Route to handle POST request
// app.post("/generate", upload.single("file"), async (req, res) => {
//   const { requirements, websiteLink } = req.body;
//   const file = req.file ? req.file.originalname : "No file uploaded";
//   console.log("Received requirements:", requirements);
//   console.log("Received website link:", websiteLink);
//   const newData = { requirements, websiteLink };

//   // Write to JSON file
//   fs.writeFileSync("./ai-agent/requirements.json", JSON.stringify(newData, null, 2), "utf8");

 
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import axios from "axios";
import path from "path";
const app = express();
const port = 8080;
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// File upload setup
const upload = multer({ dest: "uploads/" });
async function getResultsData() {
  const filePath = path.join(__dirname, 'data', '/ai-agent/results.json');
  try {
    const data = fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading or parsing results.json:', err);
    throw err;
  }
}
app.get("/results", (req, res) => {
  const filePath = path.join(__dirname, "ai-agent", "results.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading results.json:", err);
      return res.status(500).send("Error reading results.json");
    }
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing results.json:", parseError);
      res.status(500).send("Error parsing results.json");
    }
  });
});
app.get("/test_cases", (req, res) => {
  const filePath = path.join(__dirname, "ai-agent", "test_cases.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading test-cases.json:", err);
      return res.status(500).send("Error reading results.json");
    }
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing results.json:", parseError);
      res.status(500).send("Error parsing results.json");
    }
  });
});
// Route to handle POST request
app.post("/generate", upload.single("file"), async (req, res) => {
  const { requirements, websiteLink } = req.body;
  const file = req.file ? req.file.originalname : "No file uploaded";
  console.log("Received requirements:", requirements);
  console.log("Received website link:", websiteLink);

  const newData = { requirements, websiteLink };

  // Write to JSON file
  fs.writeFileSync("./ai-agent/requirements.json", JSON.stringify(newData, null, 2), "utf8");

  try {
    // Make a request to the Flask server
    const flaskResponse = await axios.get("http://localhost:5000/test");
    console.log("Flask server response:", flaskResponse.data);
    try {
      const response = await axios.get('http://localhost:8080/results');
      const response1 = await axios.get('http://localhost:8080/test_cases');
      res.json(response.data);
  } catch (error) {
      console.error('❌ Error fetching results:', error.message);
      res.status(500).json({ message: 'Error fetching results' });
  }
    // res.json({ message: "Testcases generated and processeed!" });
  } catch (error) {
    console.error("Error calling Flask server:", error.message);
    res.status(500).json({ message: "Failed to call Flask server!" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
