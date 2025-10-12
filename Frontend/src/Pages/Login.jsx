import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles, Shield, Zap } from "lucide-react";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");
    setLoginData({ email: "", password: "" });
  };

  return (
    <HomeLayout>
      <div className="relative flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-center">
              <div className="absolute inset-0 bg-black/10"></div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                  <LogIn className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Back</h1>
                <p className="text-white/90 text-sm">Login to continue your learning journey</p>
              </motion.div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <div className={`relative group ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleUserInput}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className={`relative group ${focusedField === 'password' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleUserInput}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </motion.div>
                {/* Forgot Password Link */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex justify-end mt-2"
                >
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300"
                  >
                    Forgot Password?
                  </Link>
                </motion.div>


                {/* Submit Button */}
                <motion.button
                  type="button"
                  onClick={onLogin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Login to Account
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400">
                      New to our platform?
                    </span>
                  </div>
                </motion.div>

                {/* Signup Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 py-3 rounded-xl font-semibold"
                    >
                      Create New Account
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center border border-white/40 dark:border-gray-700/40">
              <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Secure</span>
            </div>
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center border border-white/40 dark:border-gray-700/40">
              <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Fast</span>
            </div>
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center border border-white/40 dark:border-gray-700/40">
              <Sparkles className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Premium</span>
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400"
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </motion.p>
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

export default Login;