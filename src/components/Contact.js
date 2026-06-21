import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setStatus("Message sent successfully!");
    } catch (error) {
      setStatus("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-16">
      {/* Enhanced Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-teal-600 to-blue-600 p-8 sm:p-16">
          <div className="relative z-10 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 animate-fade-in">
              Contact Us
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message, and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        </div>
      </div>

      {/* Enhanced Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-10 shadow-2xl rounded-2xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-lg">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-lg">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-3 text-lg">Your Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 h-48"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-xl text-center font-semibold text-lg ${status.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;