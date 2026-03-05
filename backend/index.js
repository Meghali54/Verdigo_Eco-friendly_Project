import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

import dotenv from "dotenv";
// import chatRoutes from './routes/chat.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to MongoDB successfully"))
.catch((error)=> console.error("MongoDB connection error:", error));

// routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use('/api', chatRoutes);

// app.get('/', (req, res) => {
//   res.json({
//     message: '🌱 VerdiGo Backend API is running!',
//     endpoints: [
//       'POST /api/chat - Text chat with ChatGPT',
//       'POST /api/analyze-image - Image analysis with AI'
//     ]
//   });
// });
