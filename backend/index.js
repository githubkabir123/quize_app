const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const protect = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const studyRoutes = require('./routes/studyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
app.use(bodyParser.json());

app.use("/api/auth",(req,res,next)=>{ console.log("Auth Route Hit"); next(); });

app.use("/api/auth", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", attemptRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
