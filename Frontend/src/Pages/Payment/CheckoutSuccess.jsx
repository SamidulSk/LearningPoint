import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Success Card */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 opacity-10 animate-pulse"></div>
                        
                        {/* Confetti Effect (decorative) */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-20 right-16 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="absolute top-32 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            <div className="absolute top-16 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                        </div>

                        {/* Header Section */}
                        <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-8 text-center">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <h1 className="relative text-3xl font-extrabold text-white drop-shadow-lg">
                                Payment Successful! 🎉
                            </h1>
                            <div className="relative mt-3 inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                                <p className="text-green-100 text-sm font-medium">
                                    Transaction completed
                                </p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="relative p-8 space-y-8">
                            {/* Success Icon with Animation */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    {/* Animated Success Rings */}
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse"></div>
                                    
                                    {/* Main Icon */}
                                    <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-full border-4 border-green-200 dark:border-green-700">
                                        <AiFillCheckCircle className="text-green-500 dark:text-green-400 text-7xl animate-bounce" style={{ animationDuration: '2s' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Welcome Message */}
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    Welcome to Pro Bundle! 🚀
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    You now have unlimited access to all our premium courses!
                                </p>
                            </div>

                            {/* Benefits Section */}
                            <div className="space-y-3">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl mt-1">📚</span>
                                        <div>
                                            <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                                                All Courses Unlocked
                                            </p>
                                            <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                                                Access every course in our library
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl mt-1">⏰</span>
                                        <div>
                                            <p className="font-semibold text-purple-800 dark:text-purple-300 text-sm">
                                                365 Days Access
                                            </p>
                                            <p className="text-purple-600 dark:text-purple-400 text-xs mt-1">
                                                Valid for one full year from today
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl mt-1">🏆</span>
                                        <div>
                                            <p className="font-semibold text-orange-800 dark:text-orange-300 text-sm">
                                                Certificates Included
                                            </p>
                                            <p className="text-orange-600 dark:text-orange-400 text-xs mt-1">
                                                Earn certificates for completed courses
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-4">
                                <Link 
                                    to="/"
                                    className="block w-full"
                                >
                                    <button className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                                        <span className="flex items-center justify-center gap-2">
                                            🏠 Go to Dashboard
                                        </span>
                                    </button>
                                </Link>

                                <Link 
                                    to="/courses"
                                    className="block w-full"
                                >
                                    <button className="w-full py-3 rounded-xl font-semibold text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300">
                                        <span className="flex items-center justify-center gap-2">
                                            🎓 Start Learning Now
                                        </span>
                                    </button>
                                </Link>
                            </div>

                            {/* Receipt Section */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="text-center">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                        A confirmation email has been sent to your inbox
                                    </p>
                                    <Link 
                                        to="/user/profile" 
                                        className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold text-sm transition-colors duration-300"
                                    >
                                        <span>📧</span>
                                        View Transaction Details
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Celebration */}
                    <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                        <p className="flex items-center justify-center gap-2">
                            <span className="animate-pulse">✨</span>
                            Happy Learning!
                            <span className="animate-pulse">✨</span>
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutSuccess;