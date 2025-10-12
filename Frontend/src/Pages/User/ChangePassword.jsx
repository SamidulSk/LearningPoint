import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Shield, ArrowLeft, Eye, EyeOff, CheckCircle, Key, Sparkles } from "lucide-react";
import axios from "axios";

import HomeLayout from "../../Layouts/HomeLayout";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!passwords.oldPassword || !passwords.newPassword) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:4000/api/v1/user/changepassword",
        passwords,
        { withCredentials: true }
      );      
      toast.success(res?.data?.message || "Password updated successfully");
      navigate("/user/profile");
    } catch (err) {
      const msg = err.response?.data?.message || "Password update failed";
      toast.error(msg);
    }
  }

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
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Change Password</h1>
                <p className="text-white/90 text-sm">Secure your account with a new password</p>
              </motion.div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-indigo-900 dark:text-indigo-200 font-medium">
                        Password should be 4-12 characters long
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Old Password Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className={`relative group ${focusedField === 'oldPassword' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'oldPassword' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      id="oldPassword"
                      placeholder="Enter current password"
                      value={passwords.oldPassword}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('oldPassword')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showOldPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* New Password Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className={`relative group ${focusedField === 'newPassword' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'newPassword' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter new password"
                      value={passwords.newPassword}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('newPassword')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Password Strength Indicator */}
                {passwords.newPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 ${passwords.newPassword.length >= 4 && passwords.newPassword.length <= 12 ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className={passwords.newPassword.length >= 4 && passwords.newPassword.length <= 12 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                        4-12 characters
                      </span>
                    </div>
                  </motion.div>
                )}

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
                    Update Password
                    <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                {/* Back to Profile Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link to="/user/profile">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 py-3 rounded-xl font-semibold"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Profile
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Security Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-white/40 dark:border-gray-700/40"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  Security Tip
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use a unique password that you don't use for other accounts. Consider using a mix of letters, numbers, and symbols.
                </p>
              </div>
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

export default ChangePassword;