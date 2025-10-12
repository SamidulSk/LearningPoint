import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Main Card */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-rose-400 to-pink-500 opacity-10 animate-pulse"></div>
                        
                        {/* Header Section */}
                        <div className="relative bg-gradient-to-r from-red-500 via-rose-500 to-red-600 p-8 text-center">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <h1 className="relative text-3xl font-extrabold text-white drop-shadow-lg">
                                Payment Failed
                            </h1>
                            <div className="relative mt-3 inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                                <p className="text-red-100 text-sm font-medium">
                                    Transaction unsuccessful
                                </p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="relative p-8 space-y-8">
                            {/* Icon with Animation */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    {/* Pulsing Ring */}
                                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
                                    
                                    {/* Main Icon */}
                                    <div className="relative bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 p-6 rounded-full border-4 border-red-200 dark:border-red-700">
                                        <RxCrossCircled className="text-red-500 dark:text-red-400 text-7xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Message Section */}
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    Oops! Payment Failed
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Your payment could not be processed at this time.
                                </p>
                            </div>

                            {/* Info Boxes */}
                            <div className="space-y-3">
                                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl mt-1">💳</span>
                                        <div>
                                            <p className="font-semibold text-orange-800 dark:text-orange-300 text-sm">
                                                No Amount Deducted
                                            </p>
                                            <p className="text-orange-600 dark:text-orange-400 text-xs mt-1">
                                                Your account has not been charged
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl mt-1">💡</span>
                                        <div>
                                            <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                                                Common Reasons
                                            </p>
                                            <ul className="text-blue-600 dark:text-blue-400 text-xs mt-1 space-y-1">
                                                <li>• Insufficient balance</li>
                                                <li>• Network connectivity issues</li>
                                                <li>• Payment gateway timeout</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-4">
                                <Link 
                                    to="/checkout"
                                    className="block w-full"
                                >
                                    <button className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:via-rose-600 hover:to-red-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                                        <span className="flex items-center justify-center gap-2">
                                            🔄 Try Again
                                        </span>
                                    </button>
                                </Link>

                                <Link 
                                    to="/courses"
                                    className="block w-full"
                                >
                                    <button className="w-full py-3 rounded-xl font-semibold text-base bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300">
                                        <span className="flex items-center justify-center gap-2">
                                            📚 Browse Courses
                                        </span>
                                    </button>
                                </Link>
                            </div>

                            {/* Support Section */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="text-center">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                        Need help with your payment?
                                    </p>
                                    <Link 
                                        to="/contact" 
                                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors duration-300"
                                    >
                                        <span>📧</span>
                                        Contact Support
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                        <p>🔒 Your payment information is secure</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutFailure;