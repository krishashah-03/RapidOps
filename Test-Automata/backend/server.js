import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const port = 8000;

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

// Route to handle POST request
app.post("/generate", upload.single("file"), (req, res) => {
  const { requirements, websiteLink } = req.body;
  const file = req.file ? req.file.originalname : "No file uploaded";
console.log("Received requirements:", requirements);
  console.log("Received website link:", websiteLink);
  res.json({
    message: "Request received successfully",
    requirements,
    websiteLink,
    file,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
