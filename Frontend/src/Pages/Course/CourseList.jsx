import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BookOpen, Filter, Search, Grid, List, Sparkles, TrendingUp } from "lucide-react";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("grid");

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    const filteredCourses = courseData?.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-20 pb-32 px-6 md:px-20 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-medium">Premium Learning Experience</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                                Explore Our Courses
                            </h1>
                            
                            <p className="text-xl text-white/90 mb-4">
                                Made with passion by{" "}
                                <span className="font-bold text-yellow-300">
                                    SAMIDUL
                                </span>
                            </p>

                            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    <span>{courseData?.length || 0} Courses</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Expert Instructors</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="relative z-20 -mt-16 px-6 md:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                {/* Search Bar */}
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            viewMode === "grid"
                                                ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-md"
                                                : "text-gray-600 dark:text-gray-400"
                                        }`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            viewMode === "list"
                                                ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-md"
                                                : "text-gray-600 dark:text-gray-400"
                                        }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold text-indigo-600 dark:text-indigo-400">{filteredCourses?.length || 0}</span> of <span className="font-semibold">{courseData?.length || 0}</span> courses
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Courses Grid/List */}
                <div className="px-6 md:px-20 py-16">
                    <div className="max-w-7xl mx-auto">
                        {filteredCourses && filteredCourses.length > 0 ? (
                            <motion.div
                                layout
                                className={`grid gap-8 ${
                                    viewMode === "grid"
                                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1"
                                }`}
                            >
                                {filteredCourses.map((element, index) => (
                                    <motion.div
                                        key={element._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        layout
                                    >
                                        <CourseCard data={element} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    No courses found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Try adjusting your search terms
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="px-6 md:px-20 py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join thousands of students and upgrade your skills today
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                        >
                            Browse All Courses
                        </motion.button>
                    </motion.div>
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
            `}</style>
        </HomeLayout>
    );
}

export default CourseList;