import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

function CarouselSlide({ image, title, description, slideNumber, totalSlides }) {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <div className="flex flex-col items-center justify-center gap-6 px-6 md:px-[15%] py-12">
        {/* Image with Animations */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="relative"
        >
          {/* Gradient Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
          
          {/* Image */}
          <motion.img
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
            src={image}
            alt={title}
            className="relative w-32 md:w-40 h-32 md:h-40 rounded-full border-4 border-white dark:border-gray-700 object-cover shadow-2xl"
          />
          
          {/* Quote Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg"
          >
            <Quote className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Description with Quote Marks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-3xl"
        >
          {/* Opening Quote */}
          <div className="absolute -top-6 -left-4 text-6xl text-indigo-200 dark:text-indigo-900 opacity-50">
            "
          </div>
          
          <p className="text-center text-gray-700 dark:text-gray-300 text-base md:text-xl leading-relaxed italic px-8">
            {description}
          </p>
          
          {/* Closing Quote */}
          <div className="absolute -bottom-6 -right-4 text-6xl text-indigo-200 dark:text-indigo-900 opacity-50">
            "
          </div>
        </motion.div>

        {/* Title/Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {title}
          </h3>
          
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
          {/* Previous Button */}
          <motion.a
            href={`#slide${slideNumber === 1 ? totalSlides : slideNumber - 1}`}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:border-transparent transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
          </motion.a>

          {/* Next Button */}
          <motion.a
            href={`#slide${(slideNumber % totalSlides) + 1}`}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
          </motion.a>
        </div>

        {/* Slide Indicator Dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 mt-4"
        >
          {[...Array(totalSlides)].map((_, index) => (
            <a
              key={index}
              href={`#slide${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index + 1 === slideNumber
                  ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default CarouselSlide;