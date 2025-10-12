import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    ArrowLeft, 
    Upload, 
    BookOpen, 
    User, 
    Tag, 
    FileText,
    ImagePlus,
    Save,
    Sparkles,
    CheckCircle
} from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [focusedField, setFocusedField] = useState(null);

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }
    }

    function handleUserInput(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="relative min-h-[90vh] px-4 py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6"
                    >
                        <Link to="/courses">
                            <motion.button
                                whileHover={{ x: -5 }}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Back to Courses</span>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Main Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                            {/* Header with Gradient */}
                            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="relative"
                                >
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                        <Sparkles className="w-4 h-4 text-white" />
                                        <span className="text-white text-sm font-medium">Admin Panel</span>
                                    </div>
                                    <h1 className="text-4xl font-extrabold text-white mb-2">Create New Course</h1>
                                    <p className="text-white/90 text-sm">Fill in the details to add a new course to the platform</p>
                                </motion.div>
                            </div>

                            {/* Form Content */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column - Thumbnail & Title */}
                                    <div className="space-y-6">
                                        {/* Thumbnail Upload */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Course Thumbnail
                                            </label>
                                            <label htmlFor="image_uploads" className="cursor-pointer group block">
                                                {userInput.previewImage ? (
                                                    <div className="relative rounded-xl overflow-hidden">
                                                        <img
                                                            className="w-full h-64 object-cover"
                                                            src={userInput.previewImage}
                                                            alt="Course thumbnail"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <div className="text-white text-center">
                                                                <Upload className="w-8 h-8 mx-auto mb-2" />
                                                                <p className="text-sm font-medium">Change Image</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/50 group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-all duration-300">
                                                        <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-indigo-500 mb-3 transition-colors" />
                                                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">Click to upload thumbnail</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-500">JPG, PNG (Max 5MB)</p>
                                                    </div>
                                                )}
                                            </label>
                                            <input
                                                className="hidden"
                                                type="file"
                                                id="image_uploads"
                                                accept=".jpg, .jpeg, .png"
                                                name="image_uploads"
                                                onChange={handleImageUpload}
                                            />
                                        </motion.div>

                                        {/* Course Title */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Course Title
                                            </label>
                                            <div className={`relative ${focusedField === 'title' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <BookOpen className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'title' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Enter course title"
                                                    value={userInput.title}
                                                    onChange={handleUserInput}
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
                                    </div>

                                    {/* Right Column - Other Fields */}
                                    <div className="space-y-6">
                                        {/* Instructor */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Course Instructor
                                            </label>
                                            <div className={`relative ${focusedField === 'createdBy' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'createdBy' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    name="createdBy"
                                                    id="createdBy"
                                                    placeholder="Enter instructor name"
                                                    value={userInput.createdBy}
                                                    onChange={handleUserInput}
                                                    onFocus={() => setFocusedField('createdBy')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                                />
                                                {userInput.createdBy && (
                                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Category */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Course Category
                                            </label>
                                            <div className={`relative ${focusedField === 'category' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Tag className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'category' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    name="category"
                                                    id="category"
                                                    placeholder="e.g., Web Development, Data Science"
                                                    value={userInput.category}
                                                    onChange={handleUserInput}
                                                    onFocus={() => setFocusedField('category')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                                />
                                                {userInput.category && (
                                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Description */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Course Description
                                            </label>
                                            <div className={`relative ${focusedField === 'description' ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
                                                <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                                                    <FileText className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'description' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                </div>
                                                <textarea
                                                    required
                                                    name="description"
                                                    id="description"
                                                    placeholder="Enter course description..."
                                                    value={userInput.description}
                                                    onChange={handleUserInput}
                                                    onFocus={() => setFocusedField('description')}
                                                    onBlur={() => setFocusedField(null)}
                                                    rows="5"
                                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3.5 resize-none focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-gray-100"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-8"
                                >
                                    <motion.button
                                        type="button"
                                        onClick={onFormSubmit}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <Save className="w-5 h-5" />
                                            Create Course
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </motion.button>
                                </motion.div>

                                {/* Info Box */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-indigo-900 dark:text-indigo-200 font-medium mb-1">
                                                Before Publishing
                                            </p>
                                            <p className="text-xs text-indigo-700 dark:text-indigo-300">
                                                Make sure all information is accurate. You can add lectures to this course after creation.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
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

export default CreateCourse;