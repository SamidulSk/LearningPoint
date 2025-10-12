import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Upload, Camera, ArrowLeft, Save, Sparkles, CheckCircle } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [focusedField, setFocusedField] = useState(null);
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(data);
        if(!data.fullName) {
            toast.error("Give your name");
            return;
        }
        if(data.fullName.length < 3) {
            toast.error("Name cannot be of less than 3 characters");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        console.log(formData.entries().next())
        console.log(formData.entries().next())
        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="relative flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Glass Card */}
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                        {/* Header with Gradient */}
                        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 text-center">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="relative"
                            >
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                    <Sparkles className="w-4 h-4 text-white" />
                                    <span className="text-white text-sm font-medium">Update Your Profile</span>
                                </div>
                                <h1 className="text-4xl font-extrabold text-white mb-2">Edit Profile</h1>
                                <p className="text-white/90 text-sm">Personalize your account information</p>
                            </motion.div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            <div className="space-y-6">
                                {/* Avatar Upload */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <label htmlFor="image_uploads" className="cursor-pointer group relative">
                                        <div className="relative">
                                            {data.previewImage ? (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <img
                                                        src={data.previewImage}
                                                        alt="Profile Preview"
                                                        className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </>
                                            ) : (
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                                                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-300">
                                                        <BsPersonCircle className="w-20 h-20 text-gray-400 dark:text-gray-300" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </label>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Click to upload photo
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            JPG, PNG or SVG (Max 5MB)
                                        </p>
                                    </div>
                                    <input
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        type="file"
                                        id="image_uploads"
                                        name="image_uploads"
                                        accept=".jpg, .png, .svg, .jpeg"
                                    />
                                </motion.div>

                                {/* Full Name Input */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="relative"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className={`relative group ${focusedField === 'fullName' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'fullName' ? 'text-purple-500' : 'text-gray-400'}`} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            placeholder="Enter your full name"
                                            value={data.fullName}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('fullName')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                        />
                                        {data.fullName && data.fullName.length >= 3 && (
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            </div>
                                        )}
                                    </div>
                                    {data.fullName && data.fullName.length > 0 && data.fullName.length < 3 && (
                                        <p className="text-xs text-red-500 mt-1">Name must be at least 3 characters</p>
                                    )}
                                </motion.div>

                                {/* Info Box */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-purple-900 dark:text-purple-200 font-medium mb-1">
                                                Profile Tips
                                            </p>
                                            <p className="text-xs text-purple-700 dark:text-purple-300">
                                                Use a clear photo and your real name for better recognition in the community.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Update Button */}
                                <motion.button
                                    type="button"
                                    onClick={onFormSubmit}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full relative group bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Update Profile
                                        <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.button>

                                {/* Back to Profile Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Link to="/user/profile">
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full flex items-center justify-center gap-2 backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 py-3 rounded-xl font-semibold"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            Back to Profile
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-white/40 dark:border-gray-700/40"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Your data is secure and private</span>
                        </div>
                    </motion.div>
                </motion.div>
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
            `}</style>
        </HomeLayout>
    );
}

export default EditProfile;