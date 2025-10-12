import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, MapPin, Phone, Clock, Sparkles } from "lucide-react";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = userInput;

    if (!name || !email || !message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({ name: "", email: "", message: "" });
      }
    } catch (err) {
      toast.error("Operation failed...");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Barasat,Kolkata,West Bengal,India",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Me",
      detail: "+91 9339145532",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: "24*7 Available",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <HomeLayout>
      <div className="relative min-h-[90vh] px-4 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                We'd Love to Hear From You
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Get in Touch With{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                Samidul
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions? I'm here to help and answer any question you might have
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                {/* Form Header */}
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-center">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                    <p className="text-white/80 text-sm mt-1">I'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Name Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className={`relative group ${focusedField === 'name' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-indigo-500' : 'text-gray-400'}`} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={userInput.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <div className={`relative group ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'}`} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={userInput.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </motion.div>

                    {/* Message Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      <div className={`relative group ${focusedField === 'message' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                        <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                          <MessageSquare className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-indigo-500' : 'text-gray-400'}`} />
                        </div>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          value={userInput.message}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows="5"
                          className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 resize-none focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="button"
                      onClick={onFormSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Contact Us Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 p-6 rounded-2xl border border-indigo-500/20"
              >
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
                  Why Contact With Me?
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Quick response within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Build Network with me</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    <span>Personalized solutions</span>
                  </li>
                </ul>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 text-center"
              >
                <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">I'm Online!</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I am is ready to assist you
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </HomeLayout>
  );
}

export default Contact;