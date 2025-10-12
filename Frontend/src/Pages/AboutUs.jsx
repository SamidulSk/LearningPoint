import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp, Globe, Heart, Sparkles, ArrowRight } from "lucide-react";
import aboutMainImage from "../Assets/Images/image.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  const stats = [
    { icon: Users, value: "100+", label: "Active Students", color: "from-blue-500 to-cyan-500" },
    { icon: Award, value: "10+", label: "Quality Courses", color: "from-purple-500 to-pink-500" },
    { icon: Globe, value: "150+", label: "Countries", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingUp, value: "98%", label: "Success Rate", color: "from-green-500 to-emerald-500" }
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize education and make quality learning accessible to everyone, everywhere.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Our Vision",
      description: "A world where knowledge knows no boundaries and every learner can achieve their dreams.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Our Values",
      description: "Excellence, innovation, and inclusivity guide everything we do in education.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <HomeLayout>
      <div className="relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
        
        {/* Hero Section with Enhanced Design */}
        <div className="relative px-6 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900">
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
            
            <motion.section
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/20 rounded-full px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  About Our Platform
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Affordable and{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Quality Education
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Our goal is to provide affordable, quality education to the world. We
                provide a platform for aspiring teachers and students to share skills,
                creativity, and knowledge, empowering growth and wellness globally.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href="/courses"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-500 dark:hover:border-indigo-400 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.section>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-30"></div>
                <motion.img
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  src={aboutMainImage}
                  alt="About Main"
                  className="relative w-full max-w-lg rounded-3xl shadow-2xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="px-6 md:px-20 py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative backdrop-blur-sm bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Drives{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Us Forward
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our core values shape every decision we make and every course we create
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="px-6 md:px-20 py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Voices of{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Inspiration
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Learn from the wisdom of great minds who've shaped education
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {celebrities && celebrities.map((celebrity) => (
                <CarouselSlide
                  {...celebrity}
                  key={celebrity.slideNumber}
                  totalSlides={celebrities.length}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-20 py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Sign up today and start learning from the best instructors around the world
            </p>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <div className="mt-8 flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free trial available</span>
              </div>
            </div>
          </motion.div>
        </section>
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

export default AboutUs;