import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white relative overflow-hidden">
      
      {/* Animated glowing circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl top-16 left-10"
          animate={{ y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-700/20 rounded-full blur-3xl bottom-16 right-10"
          animate={{ y: [0, -40, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </div>

      {/* 404 text */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[10rem] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-gray-300 mb-6"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="px-8 py-3 border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-md"
        >
          Go Back
        </motion.button>

        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-md"
        >
          Go Home
        </motion.button>
      </div>
    </main>
  );
}

export default NotFound;
