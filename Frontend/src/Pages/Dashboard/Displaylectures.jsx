import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    Play, 
    Plus, 
    Trash2, 
    BookOpen, 
    Lock,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Clock,
    Video
} from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function Displaylectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role, data } = useSelector((state) => state.auth);
    const subscription = data?.subscription;

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteCourseLecture({ courseId, lectureId }));
        await dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        if (!state) navigate("/courses");

        if (role === "ADMIN" || subscription?.status === "active") {
            dispatch(getCourseLectures(state._id));
        }
    }, [state, role, subscription]);

    if (!state) return null;

    const hasAccess = role === "ADMIN" || subscription?.status === "active";

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-20 pb-16 px-6 md:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Back Button */}
                        <motion.button
                            onClick={() => navigate(-1)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: -5 }}
                            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Course</span>
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                                {state?.title}
                            </h1>
                            <div className="flex items-center justify-center gap-6 text-white/80">
                                <div className="flex items-center gap-2">
                                    <Video className="w-5 h-5" />
                                    <span>{lectures?.length || 0} Lectures</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>Learn at your pace</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 md:px-20 py-12">
                    <div className="max-w-7xl mx-auto">
                        {!hasAccess ? (
                            // No Access Message
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-2xl mx-auto"
                            >
                                <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl p-12 text-center border border-white/20 dark:border-gray-700/20 shadow-2xl">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                                        <Lock className="w-10 h-10 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        Subscription Required
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                        You need an active subscription to access the course lectures and materials.
                                    </p>
                                    <motion.button
                                        onClick={() => navigate("/checkout")}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Subscribe Now
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : lectures && lectures.length > 0 ? (
                            // Lectures Content
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Video Player Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="lg:col-span-2 space-y-6"
                                >
                                    {/* Video Card */}
                                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 shadow-2xl">
                                        <div className="relative aspect-video bg-black">
                                            <video
                                                src={lectures[currentVideo]?.lecture?.secure_url}
                                                className="w-full h-full object-contain"
                                                controls
                                                disablePictureInPicture
                                                controlsList="nodownload"
                                            />
                                        </div>
                                    </div>

                                    {/* Lecture Details */}
                                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                <Play className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                        Lecture {currentVideo + 1}
                                                    </span>
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                                    {lectures[currentVideo]?.title}
                                                </h2>
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {lectures[currentVideo]?.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Indicator */}
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    Course Progress
                                                </span>
                                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                    {currentVideo + 1} / {lectures.length}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${((currentVideo + 1) / lectures.length) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Lecture List Sidebar */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="lg:col-span-1"
                                >
                                    <div className="sticky top-8">
                                        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden">
                                            {/* Sidebar Header */}
                                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                        <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                                        Course Content
                                                    </h3>
                                                </div>
                                                {role === "ADMIN" && (
                                                    <motion.button
                                                        onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Add New Lecture
                                                    </motion.button>
                                                )}
                                            </div>

                                            {/* Lecture List */}
                                            <div className="max-h-[600px] overflow-y-auto">
                                                <div className="p-4 space-y-2">
                                                    {lectures.map((lecture, idx) => (
                                                        <motion.div
                                                            key={lecture._id}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.05 }}
                                                            onClick={() => setCurrentVideo(idx)}
                                                            className={`group cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                                                                currentVideo === idx
                                                                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                                                                    : "bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700"
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                                    currentVideo === idx
                                                                        ? "bg-white/20"
                                                                        : "bg-indigo-100 dark:bg-indigo-900/30"
                                                                }`}>
                                                                    <span className={`text-sm font-bold ${
                                                                        currentVideo === idx
                                                                            ? "text-white"
                                                                            : "text-indigo-600 dark:text-indigo-400"
                                                                    }`}>
                                                                        {idx + 1}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className={`font-semibold text-sm mb-1 truncate ${
                                                                        currentVideo === idx
                                                                            ? "text-white"
                                                                            : "text-gray-900 dark:text-white"
                                                                    }`}>
                                                                        {lecture?.title}
                                                                    </h4>
                                                                    {role === "ADMIN" && (
                                                                        <motion.button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                onLectureDelete(state._id, lecture._id);
                                                                            }}
                                                                            whileHover={{ scale: 1.05 }}
                                                                            whileTap={{ scale: 0.95 }}
                                                                            className={`flex items-center gap-1 text-xs font-medium mt-2 ${
                                                                                currentVideo === idx
                                                                                    ? "text-white/80 hover:text-white"
                                                                                    : "text-red-600 dark:text-red-400 hover:text-red-700"
                                                                            }`}
                                                                        >
                                                                            <Trash2 className="w-3 h-3" />
                                                                            Delete
                                                                        </motion.button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            // No Lectures Message
                            role === "ADMIN" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl p-12 text-center border border-white/20 dark:border-gray-700/20 shadow-2xl">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-6">
                                            <AlertCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            No Lectures Yet
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                            This course doesn't have any lectures yet. Add your first lecture to get started.
                                        </p>
                                        <motion.button
                                            onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add First Lecture
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;