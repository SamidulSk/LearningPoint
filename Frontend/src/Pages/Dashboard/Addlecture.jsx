import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    ArrowLeft, 
    Upload, 
    Video, 
    FileText,
    Save,
    Sparkles,
    CheckCircle,
    Film
} from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [focusedField, setFocusedField] = useState(null);

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log(source);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory")
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails?._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }

    useEffect(() => {
        if(!courseDetails) navigate("/courses");
    }, [])

    return (
        <HomeLayout>
            <div className="relative min-h-[90vh] px-4 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6"
                    >
                        <motion.button
                            onClick={() => navigate(-1)}
                            whileHover={{ x: -5 }}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Lectures</span>
                        </motion.button>
                    </motion.div>

                    {/* Main Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                            {/* Header with Gradient */}
                            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-center">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="relative"
                                >
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                        <Sparkles className="w-4 h-4 text-white" />
                                        <span className="text-white text-sm font-medium">Course Content</span>
                                    </div>
                                    <h1 className="text-4xl font-extrabold text-white mb-2">Add New Lecture</h1>
                                    <p className="text-white/90 text-sm">
                                        Upload video content for <span className="font-semibold">{courseDetails?.title}</span>
                                    </p>
                                </motion.div>
                            </div>

                            {/* Form Content */}
                            <div className="p-8">
                                <div className="space-y-6">
                                    {/* Video Upload */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Lecture Video
                                        </label>
                                        {userInput.videoSrc ? (
                                            <div className="relative group rounded-xl overflow-hidden">
                                                <video
                                                    muted
                                                    src={userInput.videoSrc}
                                                    controls
                                                    controlsList="nodownload nofullscreen"
                                                    disablePictureInPicture
                                                    className="w-full rounded-xl"
                                                />
                                                <label
                                                    htmlFor="lecture"
                                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                                >
                                                    <div className="text-white text-center">
                                                        <Upload className="w-8 h-8 mx-auto mb-2" />
                                                        <p className="text-sm font-medium">Change Video</p>
                                                    </div>
                                                </label>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    id="lecture"
                                                    name="lecture"
                                                    onChange={handleVideo}
                                                    accept="video/mp4 video/x-mp4 video/*"
                                                />
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="lecture"
                                                className="block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer group hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                            >
                                                <div className="h-full flex flex-col items-center justify-center">
                                                    <Film className="w-16 h-16 text-gray-400 group-hover:text-indigo-500 mb-4 transition-colors" />
                                                    <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">
                                                        Click to upload video
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                                        MP4, WebM or OGG (Max 500MB)
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    id="lecture"
                                                    name="lecture"
                                                    onChange={handleVideo}
                                                    accept="video/mp4 video/x-mp4 video/*"
                                                />
                                            </label>
                                        )}
                                    </motion.div>

                                    {/* Lecture Title */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Lecture Title
                                        </label>
                                        <div className={`relative ${focusedField === 'title' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Video className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'title' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                            </div>
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Enter lecture title"
                                                value={userInput.title}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('title')}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                            />
                                            {userInput.title && (
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Lecture Description */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Lecture Description
                                        </label>
                                        <div className={`relative ${focusedField === 'description' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                            <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                                                <FileText className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'description' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                            </div>
                                            <textarea
                                                name="description"
                                                placeholder="Enter lecture description..."
                                                value={userInput.description}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('description')}
                                                onBlur={() => setFocusedField(null)}
                                                rows="5"
                                                className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 resize-none focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Info Box */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-blue-900 dark:text-blue-200 font-medium mb-1">
                                                    Upload Guidelines
                                                </p>
                                                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                                    <li>• Video should be clear and well-lit</li>
                                                    <li>• Ensure audio quality is good</li>
                                                    <li>• Keep lectures focused and concise</li>
                                                    <li>• Maximum file size: 500MB</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={onFormSubmit}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full relative group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <Save className="w-5 h-5" />
                                                Add Lecture
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Upload Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 grid grid-cols-3 gap-4"
                    >
                        <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 text-center border border-white/40 dark:border-gray-700/40">
                            <Video className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">HD Quality</span>
                        </div>
                        <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 text-center border border-white/40 dark:border-gray-700/40">
                            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Secure Upload</span>
                        </div>
                        <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 text-center border border-white/40 dark:border-gray-700/40">
                            <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Fast Processing</span>
                        </div>
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
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </HomeLayout>
    );
}

export default AddLecture;