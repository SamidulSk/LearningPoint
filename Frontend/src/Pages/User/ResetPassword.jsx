import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, Key, Shield, CheckCircle, Eye, EyeOff, Loader, Sparkles } from "lucide-react";
import HomeLayout from "../../Layouts/HomeLayout";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

      const res = await axios.post(`${BASE_URL}/user/reset/${token}`, { password });
      toast.success(res.data?.message || "Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <HomeLayout>
      <div className="relative flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

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
                  <Key className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Reset Password</h1>
                <p className="text-white/90 text-sm">Create a new password for your account</p>
              </motion.div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900 dark:text-blue-200 font-medium mb-1">
                        Choose a Strong Password
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Your password should be 4-12 characters long and unique to this account.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className={`relative ${focusedField ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField(true)}
                      onBlur={() => setFocusedField(false)}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Password Strength Indicator */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 ${password.length >= 4 && password.length <= 12 ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className={password.length >= 4 && password.length <= 12 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                        4-12 characters
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className={`w-full relative group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 overflow-hidden ${
                    loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-indigo-500/50'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Reset Password
                      </>
                    )}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </motion.button>

                {/* Security Tips */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                        Password Tips
                      </h3>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Use a unique password you don't use elsewhere</li>
                        <li>• Mix letters, numbers, and symbols if possible</li>
                        <li>• Avoid common words or personal information</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center border border-white/40 dark:border-gray-700/40">
              <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Secure</span>
            </div>
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center border border-white/40 dark:border-gray-700/40">
              <CheckCircle className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Verified</span>
            </div>
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center border border-white/40 dark:border-gray-700/40">
              <Lock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Encrypted</span>
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

export default ResetPassword;