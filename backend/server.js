const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 5000;

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());

/* ------------------ DATA ------------------ */
const supporters = [
  {
    id: 1,
    name: "Aarav Sharma",
    qualification: "Psychology Student",
    institution: "XYZ University",
    areas: ["Stress", "Academics"],
    isVerified: true,
  },
  {
    id: 2,
    name: "Meera Patel",
    qualification: "Psychology Graduate",
    institution: "ABC College",
    areas: ["Anxiety", "Self-esteem"],
    isVerified: true,
  },
];

const supportRequests = [];

/* ------------------ ROUTES ------------------ */

// Test backend
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get supporters
app.get("/api/supporters", (req, res) => {
  res.json(supporters);
});

// Create support request
app.post("/api/request", (req, res) => {
  const { seekerName, supporterId, issue } = req.body;

  if (!seekerName || !supporterId || !issue) {
    return res.status(400).json({ message: "Missing data" });
  }

  const newRequest = {
    id: supportRequests.length + 1,
    seekerName,
    supporterId,
    issue,
    status: "pending",
  };

  supportRequests.push(newRequest);
  console.log("New request:", newRequest);

  res.json(newRequest);
});

// Get all requests
app.get("/api/requests", (req, res) => {
  res.json(supportRequests);
});

// Get requests for a seeker
app.get("/api/requests/seeker/:name", (req, res) => {
  const name = req.params.name;
  const myRequests = supportRequests.filter(
    (r) => r.seekerName === name
  );
  res.json(myRequests);
});
// Get requests for a specific seeker
app.get("/api/requests/seeker/:username", (req, res) => {
  const username = req.params.username;

  const seekerRequests = supportRequests.filter(
    r => r.seekerName === username
  );

  res.json(seekerRequests);
});

// Accept / Reject request
app.patch("/api/request/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const request = supportRequests.find((r) => r.id === id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = status;
  console.log(`Request ${id} -> ${status}`);

  res.json(request);
});

/* ------------------ SOCKET.IO ------------------ */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join chat room (requestId)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Send message
  socket.on("sendMessage", ({ roomId, sender, message }) => {
    io.to(roomId).emit("receiveMessage", {
      sender,
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ------------------ START SERVER ------------------ */
server.listen(PORT, () => {
  console.log(`🚀 SERVER STARTED ON PORT ${PORT}`);
});

