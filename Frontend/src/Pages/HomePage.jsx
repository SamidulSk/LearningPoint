import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, DollarSign, Award, Star, TrendingUp, Sparkles, ArrowRight, CheckCircle, Zap, Globe } from "lucide-react";
import HomeLayout from "../Layouts/HomeLayout";
import DemoCourseImage from "../Assets/Images/homePageMainImage.png";
import DemoInstructor from "../Assets/Images/image1.png";

function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Engage with dynamic content and hands-on projects that make learning enjoyable and effective.",
      gradient: "from-blue-500 to-cyan-500",
      benefits: ["Live Projects", "Code Playground", "Video Lessons"]
    },
    {
      icon: Award,
      title: "Certified Instructors",
      description: "Learn from industry experts with proven track records and real-world experience.",
      gradient: "from-purple-500 to-pink-500",
      benefits: ["Industry Veterans", "Verified Experts", "24/7 Support"]
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Access quality education without breaking the bank. Flexible plans for every budget.",
      gradient: "from-yellow-500 to-orange-500",
      benefits: ["Money Back", "Lifetime Access", "Free Updates"]
    }
  ];

  const stats = [
    { icon: Users, label: "Active Students", value: "50+", color: "text-blue-500", bgGradient: "from-blue-500 to-cyan-500" },
    { icon: BookOpen, label: "Courses", value: "10+", color: "text-purple-500", bgGradient: "from-purple-500 to-pink-500" },
    { icon: Award, label: "Certifications", value: "30+", color: "text-yellow-500", bgGradient: "from-yellow-500 to-orange-500" },
    { icon: TrendingUp, label: "Success Rate", value: "98%", color: "text-green-500", bgGradient: "from-green-500 to-emerald-500" }
  ];

  const testimonials = [
    {
      name: "Somnath Roy",
      role: "Full Stack Developer",
      company: "Amazon",
      content: "This platform transformed my career! The courses are practical, instructors are responsive, and the community is incredibly supportive. Best investment I've made.",
      rating: 5,
      avatar: "AT"
    },
    {
      name: "Sharuk Khan",
      role: "UI/UX Designer",
      company: "Design Studio",
      content: "Amazing learning experience! The interactive projects helped me build a portfolio that landed me my dream job. The quality of content is unmatched.",
      rating: 5,
      avatar: "SM"
    },
    {
      name: "David Chen",
      role: "Data Scientist",
      company: "Analytics Inc",
      content: "The best LMS I've ever used. Real-world projects, industry-relevant skills, and a certificate that actually matters. Couldn't ask for more!",
      rating: 5,
      avatar: "DC"
    }
  ];

  return (
    <HomeLayout>
      {/* Enhanced Hero Section */}
      <div className="relative pt-16 pb-20 flex flex-col md:flex-row items-center justify-center gap-12 px-4 sm:px-6 lg:px-16 min-h-[90vh] overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Content Section */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border-2 border-indigo-500/30 rounded-full px-5 py-2.5 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              🏆 #1 Learning Platform 2025
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Master Skills with{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                Expert-Led
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
            <br />
            Online Courses
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Transform your career with cutting-edge skills taught by industry professionals. Learn at your own pace, anywhere, anytime.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            {["Lifetime Access", "Certificate", "Expert Support"].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-md"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/courses" className="flex-1 sm:flex-initial">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-500 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Zap className="w-5 h-5" />
                  Explore Courses
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 px-8 py-5 rounded-2xl font-bold text-lg shadow-lg"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6 pt-4 flex-wrap"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">150+ Countries</span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs font-bold">
                +50K
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative w-full max-w-lg"
          >
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <Award className="w-8 h-8 text-yellow-500" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <Star className="w-8 h-8 text-purple-500 fill-purple-500" />
            </motion.div>

            <img
              src={DemoCourseImage}
              alt="Learning Platform"
              className="relative w-full drop-shadow-2xl rounded-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative text-center group cursor-pointer bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.bgGradient} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className={`relative text-4xl lg:text-5xl font-extrabold mb-2 bg-gradient-to-r ${stat.bgGradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              
              <div className="relative text-gray-600 dark:text-gray-400 font-semibold text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-bold border border-indigo-200 dark:border-indigo-800">
              ✨ WHY CHOOSE US
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience world-class learning with features designed for your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              {/* Gradient Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="relative text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Benefits List */}
              <div className="relative space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle className={`w-5 h-5 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500`}></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Instructors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-bold border border-purple-200 dark:border-purple-800">
              👨‍🏫 EXPERT TEAM
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Learn from{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our instructors are certified professionals with real-world expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative flex flex-col items-center text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-3xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>
              
              {/* Avatar Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 scale-110"></div>
                <img
                  src={DemoInstructor}
                  alt="Instructor"
                  className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
                {/* Star Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              
              <h3 className="relative font-bold text-lg mb-1 text-gray-900 dark:text-white">Sk Samidul Hossain</h3>
              <p className="relative text-gray-600 dark:text-gray-400 text-sm mb-3">Senior Developer</p>
              
              {/* Rating */}
              <div className="relative flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
              💬 TESTIMONIALS
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Success Stories from{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Our Students
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands who've transformed their careers with our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 overflow-hidden group"
            >
              {/* Quote Background */}
              <div className="absolute top-4 right-4 text-7xl text-indigo-200 dark:text-indigo-900 opacity-30 font-serif">"</div>
              
              {/* Stars */}
              <div className="relative flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="relative text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-base italic">
                {testimonial.content}
              </p>

              {/* Author Info */}
              <div className="relative flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-gray-900 dark:text-white truncate">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{testimonial.role}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate">{testimonial.company}</p>
                </div>
              </div>

              {/* Hover Gradient Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/50 rounded-3xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-bold border border-white/30">
              🚀 START YOUR JOURNEY TODAY
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Ready to Transform Your Career?
          </h2>
          
          <p className="text-xl sm:text-2xl mb-10 opacity-90 leading-relaxed">
            Join 50,000+ students already learning on our platform. Get instant access to 500+ courses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/courses">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3"
              >
                Get Started Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300"
              >
                Learn More
              </motion.button>
            </Link>
          </div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/80"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">30-Day Money Back</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

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
      `}</style>
    </HomeLayout>
  );
}

export default HomePage;