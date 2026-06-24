import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const LEADS_FILE = path.join(process.cwd(), "leads.json");

// Helper to safe-load leads from local disk JSON
async function loadLeads() {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to safe-save leads on local disk JSON
async function saveLeads(leads: any[]) {
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write leads file:", error);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route - Submit a new lead
  app.post("/api/leads", async (req, res) => {
    try {
      const { name, phone, email, company, role, urgency } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are mandatory fields." });
      }

      const lead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        phone: phone || "",
        email,
        company: company || "",
        role: role || "",
        urgency: urgency || "",
        createdAt: new Date().toISOString(),
      };

      const leads = await loadLeads();
      leads.unshift(lead);
      await saveLeads(leads);

      res.status(201).json({ success: true, lead });
    } catch (err: any) {
      console.error("Failed to add lead:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  // API Route - Retrieve leads (password guarded)
  app.get("/api/leads", async (req, res) => {
    try {
      const password = req.query.password || req.headers["authorization"];
      if (password !== "787898") {
        return res.status(401).json({ error: "Access denied. Invalid password." });
      }

      const leads = await loadLeads();
      res.json({ success: true, leads });
    } catch (err) {
      console.error("Failed to load leads:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  // Initialize Vite inside Express
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Fallback all routes to spa index
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded and listening on port ${PORT}`);
  });
}

startServer();
