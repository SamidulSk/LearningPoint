import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Shield, CreditCard, Lock, Edit, X } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    async function handleCancellation() {
        setShowCancelModal(false);
        toast("Initiating cancellation");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed!");
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated background gradient orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                <div 
                    className={`relative my-10 w-full max-w-md transition-all duration-700 transform ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    {/* Glass morphism card */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-yellow-500/10 pointer-events-none"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            {/* Avatar section with glow effect */}
                            <div className="relative w-40 h-40 mx-auto mb-6 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                                <img
                                    src={userData?.avatar?.secure_url}
                                    alt="Profile"
                                    className="relative w-full h-full rounded-full border-4 border-white/30 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-yellow-500 w-12 h-12 rounded-full flex items-center justify-center border-4 border-gray-900 transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                                    <Edit className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Name with gradient */}
                            <h3 className="text-3xl font-bold text-center capitalize mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                                {userData?.fullName}
                            </h3>

                            {/* Info cards with hover effects */}
                            <div className="space-y-3 mb-8">
                                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-400 text-xs uppercase tracking-wider">Email</p>
                                            <p className="text-white font-medium">{userData?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-400 text-xs uppercase tracking-wider">Role</p>
                                            <p className="text-white font-medium capitalize">{userData?.role}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <CreditCard className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-400 text-xs uppercase tracking-wider">Subscription</p>
                                                <p className="text-white font-medium capitalize">
                                                    {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                                                </p>
                                            </div>
                                            {userData?.subscription?.status === "active" && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3 mb-4">
                                <Link
                                    to="/user/changepassword"
                                    className="flex-1 group relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50"
                                >
                                    <div className="relative bg-gray-900 rounded-xl px-4 py-3 group-hover:bg-transparent transition-all duration-300">
                                        <div className="flex items-center justify-center gap-2">
                                            <Lock className="w-4 h-4 text-yellow-500 group-hover:text-white transition-colors duration-300" />
                                            <span className="font-semibold text-yellow-500 group-hover:text-white transition-colors duration-300">
                                                Change Password
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to="/user/editprofile"
                                    className="flex-1 group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                                >
                                    <div className="relative bg-gray-900 rounded-xl px-4 py-3 group-hover:bg-transparent transition-all duration-300">
                                        <div className="flex items-center justify-center gap-2">
                                            <Edit className="w-4 h-4 text-purple-500 group-hover:text-white transition-colors duration-300" />
                                            <span className="font-semibold text-purple-500 group-hover:text-white transition-colors duration-300">
                                                Edit Profile
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Cancel subscription button */}
                            {userData?.subscription?.status === "active" && (
                                <button
                                    onClick={() => setShowCancelModal(true)}
                                    className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-red-600 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                                >
                                    <div className="relative bg-gray-900 rounded-xl px-4 py-3 group-hover:bg-transparent transition-all duration-300">
                                        <div className="flex items-center justify-center gap-2">
                                            <X className="w-4 h-4 text-red-500 group-hover:text-white transition-colors duration-300" />
                                            <span className="font-semibold text-red-500 group-hover:text-white transition-colors duration-300">
                                                Cancel Subscription
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showCancelModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl transform animate-scaleIn">
                            <h3 className="text-2xl font-bold text-white mb-3">Cancel Subscription?</h3>
                            <p className="text-gray-400 mb-6">
                                Are you sure you want to cancel your subscription? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/20"
                                >
                                    Keep Subscription
                                </button>
                                <button
                                    onClick={handleCancellation}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                                >
                                    Yes, Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </HomeLayout>
    );
}

export default Profile;