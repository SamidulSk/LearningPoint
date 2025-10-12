import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    BookOpen, 
    User, 
    Play, 
    CreditCard, 
    Clock, 
    Award,
    CheckCircle,
    Star,
    Users,
    TrendingUp,
    ArrowLeft,
    Sparkles
} from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth);

    const features = [
        { icon: BookOpen, label: "Comprehensive Content", value: "Full Access" },
        { icon: Clock, label: "Learn at Your Pace", value: "Lifetime Access" },
        { icon: Award, label: "Certificate", value: "On Completion" },
        { icon: Users, label: "Community", value: "24/7 Support" }
    ];

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Back Button */}
                <div className="px-6 md:px-20 pt-8">
                    <motion.button
                        onClick={() => navigate(-1)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Courses</span>
                    </motion.button>
                </div>

                {/* Main Content */}
                <div className="px-6 md:px-20 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Course Media & Details */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-2 space-y-8"
                            >
                                {/* Course Title */}
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/20 rounded-full px-4 py-2 backdrop-blur-sm mb-4"
                                    >
                                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                            Premium Course
                                        </span>
                                    </motion.div>

                                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                                        {state?.title}
                                    </h1>

                                    {/* Rating and Stats */}
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            ))}
                                            <span className="ml-2 font-semibold">4.9 (2.5k reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>12,45 students enrolled</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>Best Seller</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Image */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative group rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                    <img
                                        className="w-full h-96 object-cover"
                                        alt="thumbnail"
                                        src={state?.thumbnail?.secure_url}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                                            <Play className="w-10 h-10 text-indigo-600 ml-1" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Course Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                        Course Description
                                    </h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                        {state?.description}
                                    </p>
                                </motion.div>

                                {/* What You'll Learn */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        What You'll Learn
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Master the fundamentals and advanced concepts",
                                            "Build real-world projects from scratch",
                                            "Get industry-ready skills and knowledge",
                                            "Access to exclusive resources and materials",
                                            "Learn best practices and modern techniques",
                                            "Join a community of fellow learners"
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Features Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                >
                                    {features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-white/20 dark:border-gray-700/20 text-center hover:scale-105 transition-transform duration-300"
                                        >
                                            <feature.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                {feature.label}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {feature.value}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Right Column - Sticky Sidebar */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-8 space-y-6">
                                    {/* Course Info Card */}
                                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl">
                                        <div className="space-y-6">
                                            {/* Instructor */}
                                            <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        Instructor
                                                    </div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {state?.createdBy}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course Stats */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <BookOpen className="w-5 h-5" />
                                                        <span>Total Lectures</span>
                                                    </div>
                                                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                                        {state?.numberOfLectures}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <Clock className="w-5 h-5" />
                                                        <span>Duration</span>
                                                    </div>
                                                    <span className="font-bold text-gray-900 dark:text-white">
                                                        1 year
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <Award className="w-5 h-5" />
                                                        <span>Certificate</span>
                                                    </div>
                                                    <span className="font-bold text-gray-900 dark:text-white">
                                                        Included
                                                    </span>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                                    <motion.button
                                                        onClick={() => navigate("/course/displaylectures", { state: { ...state } })}
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                                            <Play className="w-5 h-5" />
                                                            Watch Lectures
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </motion.button>
                                                ) : (
                                                    <motion.button
                                                        onClick={() => navigate("/checkout")}
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="w-full relative group bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 overflow-hidden"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                                            <CreditCard className="w-5 h-5" />
                                                            Subscribe Now
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </motion.button>
                                                )}
                                            </div>

                                            {/* Trust Badge */}
                                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                                                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span>30-Day Money-Back Guarantee</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;