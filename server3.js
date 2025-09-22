import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// Middleware
app.use(cookieParser());

// Route to set a cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "ByteBreaker", {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,         // Secure from client-side JS
  });
  res.send("✅ Cookie has been set!");
});

// Route to read a cookie
app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`🍪 Cookie Value: ${username}`);
  } else {
    res.send("❌ No cookie found.");
  }
});

// Route to clear a cookie
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("🗑️ Cookie cleared!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
