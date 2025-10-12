import { motion } from "framer-motion";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { Mail, Heart, Code, Sparkles } from "lucide-react";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const socialLinks = [
    { 
      icon: <BsLinkedin />, 
      href: "https://www.linkedin.com/in/sk-samidul/",
      label: "LinkedIn",
      color: "hover:text-blue-500"
    },
    { 
      icon: <BsGithub />, 
      href: "https://github.com/SamidulSk",
      label: "GitHub",
      color: "hover:text-purple-500"
    },
    { 
      icon: <Mail />, 
      href: "mrsamidul2002@gmail.com",
      label: "Email",
      color: "hover:text-red-500"
    },
  ];

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-gray-100 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                LMS Platform
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering learners worldwide with quality education and cutting-edge courses. 
              Learn, grow, and achieve your dreams with us.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by SAMIDUL</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-indigo-500 transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Connect With Me</h4>
            <p className="text-gray-400 text-sm">
              Follow me on social media for updates, tips, and more!
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xl transition-all duration-300 ${social.color} hover:bg-white/10 hover:border-white/20 hover:shadow-lg`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 my-8"></div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © {year} LMS Platform. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a href="/terms" className="hover:text-white transition-colors duration-300">
              Terms
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <a href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <a href="/cookies" className="hover:text-white transition-colors duration-300">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
    </footer>
  );
}

export default Footer;