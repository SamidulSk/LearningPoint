import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  BookOpen, 
  Mail, 
  Info, 
  LayoutDashboard, 
  PlusCircle, 
  User, 
  LogOut,
  GraduationCap,
  Sparkles
} from "lucide-react";
import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    ...(isLoggedIn && role === "ADMIN"
      ? [
          { to: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
          { to: "/course/create", label: "Create Course", icon: PlusCircle },
        ]
      : []),
    { to: "/courses", label: "All Courses", icon: BookOpen },
    { to: "/contact", label: "Contact Us", icon: Mail },
    { to: "/about", label: "About Us", icon: Info },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* Modern Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Menu Button */}
          <motion.button
            onClick={toggleDrawer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FiMenu size={24} className="text-white relative z-10" />
            <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <motion.span
              className="absolute inset-0 rounded-xl bg-white/30"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
          
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
            >
              <GraduationCap className="w-6 h-6 text-white" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </motion.div>
            </motion.div>

            <div className="relative">
              <motion.div 
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                style={{ 
                  backgroundSize: "200% 200%",
                  backgroundImage: "linear-gradient(90deg, #2563eb, #9333ea, #db2777, #2563eb)"
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                LearningPoint
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              />
            </div>
          </motion.div>
          
          <div className="w-12"></div>
        </div>
      </motion.header>

      {/* Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Modern Sidebar Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isDrawerOpen ? 0 : "-100%" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50"
      >
        {/* Drawer Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <motion.button
            onClick={closeDrawer}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          >
            <AiFillCloseCircle size={28} className="text-white" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mt-2">Navigation</h2>
            <p className="text-blue-100 text-sm mt-1">Explore our platform</p>
          </motion.div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)]">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={link.to}
                onClick={closeDrawer}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:translate-x-2 hover:shadow-md"
              >
                <link.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:scale-110 transition-all duration-300" />
                <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-100/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm">
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={closeDrawer}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup" onClick={closeDrawer}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/user/profile" onClick={closeDrawer}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </motion.button>
                </Link>
                <motion.button
                  onClick={(e) => {
                    handleLogout(e);
                    closeDrawer();
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;