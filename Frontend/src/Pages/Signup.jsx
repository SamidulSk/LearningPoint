import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Upload, Sparkles, CheckCircle } from "lucide-react";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const getImage = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setSignupData({ ...signupData, avatar: uploadedImage });
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = () => setPreviewImage(reader.result);
    }
  };

  const createNewAccount = async (e) => {
    e.preventDefault();
    const { fullName, email, password, avatar } = signupData;

    if (!fullName || !email || !password) {
      toast.error("Please fill all the details");
      return;
    }
    if (fullName.length < 3) {
      toast.error("Name should be at least 3 characters");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Invalid email id");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error("Password should be 4 - 12 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/");

    setSignupData({ fullName: "", email: "", password: "", avatar: "" });
    setPreviewImage("");
  };

  return (
    <HomeLayout>
      <div className="relative flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center">
              <div className="absolute inset-0 bg-black/10"></div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative"
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">Join Our Community</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Create Account</h1>
                <p className="text-white/90 text-sm">Start your learning journey today</p>
              </motion.div>
            </div>

            {/* Form Content */}
            <form onSubmit={createNewAccount} className="p-8 space-y-6" noValidate>
              {/* Avatar Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-3"
              >
                <label htmlFor="image_uploads" className="cursor-pointer group relative">
                  <div className="relative">
                    {previewImage ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={previewImage}
                          alt="Avatar Preview"
                          className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-300">
                          <BsPersonCircle className="w-16 h-16 text-gray-400 dark:text-gray-300" />
                        </div>
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload your profile picture</p>
                <input
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg,.jpeg,.png,.svg"
                  className="hidden"
                  onChange={getImage}
                />
              </motion.div>

              {/* Full Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className={`relative group ${focusedField === 'fullName' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'fullName' ? 'text-indigo-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={signupData.fullName}
                    onChange={handleUserInput}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                  />
                  {signupData.fullName && signupData.fullName.length >= 3 && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className={`relative group ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={handleUserInput}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                  />
                  {signupData.email && isEmail(signupData.email) && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className={`relative group ${focusedField === 'password' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (4-12 characters)"
                    value={signupData.password}
                    onChange={handleUserInput}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                  />
                  {signupData.password && isValidPassword(signupData.password) && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Create Account
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              {/* Login Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-sm text-gray-600 dark:text-gray-400"
              >
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Login here
                </Link>
              </motion.p>
            </form>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>No Credit Card</span>
            </div>
          </motion.div>
        </motion.div>
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
      `}</style>
    </HomeLayout>
  );
}

export default Signup;