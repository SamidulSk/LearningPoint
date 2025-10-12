import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

    const [loading, setLoading] = useState(true);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    async function handleSubscription(e) {
        e.preventDefault();

        if(!razorpayKey || !subscription_id) {
            toast.error("Subscription is not ready yet. Please try again.");
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: { color: '#F37254' },
            handler: async function(response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successful");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        setLoading(true);
        try {
            await dispatch(getRazorPayId()).unwrap();
            const res = await dispatch(purchaseCourseBundle()).unwrap();

            if(!res) {
                toast.error("Failed to create subscription. Something went wrong.");
            }
        } catch(err) {
            toast.error("Something went wrong while loading subscription.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
                <form
                    onSubmit={handleSubscription}
                    className="w-full max-w-md"
                >
                    {/* Main Card */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 opacity-10 animate-pulse"></div>
                        
                        {/* Popular Badge */}
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12 z-10">
                            🔥 Popular
                        </div>

                        {/* Header Section */}
                        <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 p-8 text-center">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <h1 className="relative text-3xl font-extrabold text-white drop-shadow-lg">
                                Premium Bundle
                            </h1>
                            <p className="relative text-yellow-100 mt-2 font-medium">
                                Unlock unlimited learning
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="relative p-8 space-y-6">
                            {/* Features List */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg">✓</span>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        Access to <span className="text-blue-600 dark:text-blue-400 font-bold">all courses</span>
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg">✓</span>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        Valid for <span className="text-green-600 dark:text-green-400 font-bold">1 Full Year</span>
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg">✓</span>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        Lifetime <span className="text-orange-600 dark:text-orange-400 font-bold">certificate access</span>
                                    </span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="relative p-6 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl border-2 border-yellow-300 dark:border-yellow-700">
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                                    LIMITED OFFER
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">One-time payment</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <BiRupee className="text-yellow-600 dark:text-yellow-400 text-5xl" />
                                        <span className="text-6xl font-extrabold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                        3
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                        <span className="line-through">₹2,999</span> 
                                        <span className="ml-2 text-green-600 dark:text-green-400 font-bold">99% OFF</span>
                                    </p>
                                </div>
                            </div>

                            {/* Guarantee Section */}
                            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-4 text-center">
                                <p className="text-green-700 dark:text-green-300 font-semibold flex items-center justify-center gap-2">
                                    <span className="text-xl">🛡️</span>
                                    100% Money-Back Guarantee
                                </p>
                                <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                                    * Terms and conditions apply *
                                </p>
                            </div>

                            {/* Buy Button */}
                            <button 
                                type="submit"
                                disabled={loading || !subscription_id}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform ${
                                    loading || !subscription_id 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
                                }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        🚀 Buy Now & Start Learning
                                    </span>
                                )}
                            </button>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-4">
                                <span className="flex items-center gap-1">
                                    🔒 Secure Payment
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    ⚡ Instant Access
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Trust Message */}
                    <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                        <p>💳 Safe and secure checkout powered by Razorpay</p>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Checkout;