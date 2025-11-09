import React, { useState } from "react";
import { Star } from "lucide-react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🌿 Thank you for your feedback!");
    setFormData({ name: "", email: "", feedback: "" });
    setRating(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-green-700 mb-6">
          We Value Your Feedback 🌱
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 👤 Username */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* 📧 Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* 💬 Feedback Box */}
          <textarea
            name="feedback"
            placeholder="Write your feedback..."
            value={formData.feedback}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none"
          />

          {/* ⭐ 5-Star Rating */}
          <div className="flex justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <Star
                  key={i}
                  size={32}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  className={`cursor-pointer transition-transform duration-200 ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>

          {/* 🟢 Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
