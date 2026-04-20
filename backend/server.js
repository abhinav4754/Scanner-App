const express = require("express");
const cors = require("cors");
const scanRoutes = require("./routes/scanRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use('/api/reports', express.static('reports'));
app.use('/api/scan/reports', express.static(path.join(__dirname, 'reports')));
// File uploads served statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/zap_reports",express.static(path.join(__dirname,"zap_reports")));

// Routes
app.use("/api", scanRoutes);
app.use("/api", contactRoutes);

// Basic health/info endpoint for root
app.get("/", (req, res) => {
	res.send("Backend is running. Use /api endpoints (e.g., POST /api/scan).");
});

app.get('/health', (req, res) => {
	res.send("OK");
});

if (require.main === module) {
  app.listen(3000, () => console.log("Server running"));
}

module.exports = app;