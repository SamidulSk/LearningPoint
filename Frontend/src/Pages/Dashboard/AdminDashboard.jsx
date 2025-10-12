import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    TrendingUp, 
    Users, 
    DollarSign, 
    BookOpen, 
    Plus,
    Play,
    Trash2,
    BarChart3,
    PieChart as PieChartIcon,
    Sparkles
} from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
    const myCourses = useSelector((state) => state?.course?.courseData);

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedCount],
                backgroundColor: ["#6366f1", "#10b981"],
                borderWidth: 2,
                borderColor: ["#4f46e5", "#059669"]
            },
        ]
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: "#8b5cf6",
                borderColor: "#7c3aed",
                borderWidth: 2
            }
        ]
    };

    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete the course?")) {
            const res = await dispatch(deleteCourse(id));
            if(res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllCourses());
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
        })();
    }, []);

    const statCards = [
        {
            title: "Registered Users",
            value: allUsersCount,
            icon: Users,
            gradient: "from-blue-500 to-cyan-500",
            textColor: "text-blue-600"
        },
        {
            title: "Subscribed Users",
            value: subscribedCount,
            icon: Users,
            gradient: "from-green-500 to-emerald-500",
            textColor: "text-green-600"
        },
        {
            title: "Subscription Count",
            value: allPayments?.count,
            icon: TrendingUp,
            gradient: "from-purple-500 to-pink-500",
            textColor: "text-purple-600"
        },
        {
            title: "Total Revenue",
            value: `$${allPayments?.count * 3}`,
            icon: DollarSign,
            gradient: "from-yellow-500 to-orange-500",
            textColor: "text-yellow-600"
        }
    ];

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-20 pb-16 px-6 md:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">Admin Control Panel</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                            Admin Dashboard
                        </h1>
                        <p className="text-xl text-white/90">
                            Manage your platform, courses, and analytics
                        </p>
                    </motion.div>
                </div>

                {/* Stats Cards */}
                <div className="px-6 md:px-20 -mt-12 mb-12">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>
                                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                                    {stat.title}
                                </h3>
                                <p className={`text-3xl font-bold ${stat.textColor} dark:text-white`}>
                                    {stat.value || 0}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Charts Section */}
                <div className="px-6 md:px-20 mb-12">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* User Distribution Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <PieChartIcon className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    User Distribution
                                </h2>
                            </div>
                            <div className="w-full h-80 flex items-center justify-center">
                                <div className="w-80 h-80">
                                    <Pie data={userData} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Sales Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Monthly Sales
                                </h2>
                            </div>
                            <div className="w-full h-80">
                                <Bar data={salesData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="px-6 md:px-20 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden"
                        >
                            {/* Table Header */}
                            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Courses Overview
                                        </h2>
                                    </div>
                                    <motion.button
                                        onClick={() => navigate("/course/create")}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Create New Course
                                    </motion.button>
                                </div>
                            </div>

                            {/* Table Content */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                Course Title
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                Instructor
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                Lectures
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {myCourses?.map((course, idx) => (
                                            <motion.tr
                                                key={course._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                    <div className="max-w-xs">
                                                        <p className="font-semibold truncate">{course?.title}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                                            {course?.description}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                                                        {course?.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    {course?.createdBy}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                                    {course?.numberOfLectures}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                                                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                                                            title="View Lectures"
                                                        >
                                                            <Play className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => onCourseDelete(course?._id)}
                                                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                                                            title="Delete Course"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Empty State */}
                            {(!myCourses || myCourses.length === 0) && (
                                <div className="p-12 text-center">
                                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        No courses yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Get started by creating your first course
                                    </p>
                                    <motion.button
                                        onClick={() => navigate("/course/create")}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
                                    >
                                        Create First Course
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;