import React, { useState } from "react";
import { Star } from "lucide-react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/; // eslint-disable-line no-useless-escape

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", feedback: "" });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      if (value && !EMAIL_REGEX.test(value)) {
        setEmailError("Please enter a valid email address (e.g. user@example.com)");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailError("Please enter a valid email address (e.g. user@example.com)");
      return;
    }
    alert("🌿 Thank you for your feedback!");
    setFormData({ name: "", email: "", feedback: "" });
    setEmailError("");
    setRating(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-green-700 mb-6">
          We Value Your Feedback 🌱
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <div>
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${
                emailError
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <textarea
            name="feedback"
            placeholder="Write your feedback..."
            value={formData.feedback}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none"
          />

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